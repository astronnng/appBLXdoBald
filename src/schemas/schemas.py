from sqlalchemy import Column, Integer
from pydantic import BaseModel
from typing import Optional
from typing import List

class Produtos(BaseModel):
    id: Optional[str] = None
    Usuario: Optional['Usuario'] = None
    nome: str
    detalhes: str
    preco: float
    disponivel: bool = False

    class Config:
        from_attributes = True



class Usuario(BaseModel):
    id: Optional[str] = None
    nome: str
    telefone: str
    meus_produtos: List['Produtos'] = []
    minhas_vendas: List['Pedido'] = []
    meus_pedidos: List['Pedido'] = []




class Pedido(BaseModel):
    id: Optional[str] = None
    usuario: Usuario
    produto: Produtos
    quantidade: int 
    entrega: bool = True
    endereco: str
    observacoes: Optional[str] = 'Sem observações'
