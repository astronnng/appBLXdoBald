from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_session
from src.repositorios.produto import RepositorioProduto
from src.schemas.schemas import ProdutoCreate, ProdutoResponse

router = APIRouter()

@router.post("/produtos", response_model=ProdutoResponse)
def criar_produto(produto: ProdutoCreate, db: Session = Depends(get_session)):
    produto_criado = RepositorioProduto(db).criar(produto)
    return produto_criado

@router.get("/produtos", response_model=list[ProdutoResponse])
def listar_produtos(db: Session = Depends(get_session)):
    return RepositorioProduto(db).listar()

@router.get("/produtos/{produto_id}", response_model=ProdutoResponse)
def obter_produto(produto_id: int, db: Session = Depends(get_session)):
    produto = RepositorioProduto(db).obter(produto_id)
    if produto is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto

