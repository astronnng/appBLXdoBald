from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session
from src.config.database import get_session
from src.infra.providers import token_providers
from src.repositorios.usuarios import RepositorioUsuario
from fastapi import Depends, FastAPI, HTTPException

oauth2_schema = OAuth2PasswordBearer(tokenUrl="auth/token")

def obter_usuario_logado(token: str = Depends(oauth2_schema), session: Session = Depends(get_session)):
    try:
        telefone = token_providers.verificar_acess_token(token).get("usuario_id")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token de acesso inválido") 
    
    if not telefone:
        raise HTTPException(status_code=401, detail="Telefone invalido")
    
    usuario = RepositorioUsuario(session).buscar_por_telefone(telefone)

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario 
