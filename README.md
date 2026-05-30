# 🍕 Pizzaria Fullstack — Fase 0 (Fundação)

Projeto base com **autenticação JWT** funcionando: cadastro, login, rota protegida,
documentação Swagger e CORS configurado. A partir daqui a equipe cria as entidades
do tema (Clientes, Produtos, Pedidos).

## 🧱 Estrutura

```
pizzaria-fullstack/
├── backend/                 # API REST (Node.js + Express)
│   ├── server.js            # arquivo principal
│   └── src/
│       ├── config/          # banco (SQLite) e Swagger
│       ├── models/          # tabelas do banco
│       ├── middleware/      # autenticação JWT
│       ├── controllers/     # lógica das rotas
│       └── routes/          # caminhos da API + doc Swagger
└── frontend/                # interface (HTML, CSS, JS)
    ├── index.html           # login / cadastro
    ├── dashboard.html       # página protegida
    ├── css/style.css
    └── js/
```

## ▶️ Como rodar no GitHub Codespaces

> O frontend já descobre a URL da API sozinho (ver `descobrirApiUrl()` nos
> arquivos JS), então **não precisa editar `API_URL`**.

### 1) Backend
Abra um terminal no Codespaces:
```bash
cd backend
npm install
cp .env.example .env       # depois troque o JWT_SECRET dentro do .env
npm run dev
```
O Codespaces vai detectar a porta **3000** e mostrar um aviso de "porta encaminhada".

### 2) Deixe a porta 3000 PÚBLICA (passo essencial!)
Na aba **PORTS** (ao lado do terminal), clique com o botão direito na porta **3000**
→ **Port Visibility** → **Public**.
Sem isso, o frontend é bloqueado ao tentar acessar a API (erro de CORS/autenticação).

### 3) Frontend
Instale a extensão **Live Server** no Codespaces, clique com o botão direito em
`frontend/index.html` → **Open with Live Server**. Ele abre numa porta própria
(ex.: 5500), também encaminhada. Pronto: cadastro e login já funcionam.

> 💡 A documentação Swagger fica na URL pública da porta 3000 + `/api-docs`.

---

## ▶️ Como rodar localmente (alternativa)
```bash
cd backend && npm install && cp .env.example .env && npm run dev
```
Abra `frontend/index.html` com o Live Server. A API responde em `http://localhost:3000`.

## 🔐 Rotas já prontas

| Método | Rota             | Protegida? | O que faz                |
|--------|------------------|------------|--------------------------|
| POST   | `/auth/registrar`| não        | Cadastra usuário         |
| POST   | `/auth/login`    | não        | Faz login, devolve token |
| GET    | `/auth/perfil`   | **sim**    | Dados do usuário logado  |

## ➕ Como criar uma nova entidade (o padrão a seguir)

Para cada entidade nova (ex.: `Produto`), copie a lógica do usuário e crie 3 arquivos:

1. **Model** — `src/models/Produto.js`: define as colunas (Nome, Preço, etc.).
2. **Controller** — `src/controllers/produtoController.js`: funções
   `listar`, `buscarPorId`, `criar`, `atualizar`, `deletar`.
3. **Rota** — `src/routes/produtoRoutes.js`: liga os caminhos ao controller,
   com os comentários `@swagger`. Proteja com o middleware `autenticar`.

Depois, registre a rota no `server.js`:
```js
const produtoRoutes = require('./src/routes/produtoRoutes');
app.use('/produtos', produtoRoutes);
```

No frontend, crie uma página com um formulário (criar/editar) e uma tabela
(listar/deletar), chamando a API com Fetch e enviando o token no cabeçalho:
```js
headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
```

## 👥 Divisão (lembrete)
- **Fase 0 (esta):** feita em equipe.
- **Pessoa A:** Clientes (ViaCEP + IBGE).
- **Pessoa B:** Produtos + gestão de Usuários.
- **Juntos:** Pedidos.

> Use branches por pessoa (`feature/clientes`, `feature/produtos`) e
> assine os comentários no código: `// ... - [Seu Nome]`.
