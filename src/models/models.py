from sqlalchemy import Column, Integer, String, Float, Boolean
from src.config.database import Base



class Produto(Base):

    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    descricao = Column(String)
    preco = Column(Float)
    disponivel = Column(Boolean)

