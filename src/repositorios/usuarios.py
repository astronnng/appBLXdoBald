from sqlalchemy.orm import Session
from src.schemas.schemas import UsuarioCreate
from src.models import models


class RepositorioUsuario:

    def __init__(self, db: Session):
        self.db = db

    def criar(self, usuario: UsuarioCreate):
        db_usuario = models.Usuario(
            nome=usuario.nome,
            telefone=usuario.telefone,
            senha=usuario.senha
        )
        self.db.add(db_usuario)
        self.db.commit()
        self.db.refresh(db_usuario)
        return db_usuario

    def listar(self):
        return self.db.query(models.Usuario).all()

    def obter(self, usuario_id: int):
        return self.db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()

    def remover(self):
        pass



