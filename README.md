# 🍕 Pac Pizzaria — Sistema de Gestão Interna

Sistema fullstack de **gestão interna para uma pizzaria**, desenvolvido como projeto acadêmico. Permite gerenciar produtos, clientes e pedidos, com autenticação, painel de indicadores e exportação de dados.

---

## 📖 Sobre o projeto

O **Pac Pizzaria** é um sistema de **gestão interna** pensado para o dia a dia de uma pizzaria. Diferente de um cardápio voltado ao cliente final, o foco aqui é a **operação interna**: controlar produtos, clientes e pedidos em um só lugar, com um painel que dá a visão geral do negócio (totais, faturamento e últimos pedidos).

O projeto foi desenvolvido como **trabalho acadêmico**, com o objetivo de aplicar na prática conceitos de desenvolvimento **fullstack** — integrando uma interface web a uma API própria, com banco de dados e autenticação.

---

## 🧩 Como foi desenvolvido

A aplicação segue uma arquitetura **cliente-servidor**: o frontend em Angular consome uma **API REST** construída em Node.js/Express, que persiste os dados em um banco **SQLite** e protege as rotas com **autenticação JWT**.

O desenvolvimento foi feito em **dupla**, usando o **GitHub Codespaces** e versionamento com **Git**. As principais etapas foram:

- **Backend:** modelagem das entidades (produtos, clientes, pedidos e usuários) e criação dos endpoints REST, com documentação via Swagger.
- **Frontend:** a interface partiu do template Sakai (PrimeNG) como base e foi adaptada para consumir a API. Cada entidade ganhou um **CRUD completo** (listar, criar, editar e excluir).
- **Regras de negócio:** o pedido monta a lista de itens e **calcula o total automaticamente**; o cadastro de clientes preenche o endereço a partir do **CEP** (ViaCEP).
- **Identidade visual:** o template recebeu um **tema próprio** (cores, logo e ajustes de layout) para ter cara de sistema de gestão profissional.
- **Limpeza e organização:** todo o código de exemplo que veio com o template foi **removido**, deixando o projeto enxuto e contendo apenas o que é realmente usado.
- **Dashboard:** um painel reúne **indicadores reais** (totais e faturamento), gráficos e a tabela dos últimos pedidos.

---

## ✨ Funcionalidades

- 🔐 **Autenticação** com JWT — login protegido e guarda de rotas
- 📊 **Dashboard** com indicadores (produtos, clientes, pedidos, faturamento), gráficos e tabela dos últimos pedidos
- 🍕 **Produtos** — cadastro completo (criar, listar, editar, excluir)
- 👥 **Clientes** — cadastro completo com preenchimento de endereço por CEP (ViaCEP)
- 🧾 **Pedidos** — montagem do pedido escolhendo cliente e produtos, com **cálculo automático do total** e controle de status
- 📥 **Exportação em CSV** das tabelas
- 📚 **Documentação da API** via Swagger

---

## 🛠️ Tecnologias

**Frontend**
- Angular 16
- PrimeNG (componentes de interface)
- Chart.js (gráficos)

**Backend**
- Node.js + Express
- SQLite (banco de dados)
- JWT (autenticação)
- Swagger (documentação da API)

---

## 📁 Estrutura do projeto

```
crud-primeng-fullstack/
├── back/    → API REST (Express + SQLite)
└── front/   → Aplicação web (Angular + PrimeNG)
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- npm

### 1. Backend (API)

```bash
cd crud-primeng-fullstack/back
npm install
```

Crie um arquivo **`.env`** dentro da pasta `back/` com o seguinte conteúdo:

```
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=1d
```

Inicie o servidor:

```bash
npm start
```

A API sobe em **http://localhost:3000** e a documentação (Swagger) fica em **http://localhost:3000/api-docs**.

### 2. Frontend (aplicação web)

Em outro terminal:

```bash
cd crud-primeng-fullstack/front
npm install
npm start
```

A aplicação abre em **http://localhost:4200**.

> 💡 Para acessar o sistema, crie um usuário pela API (use o Swagger em `/api-docs`) e faça login na tela inicial.

---

## 📸 Capturas de tela

<img width="82.3 height="73.78" alt="Image" src="https://github.com/user-attachments/assets/498df44e-1fdf-4a79-98fe-af01cb80af68" />
---

## 👨‍💻 Autores

- **Henrique Carneiro** — [@Henrique-CR0](https://github.com/Henrique-CR0)
- **Lucas Vietez** — [@lucasveietez-cmyk](https://github.com/lucasveietez-cmyk)

---

## 📄 Licença

Projeto de uso acadêmico e educacional.