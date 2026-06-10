# 🍕 Pac Pizzaria — Sistema de Gestão Interna

Sistema fullstack de **gestão interna para uma pizzaria**, desenvolvido como projeto acadêmico. Permite gerenciar produtos, clientes e pedidos, com autenticação, painel de indicadores e exportação de dados.

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

<!-- Adicione aqui prints do sistema. Exemplo:
![Tela de login](docs/login.png)
![Dashboard](docs/dashboard.png)
-->

---

## 👨‍💻 Autores

- **Henrique Carneiro** — [@Henrique-CR0](https://github.com/Henrique-CR0)
- **Lucas Vietez** — [@lucasveietez-cmyk](https://github.com/lucasveietez-cmyk)

---

## 📄 Licença

Projeto de uso acadêmico e educacional.