from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from src.schemas.schemas import Produtos
from src.repositorios.produto import RepositorioProduto
from sqlalchemy.orm import Session
from src.config.database import get_session
from src.config.database import create_db_and_tables
from src.schemas.schemas import Usuario
from src.repositorios.usuarios import RepositorioUsuario

create_db_and_tables()


app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/produtos")
def criar_produto(produto: Produtos, db: Session = Depends(get_session)):
    # Certifique-se de que a variável recebe o resultado da função
    produto_criado = RepositorioProduto(db).criar(produto)
    return produto_criado


@app.get("/produtos", response_model=list[Produtos])
def listar_produtos(db: Session = Depends(get_session)):
    return RepositorioProduto(db).listar()


@app.get("/produtos/{produto_id}", response_model=Produtos)
def listar_produtos_usuario(produto_id: int, db: Session = Depends(get_session)):
    return RepositorioProduto(db).obter(produto_id)


@app.post("/usuarios")
def criar_usuario(usuario: Usuario, db: Session = Depends(get_session)):
    return RepositorioUsuario(db).criar(usuario)


@app.get("/usuarios")
def listar_usuarios(db: Session = Depends(get_session)):
    return RepositorioUsuario(db).listar()


