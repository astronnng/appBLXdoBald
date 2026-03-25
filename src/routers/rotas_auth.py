from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.infra.providers import token_providers
from src.config.database import get_session
from src.models.models import Usuario
from src.repositorios.usuarios import RepositorioUsuario
from src.schemas.schemas import UsuarioCreate, UsuarioResponse, LoginData
from src.infra.providers import hash_provider
from src.routers.router_util import obter_usuario_logado



router = APIRouter()
@router.post("/usuarios", response_model=UsuarioResponse)
def criar_usuario(usuario: UsuarioCreate, db: Session = Depends(get_session)):
    
    
    repositorio = RepositorioUsuario(db)
    usuario_existente = repositorio.buscar_por_telefone(usuario.telefone)
    
    if usuario_existente:
        raise HTTPException(
            status_code=400, 
            detail="Já existe um usuário com este número de telefone"
        )
    
    usuario.senha = hash_provider.gerar_hash(usuario.senha)
    usuario_criado = repositorio.criar(usuario)

    if usuario_criado is None:
        raise HTTPException(status_code=400, detail="Erro ao criar usuário")
    
    return usuario_criado


@router.get("/usuarios", response_model=list[UsuarioResponse])
def listar_usuarios(db: Session = Depends(get_session)):
    return RepositorioUsuario(db).listar()

@router.get("/usuarios/{usuario_id}", response_model=UsuarioResponse)
def obter_usuario(usuario_id: int, db: Session = Depends(get_session)):
    usuario = RepositorioUsuario(db).obter(usuario_id)
    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

@router.post("/login")
def login(login_data: LoginData, session: Session = Depends(get_session)):
    repositorio = RepositorioUsuario(session)
    usuario = repositorio.buscar_por_telefone(login_data.telefone)

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    if not hash_provider.verificar_hash(login_data.senha, usuario.senha):
        raise HTTPException(status_code=401, detail="Senha incorreta")

    return {"message": "Login bem-sucedido", "usuario_id": usuario.id}



@router.get("/login/me", response_model=UsuarioResponse)
def me(usuario: Usuario = Depends(obter_usuario_logado)):
    return usuario


@router.post("/auth/token")
def login_token(login_data: LoginData, db: Session = Depends(get_session)):
    repositorio = RepositorioUsuario(db)
    usuario = repositorio.buscar_por_telefone(login_data.telefone)

    if not usuario:
        raise HTTPException(status_code=401, detail="Telefone ou senha inválidos")

    if not hash_provider.verificar_hash(login_data.senha, usuario.senha):
        raise HTTPException(status_code=401, detail="Telefone ou senha inválidos")

    token = token_providers.criar_acess_token({"usuario_id": usuario.telefone})

    return {"usuario": usuario, "access_token": token, "token_type": "bearer"}

