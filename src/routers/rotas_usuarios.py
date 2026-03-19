from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_session
from src.repositorios.usuarios import RepositorioUsuario
from src.schemas.schemas import Usuario
from src.schemas import schemas

router = APIRouter()

@router.post("/usuarios")
def criar_usuario(usuario: Usuario, db: Session = Depends(get_session)):
    usuario_criado = RepositorioUsuario(db).criar(usuario)
    return usuario_criado


@router.get("/usuarios", response_model=list[schemas.Usuario])
def listar_usuarios(db: Session = Depends(get_session)):
    return RepositorioUsuario(db).listar()

@router.get("/usuarios/{usuario_id}", response_model=schemas.Usuario)
def obter_usuario(usuario_id: int, db: Session = Depends(get_session)):
    usuario = RepositorioUsuario(db).obter(usuario_id)
    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario