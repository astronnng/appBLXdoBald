from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, Session
from typing import Annotated
from fastapi import Depends

# Nome e URL do banco de dados (neste caso, SQLite)
DB_FILE = "blx_banco.db"
sqlite_url = f"sqlite:///{DB_FILE}"

# Base para os modelos SQLAlchemy
Base = declarative_base()

# O connect_args é necessário apenas para o SQLite
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

# Função que cria as tabelas no banco de dados
def create_db_and_tables():
    Base.metadata.create_all(engine)

# Dependência para obter a sessão do banco em cada requisição
def get_session():
    with Session(engine) as session:
        yield session

# Atalho para facilitar a injeção de dependência nos endpoints
SessionDep = Annotated[Session, Depends(get_session)]