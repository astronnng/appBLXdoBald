from pwdlib import PasswordHash


password_hash = PasswordHash.recommended()

def gerar_hash(texto):
    return password_hash.hash(texto)

def verificar_hash(texto_plano, hash):
    return password_hash.verify(texto_plano, hash)



