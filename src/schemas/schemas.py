from sqlalchemy import Column, Integer
from pydantic import BaseModel
from typing import Optional


class Usuario(BaseModel):
    id: Optional[str] = None
    nome: str
    telefone: str
    meus_produtos: List[Produtos]
    minhas_vendas: List[Pedido]
    meus_pedidos: List[Pedido]

class Produtos(BaseModel):
    id: Optional[str] = None
    Usuario: Usuario
    nome: str
    detalhes: str
    preco: float
    disponivel: bool = False

    class Config():
        orm_mode = True


class Pedido(BaseModel):
    id: Optional[str] = None
    usuario: Usuario
    produto: Produtos
    quantidade: int 
    entrega: bool = True
    endereco: str
    observacoes: Optional[str] = 'Sem observações'
