from datetime import datetime, timedelta
from jose import jwt


# CONFIG
SECRET_KEY = "nossa_que_chavao"
ALGORITHM = "HS256"
EXPIRES_IN_MIN = 160


def criar_acess_token(data: dict):
    dados = data.copy()
    expiracao = datetime.utcnow() + timedelta(minutes=EXPIRES_IN_MIN)
    dados.update({"exp": expiracao})
    return jwt.encode(dados, SECRET_KEY, algorithm=ALGORITHM)


def verificar_acess_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.JWTError:
        return None


