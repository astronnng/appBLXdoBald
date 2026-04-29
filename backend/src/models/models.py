from sqlalchemy import Column, ForeignKey, Integer, String, Float, Boolean
from src.config.database import Base
from sqlalchemy.orm import relationship



class Produto(Base):

    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    descricao = Column(String)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    usuario = relationship("Usuario", back_populates="produtos")
    preco = Column(Float)
    disponivel = Column(Boolean)
    pedidos = relationship("Pedido", foreign_keys="Pedido.produto_id", back_populates="produto")

class Usuario(Base):

    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    senha = Column(String)
    telefone = Column(String)
    produtos = relationship("Produto", back_populates="usuario")
    pedidos = relationship("Pedido", foreign_keys="Pedido.usuario_id", back_populates="usuario")

class Pedido(Base):

    __tablename__ = "pedidos"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    produto_id = Column(Integer, ForeignKey("produtos.id"))
    quantidade = Column(Integer)
    entrega = Column(Boolean, default=True)
    endereco = Column(String)
    observacoes = Column(String, default='Sem observações')

    usuario = relationship("Usuario", foreign_keys="Pedido.usuario_id", back_populates="pedidos")
    produto = relationship("Produto", foreign_keys="Pedido.produto_id", back_populates="pedidos")


