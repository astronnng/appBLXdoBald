from fastapi import FastAPI, Depends
from src.schemas.schemas import Produtos
from src.repositorios.produto import RepositorioProduto
from sqlalchemy.orm import Session
from src.config.database import get_session

app = FastAPI()




@app.post("/produtos")
def criar_produto(produto: Produtos, db: Session = Depends(get_session)):
    produto_criado: RepositorioProduto().criar(produto, db)
    return produto_criado


@app.get("/produtos")
def listar_produtos():
    return {'Msg': 'Listagem de produtos'}

