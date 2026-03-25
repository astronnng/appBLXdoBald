from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from src.routers import rotas_auth
from src.config.database import get_session, create_db_and_tables
from src.routers import rotas_produtos, rotas_pedidos

create_db_and_tables()


app = FastAPI()
#Rotas Produtos
app.include_router(rotas_produtos.router)


#Rotas SEGURANÇA: Autenticação e Autorização
app.include_router(rotas_auth.router)


#Rotas pedidos
app.include_router(rotas_pedidos.router)


app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


