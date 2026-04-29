from fastapi import FastAPI, Depends, Request, BackgroundTasks
import time
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from src.routers import rotas_auth
from src.config.database import get_session, create_db_and_tables
from src.routers import rotas_produtos, rotas_pedidos
from src.jobs.write_notification import write_notification

create_db_and_tables()


app = FastAPI()
#Rotas Produtos
app.include_router(rotas_produtos.router)


#Rotas SEGURANÇA: Autenticação e Autorização
app.include_router(rotas_auth.router)


#Rotas pedidos
app.include_router(rotas_pedidos.router)

#Rotas de envio de email
@app.post("/send_email/{email}")
def send_email(email: str, background: BackgroundTasks):
    background.add_task(write_notification, email, 'Ola')
    return {"message": "Email enviado com sucesso"}




app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])


@app.middleware("http")
async def processar_tempo_requisicao(request: Request, call_next):
    inicio = time.time()
    response = await call_next(request)
    fim = time.time()
    print(f"Tempo de execução: {fim - inicio}")
    return response