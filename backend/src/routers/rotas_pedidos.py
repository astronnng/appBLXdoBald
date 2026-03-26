from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_session
from src.repositorios.pedidos import RepositorioPedido
from src.schemas.schemas import PedidoCreate, PedidoResponse
from src.routers.router_util import obter_usuario_logado
from src.models.models import Usuario

router = APIRouter()

@router.post("/pedidos", response_model=PedidoResponse, status_code=201)
def criar_pedido(pedido: PedidoCreate, db: Session = Depends(get_session)):
    pedido_criado = RepositorioPedido(db).criar(pedido)
    return pedido_criado

@router.get("/pedidos", response_model=list[PedidoResponse])
def listar_pedidos(db: Session = Depends(get_session), usuario: Usuario = Depends(obter_usuario_logado)):
    pedidos = RepositorioPedido(db).listar_meus_pedidos_por_usuario_id(usuario.id)
    return pedidos

@router.get("/pedidos/{pedido_id}", response_model=PedidoResponse)
def obter_pedido(pedido_id: int, db: Session = Depends(get_session)):
    pedido = RepositorioPedido(db).obter(pedido_id)
    if pedido is None:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    return pedido

@router.delete("/pedidos/{pedido_id}")
def remover_pedido(pedido_id: int, db: Session = Depends(get_session)):
    pedido = RepositorioPedido(db).remover(pedido_id)
    if pedido is None:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    return {"message": "Pedido removido com sucesso"}
