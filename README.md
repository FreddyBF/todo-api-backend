# ✅ Todo API — Backend para Gestão de Tarefas

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-ff6b00?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-informational?style=for-the-badge)

---

## 🧭 Visão Geral

O **Todo API** é um backend moderno para gerenciamento de tarefas, construído com foco em arquitetura limpa, escalabilidade e segurança. A API segue os princípios RESTful e implementa autenticação via JWT, validação robusta e manipulação estruturada de erros.

Ideal para aplicações web ou mobile que demandam um backend robusto e extensível, este projeto também serve como referência técnica profissional.

---

## 💼 Tecnologias e Ferramentas

| Categoria         | Ferramenta                                                                 |
|-------------------|----------------------------------------------------------------------------|
| Linguagem         | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) |
| Runtime           | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)         |
| Framework         | ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)   |
| ORM               | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)            |
| Banco de Dados    | ![SQLite](https://img.shields.io/badge/SQLite-07405E?logo=sqlite&logoColor=white) / ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white) |
| Autenticação      | ![JWT](https://img.shields.io/badge/JWT-ff6b00?logo=jsonwebtokens&logoColor=white) + ![bcrypt](https://img.shields.io/badge/Bcrypt-grey?logo=github&logoColor=white) |
| Validação         | ![Zod](https://img.shields.io/badge/Zod-3a77ff?logo=typescript&logoColor=white)             |
| Dev Tools         | ![Nodemon](https://img.shields.io/badge/Nodemon-76d04b?logo=nodemon&logoColor=white) / ![ts-node-dev](https://img.shields.io/badge/ts--node--dev-blue?logo=typescript&logoColor=white) |
| Testes Manuais    | ![Insomnia](https://img.shields.io/badge/Insomnia-4000bf?logo=insomnia&logoColor=white) / ![Thunder Client](https://img.shields.io/badge/ThunderClient-REST-blueviolet?logo=thunderclient) |
 |

---

## 📌 Funcionalidades

- 🔐 Autenticação com JWT (login/registro)
- ✅ CRUD de tarefas completo (criar, listar, editar, remover)
- 🔍 Validação de dados com Zod e DTOs
- 🔒 Proteção de rotas com middleware de autenticação
- 🧱 Arquitetura modular baseada em serviços e repositórios
- ⚙️ Integração com Prisma ORM para acesso a banco de dados

---

## 🗂 Estrutura do Projeto

```bash
src/
├── config/         # ⚙️ Configurações globais (env, db)
├── controllers/    # 🎯 Lógica de controle — entrada das requisições
├── dtos/           # 📦 DTOs — formatos esperados para entrada/saída de dados
├── errors/         # 🚨 Manipulação centralizada de erros e exceções
├── interfaces/     # 🧩 Interfaces e tipos reutilizáveis
├── middlewares/    # 🛡️ Middlewares globais e por rota (auth, validação, logs)
├── repositories/   # 🗄️ Camada de persistência (Prisma ORM + abstrações)
├── routes/         # 🌐 Agrupamento das rotas por domínio
├── services/       # 🧠 Camada de negócio — regras e orquestração
├── utils/          # 🔧 Funções utilitárias (hash, JWT, helpers, etc.)
├── app.ts          # 🧬 Instância principal do app (Express, middlewares, rotas)
└── server.ts       # 🚀 Inicialização do servidor HTTP

```

---

## 🧪 Endpoints REST

### 👤 Autenticação

| Método | Rota                  | Descrição                    |
|--------|------------------------|------------------------------|
| POST   | `/api/auth/register`   | Cadastro de novo usuário     |
| POST   | `/api/auth/login`      | Login com retorno de token   |

### 📋 Tarefas

| Método  | Rota               | Autenticada | Descrição                |
|---------|--------------------|-------------|--------------------------|
| GET     | `/api/tasks`       | ✅          | Listar todas as tarefas  |
| POST    | `/api/tasks`       | ✅          | Criar nova tarefa        |
| PUT     | `/api/tasks/:id`   | ✅          | Atualizar uma tarefa     |
| DELETE  | `/api/tasks/:id`   | ✅          | Remover uma tarefa       |

> **Atenção**: as rotas protegidas requerem o envio do token JWT no header:  
> `Authorization: Bearer <token>`

---
## ⚙️ Como Executar o Projeto

Siga os passos abaixo para configurar e executar a Todo API em seu ambiente local.

---

### 📥 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/todo-api.git
cd todo-api
```

### 📦 2. Instale as Dependências

```bash
npm install
```

### 🔐 3. Configure as Variáveis de Ambiente

```bash
cp .env.example .env
```
Em seguida, edite o arquivo `.env` com suas configurações (porta, segredo JWT, URL do banco de dados, etc.).

---

### 🛠️ 4. Configure o Prisma ORM

####  Gerar o cliente Prisma
```bash
npm run generate
```


####  Criar e aplicar as migrações

```bash
npm run migrate
```

#### (Opcional) Abrir a interface visual do banco de dados

```bash
npm run studio
```

### 🚀 5. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```