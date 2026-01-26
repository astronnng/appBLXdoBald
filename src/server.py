from fastapi import FastAPI, Depends
from src.schemas.schemas import Produtos
from src.repositorios.produto import RepositorioProduto
from sqlalchemy.orm import Session
from src.config.database import get_session
from src.config.database import create_db_and_tables

create_db_and_tables()

app = FastAPI()




@app.post("/produtos")
def criar_produto(produto: Produtos, db: Session = Depends(get_session)):
    # Certifique-se de que a variável recebe o resultado da função
    produto_criado = RepositorioProduto(db).criar(produto)
    return produto_criado


@app.get("/produtos")
def listar_produtos(db: Session = Depends(get_session)):
    return RepositorioProduto(db).listar()

