# appBLXdoBald

![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)

<img src="repositorio_arq/imagem.png" alt="Mascote do projeto" width="200">

> Uma REST API robusta para venda de produtos desenvolvida com **Python** e **FastAPI**.

## 🚀 Status do Projeto
O projeto foi evoluído de um app simples para uma API profissional com as seguintes melhorias:
- [x] Backend estruturado com padrões de repositório.
- [x] Autenticação segura usando **JWT (JSON Web Tokens)**.
- [x] Dash de senhas usando **Argon2**.
- [x] Containerização completa com **Docker** e **Docker Compose**.
- [x] Banco de dados SQLite persistente.
- [x] Remoção de frontend legado para foco total em API.

## 💻 Pré-requisitos
- Python 3.11+ (se rodar localmente)
- Docker e Docker Compose (recomendado)

## 🛠️ Instalação e Uso

### Opção 1: Via Docker (Recomendado)
Docker é a forma mais fácil de subir o ambiente completo com persistência de dados.
```bash
docker-compose up --build
```
A API estará disponível em `http://localhost:8000`.

### Opção 2: Localmente
1. Crie e ative o ambiente virtual:
   ```bash
   python -m venv .venv
   .\.venv\Scripts\activate
   ```
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
3. Inicie o servidor:
   ```bash
   uvicorn src.server:app --reload
   ```

## 📖 Documentação da API
Após subir a API, acesse a documentação interativa:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 📦 Principais Endpoints

### Autenticação
- `POST /auth/token`: Gera o token de acesso (login).
- `GET /login/me`: Retorna o perfil do usuário logado.

### Produtos
- `GET /produtos`: Lista todos os produtos.
- `POST /produtos`: Cria um novo produto (Requer Auth).

### Pedidos
- `GET /pedidos`: Lista os pedidos do usuário autenticado.
- `POST /pedidos`: Realiza um novo pedido.

## 📝 Licença
Este projeto está sob a licença [MIT](LICENSE.md).
