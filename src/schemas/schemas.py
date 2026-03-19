from pydantic import BaseModel
from typing import Optional, List

# Schemas base para criação (input)
class ProdutoBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    preco: float
    disponivel: bool = False
    usuario_id: Optional[int] = None

class ProdutoCreate(ProdutoBase):
    pass

class ProdutoResponse(ProdutoBase):
    id: int

    class Config:
        from_attributes = True

# Schemas base para criação (input)
class UsuarioBase(BaseModel):
    nome: str
    telefone: str
    senha: Optional[str] = None

class UsuarioCreate(UsuarioBase):
    pass

class UsuarioResponse(UsuarioBase):
    id: int

    class Config:
        from_attributes = True

# Schemas base para criação (input)
class PedidoBase(BaseModel):
    usuario_id: int
    produto_id: int
    quantidade: int
    entrega: bool = True
    endereco: str
    observacoes: Optional[str] = 'Sem observações'

class PedidoCreate(PedidoBase):
    pass

class PedidoResponse(PedidoBase):
    id: int
    usuario: Optional[UsuarioResponse] = None
    produto: Optional[ProdutoResponse] = None

    class Config:
        from_attributes = True
