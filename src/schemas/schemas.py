from sqlalchemy import Column, Integer
from pydantic import BaseModel
from typing import Optional
from typing import List

class Produtos(BaseModel):
    id: Optional[int] = None
    nome: Optional[str] = None
    descricao: Optional[str] = None
    preco: Optional[float] = None
    disponivel: Optional[bool] = False
    usuario_id: Optional[int] = None
    usuario: Optional['Usuario'] = None

    class Config:
        from_attributes = True


class Usuario(BaseModel):
    id: Optional[int] = None
    nome: str
    telefone: str
    senha: Optional[str] = None
    meus_produtos: Optional[List['Produtos']] = None
    minhas_vendas: Optional[List['Pedido']] = None
    meus_pedidos: Optional[List['Pedido']] = None
    produto_id: Optional[int] = None
    class Config:
        from_attributes = True


class Pedido(BaseModel):
    id: Optional[str] = None
    usuario: Usuario
    produto: Produtos
    quantidade: int 
    entrega: bool = True
    endereco: str
    observacoes: Optional[str] = 'Sem observações'

Produtos.update_forward_refs()
Usuario.update_forward_refs()
Pedido.update_forward_refs()
