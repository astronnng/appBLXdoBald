from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_session
from src.repositorios.usuarios import RepositorioUsuario
from src.schemas.schemas import UsuarioCreate, UsuarioResponse
from src.infra.providers import hash_provider




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