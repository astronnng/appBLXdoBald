from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.config.database import get_session
from src.repositorios.produto import RepositorioProduto
from src.schemas.schemas import Produtos
from src.schemas import schemas

router = APIRouter()

@router.post("/produtos")
def criar_produto(produto: Produtos, db: Session = Depends(get_session)):
    # Certifique-se de que a variável recebe o resultado da função
    produto_criado = RepositorioProduto(db).criar(produto)
    return produto_criado


@router.get("/produtos", response_model=list[schemas.Produtos])
def listar_produtos(db: Session = Depends(get_session)):
    return RepositorioProduto(db).listar()

from fastapi import HTTPException

@router.get("/produtos/{produto_id}", response_model=schemas.Produtos)
def listar_produtos_usuario(produto_id: int, db: Session = Depends(get_session)):
    produto = RepositorioProduto(db).obter(produto_id)
    if produto is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto

