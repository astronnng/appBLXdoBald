from sqlalchemy.orm import Session
from src.schemas import schemas
from src.models import models



class RepositorioUsuario():

    def __init__(self, db: Session): #inicializando a classe com a sessão do banco de dados
        self.db = db   #armazenando a sessão do banco de dados em um atributo da classe 

    def criar(Self, usuario: schemas.Usuario): #Setando um novo usuario
        db_usuario = models.Usuario(nome=usuario.nome, telefone=usuario.telefone) #criando atributos usando o nome de "db_usuario" para referenciar o modelo Usuario
        Self.db.add(db_usuario) #adicionando o novo usuario na sessão do banco de dados
        Self.db.commit() #confirmando a transação para salvar o novo usuario no banco de dados
        Self.db.refresh(db_usuario) #atualizando a instância do usuario com os dados mais recentes do banco de dados
        return db_usuario

    def listar(Self):
        usuarios = Self.db.query(models.Usuario).all() #consultando todos os usuarios no banco de dados
        return usuarios

    def obter(Self, usuario_id: int):
        usuario = Self.db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
        return usuario

    def remover(Self):
        pass



