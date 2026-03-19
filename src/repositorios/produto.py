from sqlalchemy.orm import Session, joinedload
from src.schemas import schemas
from src.models import models


class RepositorioProduto():

    def __init__(self, db: Session):  # inicializando a classe com a sessão do banco de dados
        self.db = db   # armazenando a sessão do banco de dados em um atributo da classe

    def criar(self, produto: schemas.Produtos):  # criando um novo produto
        db_produto = models.Produto(
            nome=produto.nome,
            descricao=produto.descricao,
            preco=produto.preco,
            disponivel=produto.disponivel,
            usuario_id=produto.usuario_id,
        )
        self.db.add(db_produto)  # adicionando o novo produto na sessão do banco de dados
        self.db.commit()  # confirmando a transação para salvar o novo produto no banco de dados
        self.db.refresh(db_produto)  # atualizando a instância do produto com os dados mais recentes do banco de dados
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

