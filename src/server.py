from fastapi import FastAPI
from  src.schemas.schemas import Produtos 

app = FastAPI()






@app.post("/produtos")
def criar_produto(produto: Produtos):
    return {'Msg': 'Produto criado com sucesso!'}



@app.get("/produtos")
def listar_produtos():
    return {'Msg': 'Listagem de produtos'}

