from sqlalchemy.orm import Session, joinedload
from src.schemas.schemas import ProdutoCreate
from src.models import models


class RepositorioProduto:

    def __init__(self, db: Session):
        self.db = db

    def criar(self, produto: ProdutoCreate):
        db_produto = models.Produto(
            nome=produto.nome,
            descricao=produto.descricao,
            preco=produto.preco,
            disponivel=produto.disponivel,
            usuario_id=produto.usuario_id,
        )
        self.db.add(db_produto)
        self.db.commit()
        self.db.refresh(db_produto)
        return db_produto

    def listar(self):
        produtos = self.db.query(models.Produto).options(joinedload(models.Produto.usuario)).all()
        return produtos

    def obter(self, produto_id: int):
        produto = (
            self.db.query(models.Produto)
            .options(joinedload(models.Produto.usuario))
            .filter(models.Produto.id == produto_id)
            .first()
        )
        return produto

    def remover(self):
        pass

