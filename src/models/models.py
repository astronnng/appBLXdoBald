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

class Usuario(Base):

    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    senha = Column(String)
    telefone = Column(String)
    meus_produtos = Column(String)
    minhas_vendas = Column(String)
    meus_pedidos = Column(String)
    usuario_id = Column(Integer, ForeignKey("usuarios.id")) #usado o _id para refletir a relação de chave estrangeira
    produtos = relationship("Produto", back_populates="usuario")




