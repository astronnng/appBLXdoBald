from sqlalchemy.orm import Session, joinedload
from src.schemas.schemas import PedidoCreate
from src.models import models


class RepositorioPedido:

    def __init__(self, db: Session):
        self.db = db

    def criar(self, pedido: PedidoCreate):
        db_pedido = models.Pedido(
            usuario_id=pedido.usuario_id,
            produto_id=pedido.produto_id,
            quantidade=pedido.quantidade,
            entrega=pedido.entrega,
            endereco=pedido.endereco,
            observacoes=pedido.observacoes
        )
        self.db.add(db_pedido)
        self.db.commit()
        self.db.refresh(db_pedido)
        return db_pedido

    def listar(self):
        return self.db.query(models.Pedido).options(
            joinedload(models.Pedido.usuario),
            joinedload(models.Pedido.produto)
        ).all()

    def obter(self, pedido_id: int):
        return self.db.query(models.Pedido).options(
            joinedload(models.Pedido.usuario),
            joinedload(models.Pedido.produto)
        ).filter(models.Pedido.id == pedido_id).first()

    def remover(self, pedido_id: int):
        pedido = self.obter(pedido_id)
        if pedido:
            self.db.delete(pedido)
            self.db.commit()
        return pedido