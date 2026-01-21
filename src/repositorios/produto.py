from sqlalchemy.orm import Session
from src.schemas import schemas
from src.models import models


class RepositorioProduto():

    def __init__(self, db: Session): #inicializando a classe com a sessão do banco de dados
        self.db = db   #armazenando a sessão do banco de dados em um atributo da classe 

    def criar(Self, produto: schemas.Produtos): #Setando um novo produto
        db_produto = models.Produto(nome=produto.nome, descricao=produto.detalhes, #criando atributos usando o nome de "db_produto" para referenciar o modelo Produto
                                    preco=produto.preco, disponivel=produto.disponivel)
        Self.db.add(db_produto) #adicionando o novo produto na sessão do banco de dados
        Self.db.commit() #confirmando a transação para salvar o novo produto no banco de dados
        Self.db.refresh(db_produto) #atualizando a instância do produto com os dados mais recentes do banco de dados
        return db_produto
    
    
    def listar(Self):
        produtos = Self.db.query(models.Produto).all() #consultando todos os produtos no banco de dados
        return produtos

    def obter(Self, produto_id: int):
        produtos = Self.db.query(models.Produto).filter(models.Produto.id == produto_id).first()
        return produtos

    def remover(Self):
        pass
