// Logica do CRUD de Produtos no frontend.
// Faz as 4 operacoes via Fetch, sempre enviando o token JWT. - [Equipe Pizzaria]

// Descobre a URL da API (local ou Codespaces).
function descobrirApiUrl() {
  const host = window.location.hostname;
  if (host.endsWith('.app.github.dev')) {
    return 'https://' + host.replace(/-\d+\.app\.github\.dev$/, '-3000.app.github.dev');
  }
  return 'http://localhost:3000';
}
const API_URL = descobrirApiUrl();

const token = localStorage.getItem('token');

// Sem token, volta para o login (rota protegida).
if (!token) {
  window.location.href = 'index.html';
}

// Cabecalho padrao com o token, usado em todas as requisicoes.
const cabecalhoAuth = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

// Elementos da tela
const form = document.getElementById('form-produto');
const lista = document.getElementById('lista-produtos');
const avisoVazio = document.getElementById('aviso-vazio');
const msg = document.getElementById('msg-produto');
const tituloForm = document.getElementById('titulo-form');
const botaoCancelar = document.getElementById('botao-cancelar');

function mostrarMensagem(texto, tipo) {
  msg.textContent = texto;
  msg.className = 'mensagem ' + tipo;
  setTimeout(() => (msg.className = 'mensagem'), 2500);
}

// Se o token expirar (401), limpa e volta ao login.
function tratarNaoAutorizado(resposta) {
  if (resposta.status === 401) {
    localStorage.clear();
    window.location.href = 'index.html';
    return true;
  }
  return false;
}

// LISTAR (read): busca os produtos e desenha a tabela.
async function carregarProdutos() {
  try {
    const resposta = await fetch(`${API_URL}/produtos`, { headers: cabecalhoAuth });
    if (tratarNaoAutorizado(resposta)) return;

    const produtos = await resposta.json();
    lista.innerHTML = '';

    avisoVazio.style.display = produtos.length === 0 ? 'block' : 'none';

    produtos.forEach((p) => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${p.nome}</td>
        <td>${p.categoria}</td>
        <td>R$ ${Number(p.preco).toFixed(2)}</td>
        <td>
          <button class="acao editar" data-id="${p.id}">Editar</button>
          <button class="acao excluir" data-id="${p.id}">Excluir</button>
        </td>
      `;
      lista.appendChild(linha);
    });
  } catch (erro) {
    mostrarMensagem('Erro ao conectar a API.', 'erro');
  }
}

// CRIAR ou ATUALIZAR: depende de haver um id no campo escondido.
form.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const id = document.getElementById('produto-id').value;
  const corpo = JSON.stringify({
    nome: document.getElementById('nome').value,
    categoria: document.getElementById('categoria').value,
    preco: parseFloat(document.getElementById('preco').value),
    descricao: document.getElementById('descricao').value,
  });

  // Com id -> PUT (atualizar). Sem id -> POST (criar).
  const url = id ? `${API_URL}/produtos/${id}` : `${API_URL}/produtos`;
  const metodo = id ? 'PUT' : 'POST';

  try {
    const resposta = await fetch(url, { method: metodo, headers: cabecalhoAuth, body: corpo });
    if (tratarNaoAutorizado(resposta)) return;

    if (!resposta.ok) {
      const dados = await resposta.json();
      mostrarMensagem(dados.erro || 'Erro ao salvar.', 'erro');
      return;
    }

    mostrarMensagem(id ? 'Produto atualizado!' : 'Produto cadastrado!', 'sucesso');
    sairDoModoEdicao();
    carregarProdutos();
  } catch (erro) {
    mostrarMensagem('Erro ao conectar a API.', 'erro');
  }
});

// Clique nos botoes Editar / Excluir da tabela.
lista.addEventListener('click', async (evento) => {
  const id = evento.target.dataset.id;
  if (!id) return;

  // EDITAR: busca o produto e preenche o formulario.
  if (evento.target.classList.contains('editar')) {
    const resposta = await fetch(`${API_URL}/produtos/${id}`, { headers: cabecalhoAuth });
    if (tratarNaoAutorizado(resposta)) return;
    const p = await resposta.json();

    document.getElementById('produto-id').value = p.id;
    document.getElementById('nome').value = p.nome;
    document.getElementById('categoria').value = p.categoria;
    document.getElementById('preco').value = p.preco;
    document.getElementById('descricao').value = p.descricao || '';

    tituloForm.textContent = 'Editar produto';
    botaoCancelar.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // EXCLUIR (delete): pede confirmacao e remove.
  if (evento.target.classList.contains('excluir')) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    const resposta = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'DELETE',
      headers: cabecalhoAuth,
    });
    if (tratarNaoAutorizado(resposta)) return;

    mostrarMensagem('Produto excluído.', 'sucesso');
    carregarProdutos();
  }
});

// Cancelar edicao: limpa o formulario e volta ao modo "cadastrar".
function sairDoModoEdicao() {
  form.reset();
  document.getElementById('produto-id').value = '';
  tituloForm.textContent = 'Cadastrar produto';
  botaoCancelar.style.display = 'none';
}
botaoCancelar.addEventListener('click', sairDoModoEdicao);

// Botao de sair (logout)
document.getElementById('botao-sair').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'index.html';
});

// Carrega a lista assim que a pagina abre.
carregarProdutos();
