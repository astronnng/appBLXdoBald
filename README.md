# BLX - Sistema de Marketplace ![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

<img src="backend/repositorio_arq/imagem.png" alt="Mascote do projeto" width="200">

Uma solução completa de marketplace (Frontend + Backend) para venda de produtos, combinando a robustez da API **appBLXdoBald** com uma interface moderna e responsiva.

## 🚀 Sobre o Projeto

Este ecossistema foi evoluído de uma API simples para uma plataforma profissional composta por:

*   **Backend (FastAPI):** API robusta com autenticação JWT, persistência em SQLite e documentação interativa.
*   **Frontend (React):** Interface premium, responsiva e interativa, focada na experiência do usuário e agilidade nas transações.

---

## 💻 Funcionalidades Principais

### 🔧 Backend (FastAPI)
- [x] Arquitetura estruturada com padrões de repositório.
- [x] Autenticação segura usando **JWT (JSON Web Tokens)**.
- [x] Hashing de senhas com **Argon2**.
- [x] Documentação automática via **Swagger UI** e **ReDoc**.
- [x] Banco de dados SQLite persistente.

### 🎨 Frontend (React + Tailwind)
- [x] Design moderno e responsivo com **Tailwind CSS 4**.
- [x] Contexto de Autenticação global para gestão de sessão.
- [x] **Vitrine de Produtos:** Listagem dinâmica com feedback de carregamento.
- [x] **Cadastro de Produtos:** Formulário inteligente que utiliza o ID do usuário logado.
- [x] **Gestão de Pedidos:** Histórico de compras protegido por login.
- [x] **Perfil do Usuário:** Dashboard de métricas e informações da conta.

---

## 🛠️ Instalação e Uso

### 🐳 Via Docker (Recomendado)
Docker é a forma mais fácil de subir o ambiente completo.

1.  No diretório raiz do projeto, execute:
    ```bash
    docker-compose up --build
    ```
2.  O **Frontend** estará disponível em `http://localhost:8080`.
3.  O **Backend** estará disponível em `http://localhost:8000`.

### 🖥️ Execução Local

#### Frontend
1. Acesse a pasta: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm run dev` (disponível em `http://localhost:5173`)

#### Backend
1. Acesse a pasta: `cd backend`
2. Crie e ative o ambiente virtual: `python -m venv .venv` e `. .venv/Scripts/activate`
3. Instale as dependências: `pip install -r requirements.txt`
4. Inicie o servidor: `uvicorn src.server:app --reload` (disponível em `http://localhost:8000`)

---

## 📖 Documentação da API
Após subir o servidor backend, acesse:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## 📦 Principais Endpoints

### Autenticação
- `POST /login`: Gera o token de acesso (`acesso_token`).
- `GET /login/me`: Retorna o perfil do usuário logado.

### Produtos
- `GET /produtos`: Lista todos os produtos.
- `POST /produtos`: Cria um novo produto (Requer Auth).

### Pedidos
- `GET /pedidos`: Lista os pedidos do usuário autenticado.

---

## 📝 Licença
Este projeto está sob a licença [MIT](LICENSE.md).
