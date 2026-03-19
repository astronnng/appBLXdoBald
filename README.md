# appBLXdoBald

![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)
![GitHub forks](https://img.shields.io/github/forks/iuricode/README-template?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/iuricode/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/iuricode/README-template?style=for-the-badge)

# Mascote do projeto.


<img src="repositorio_arq/imagem.png" alt="Mascote do projeto">

> App simples de vendas de produtos usando Python e FastAPI.

### Ajustes e melhorias - m
O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas para as seguintes tarefas:

- [x] Criação do backend e classes
- [x] Configurando API para requests
- [ ] Modelagem de dados para interface
- [ ] Testes de qualidade para estailidade
- [ ] Finalização do projeto

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente de `<python / pydantic / BaseModel / Optional>`
- Você tem uma máquina `<Windows / Linux / Mac>`. Compativel com todos os OS.

## ☕ Usando <appBLXdoBald>

Para usar <appBLXdoBald>, siga estas etapas:

```
Suba seu FastAPI com ambiente env em Pyhton e use o insonimia ou Postman para estar realizando requisições
```

## 📦 Exemplos de Requisições

Com base nos modelos definidos em `src/models/models.py`, a API oferece as seguintes entidades:

- **Produto** (`/produtos`)
- **Usuário** (`/usuarios`)
- **Pedido** (`/pedidos`)

### Criar um Produto

```bash
curl -X POST "http://localhost:8000/produtos" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Camiseta",
    "descricao": "Camiseta 100% algodão",
    "preco": 49.90,
    "disponivel": true,
    "usuario_id": 1
  }'
```

### Listar Produtos

```bash
curl -X GET "http://localhost:8000/produtos"
```

### Criar um Usuário

```bash
curl -X POST "http://localhost:8000/usuarios" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "telefone": "11999998888",
    "senha": "senha123"
  }'
```

### Listar Usuários

```bash
curl -X GET "http://localhost:8000/usuarios"
```

### Criar um Pedido

```bash
curl -X POST "http://localhost:8000/pedidos" \
  -H "Content-Type: application/json" \
  -d '{
    "usuario_id": 1,
    "produto_id": 1,
    "quantidade": 2,
    "entrega": true,
    "endereco": "Rua Exemplo, 123",
    "observacoes": "Sem observações"
  }'
```

### Listar Pedidos

```bash
curl -X GET "http://localhost:8000/pedidos"
```

## 📫 Contribuindo para <appBLXdoBald>

Para contribuir com <appBLXdoBald>, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <appBLXdoBald> / <local>`
5. Crie a solicitação de pull.

## 🤝 Los cuatro melhores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#" title="defina o título do link">
        <img src="https://pbs.twimg.com/profile_images/1840032466981052416/Y812LtWV.jpg" width="100px;" alt="Foto do rengar"/><br>
        <sub>
          <b>Alexandre Rengar</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="defina o título do link">
        <img src="https://i.imgur.com/hTMg2Kt.jpeg" width="80px;" alt="Foto do jhin do alan"/><br>
        <sub>
          <b>Jhin Opressor</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="defina o título do link">
        <img src="https://media.discordapp.net/attachments/1257661583732244500/1459188676436299776/59293832.png?ex=69625eda&is=69610d5a&hm=b2de8d7f22e00a6d7d8efc476ae338d5f07b8a9149f196a74c28986bc6dfe1f3&=&format=webp&quality=lossless&width=499&height=499" width="100px;" alt="Foto do yasuo do vasco"/><br>
        <sub>
          <b>Cadu do vasco</b>
        </sub>
      </a>
      </td>
    <td align="center">
      <a href="#" title="defina o título do link">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnamLoOyC8j5lENbcDFLAc-IqiiCdTAEqMGQ&s" width="80px;" alt="Foto do Delfito pelado"/><br>
        <sub>
          <b>Bruno delfyters</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 😄 Seja um dos contribuidores

Quer fazer parte desse projeto? Clique [AQUI](CONTRIBUTING.md) e leia como contribuir.

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
