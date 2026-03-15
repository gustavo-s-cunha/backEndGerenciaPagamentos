# Multi-Gateway Payments API

API desenvolvida em Node.js + TypeScript para gerenciamento de pagamentos com múltiplos gateways.

A aplicação implementa autenticação, controle de permissões por roles, processamento de compras e fallback entre gateways de pagamento.

---

# Tecnologias Utilizadas

* Node.js
* TypeScript
* Express
* MySQL
* Knex.js (ORM / Query Builder)
* Docker / Docker Compose
* Jest (Testes)
* JSON Web Token (JWT)

---

# Requisitos
* Node.js 18+
* npm
* Docker
* Docker Compose

---

# Instalação do Projeto

```bash
npm install
```

---

# Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto.
Exemplo em: .env.example

---

# Subindo a Aplicação com Docker
```bash
npm run up
```

Esse comando irá:

1. Compilar o projeto
2. Subir os containers definidos no `docker-compose`
3. Iniciar o banco MySQL
4. Iniciar a aplicação

---

# Executar Migrations

Após subir o banco, execute:

```bash
npm run migrate
```

Isso irá criar todas as tabelas necessárias no banco.

---

# Derrubar Containers

```bash
npm run down
```

---

# Executar em Ambiente de Desenvolvimento

Para rodar sem Docker:

```bash
npm run dev
```

# Build de Produção

```bash
npm run build
```

Rodar versão compilada:

```bash
npm start
```

---

# Executar Testes - Jest

```bash
npm run test -- watch
```


---

# Estrutura base do Projeto

```
src
 ├ modules
 │   ├ auth
 │   ├ clients
 │   ├ gateways
 │   ├ products
 │   ├ roles
 │   ├ transactions
 │   └ users
 │
 ├ shared
 │   ├ errors
 │   ├ middlewares
 │   └ utils
 │
 ├ infra
 │   ├ database
 │   │   └ migrations
 │   └ http
 │       └ routes
 │
 ├ tests
 │
 ├ app.ts
 └ server.ts
```

Arquitetura baseada em:

* Controllers
* Services
* Repositories

---



## Chamadas nos gatways testando suas respostas:
```
src/tests/routes/fetch_routs.md
```


### Projeto desenvolvido como parte de um teste técnico backend.

## Dificuldades:
- Ajustar dependencias do projeto  
  -- Migraine (knex) junto com vinejs  
- Hardware windows com pouca memória