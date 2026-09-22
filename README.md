# Sistema Condominial - API

API desenvolvida em TypeScript utilizando Fastify e MySQL para um sistema de gestão condominial.

## Tecnologias

- Node.js 24
- TypeScript
- Fastify
- MySQL
- mysql2
- dotenv

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/PCBorges10/sistema-condominio-api.git
```

### 2. Entrar na pasta do projeto

```bash
cd sistema-condominio-api
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Criar o banco de dados

Abra o MySQL Workbench e execute o arquivo:

```text
sql/schema.sql
```

Esse arquivo cria o banco `sistema_condominio` e as tabelas necessárias.

### 5. Criar o arquivo `.env`

Na raiz do projeto, crie um arquivo chamado:

```text
.env
```

E coloque:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=sistema_condominio
```

Troque:

```text
sua_senha
```

pela senha do seu MySQL.

O arquivo `.env` não deve ser enviado para o GitHub.

### 6. Executar a aplicação

```bash
npm run dev
```

A API ficará disponível em:

```text
http://127.0.0.1:3000
```

## Rotas implementadas

### Condomínios

```text
GET    /condominios
GET    /condominios/:id
POST   /condominios
PUT    /condominios/:id
DELETE /condominios/:id
```

### Unidades

```text
GET    /unidades
GET    /unidades/:id
POST   /unidades
PUT    /unidades/:id
DELETE /unidades/:id
```

## Estrutura principal do projeto

```text
sistema-condominio-api/
├── sql/
│   └── schema.sql
├── src/
│   ├── database/
│   │   └── connection.ts
│   ├── routes/
│   │   ├── condominios.routes.ts
│   │   └── unidades.routes.ts
│   └── index.ts
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```