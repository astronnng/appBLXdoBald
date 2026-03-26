from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session
from src.config.database import get_session
from src.infra.providers import token_providers
from src.repositorios.usuarios import RepositorioUsuario
from fastapi import Depends, FastAPI, HTTPException

# Esquema de segurança que define onde o FastAPI deve procurar o token (no cabeçalho Authorization: Bearer <token>)
# O tokenUrl aponta para a rota que gera o token de acesso
oauth2_schema = OAuth2PasswordBearer(tokenUrl="auth/token")

def obter_usuario_logado(token: str = Depends(oauth2_schema), session: Session = Depends(get_session)):
    """
    Dependência para obter o usuário atualmente autenticado a partir do token JWT.
    
    1. O token é extraído automaticamente do cabeçalho da requisição.
    2. O payload do token é decodificado e verificado.
    3. O identificador do usuário (telefone) é extraído do payload.
    4. O banco de dados é consultado para retornar o objeto completo do usuário.
    """
    status_code = HTTPException(
        status_code=401,
        detail="Token de acesso inválido"
    )
    
    # Tenta decodificar o token usando o provedor de tokens
    payload = token_providers.verificar_acess_token(token)
    if not payload:
        raise status_code
    
    # Extrai o ID/Telefone do usuário que foi guardado no payload durante o login
    telefone = payload.get("usuario_id")
    
    if not telefone:
        raise status_code
    
    # Busca o usuário no banco de dados para garantir que ele ainda existe
    usuario = RepositorioUsuario(session).buscar_por_telefone(telefone)

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    # Retorna o objeto usuário para ser injetado nos endpoints que dependem desta função
    return usuario 
