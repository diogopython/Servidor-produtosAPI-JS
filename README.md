# API de Produtos

Uma API RESTful para gerenciamento de produtos, construída com **Node.js**, **Express**, **MongoDB** e **MariaDB**. Permite realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) produtos, com autenticação e registro de logs.

---

## Tecnologias utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para criação de APIs RESTful.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **MariaDB**: Banco de dados relacional para gerenciamento de informações estruturadas.

---

## Funcionalidades

- CRUD completo de produtos:
  - Criar novos produtos
  - Listar produtos
  - Atualizar produtos existentes
  - Deletar produtos
- Autenticação básica de usuários
- Registro de logs de operações
- Suporte a múltiplos bancos de dados (MongoDB e MariaDB)

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/diogopython/Servidor-produtosAPI-JS.git
cd Servidor-produtosAPI-JS

2. Instalaçao das libs do projeto
```bash
node install

3. modificar os arquivos
 - mongo.js
 - .env
  - *Exemplo*
    """
        DB_HOST=localhost
        DB_USER=*seu_usuario*
        DB_PASSWORD=*seu_password*
        DB_DATABASE=produtosAPI
        JWT_SECRET=983hye983gr43t53fg5hy24ytg
        JWT_EXPIRES_IN=1h
    """

4. rodar o projeto
```bash
node index.js