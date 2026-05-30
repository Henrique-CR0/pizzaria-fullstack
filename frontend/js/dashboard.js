// Logica da pagina protegida.
// Ela busca os dados do usuario na rota /auth/perfil enviando o token.
// Se nao houver token valido, manda de volta para o login.
// - [Equipe Pizzaria]

// Descobre a URL da API (local ou Codespaces). - [Equipe Pizzaria]
function descobrirApiUrl() {
  const host = window.location.hostname;
  if (host.endsWith('.app.github.dev')) {
    return 'https://' + host.replace(/-\d+\.app\.github\.dev$/, '-3000.app.github.dev');
  }
  return 'http://localhost:3000';
}
const API_URL = descobrirApiUrl();

const token = localStorage.getItem('token');

// Se nem token existe, nem tenta: volta para o login.
if (!token) {
  window.location.href = 'index.html';
}

// Busca o perfil enviando o token no cabecalho Authorization.
async function carregarPerfil() {
  try {
    const resposta = await fetch(`${API_URL}/auth/perfil`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Token invalido/expirado -> volta para o login.
    if (!resposta.ok) {
      localStorage.clear();
      window.location.href = 'index.html';
      return;
    }

    const dados = await resposta.json();
    const usuario = dados.usuario;

    document.getElementById('saudacao').textContent = `Olá, ${usuario.nome}!`;
    document.getElementById('dados-usuario').innerHTML = `
      <p><strong>ID:</strong> ${usuario.id}</p>
      <p><strong>Nome:</strong> ${usuario.nome}</p>
      <p><strong>E-mail:</strong> ${usuario.email}</p>
    `;
  } catch (erro) {
    document.getElementById('saudacao').textContent = 'Erro ao conectar a API.';
  }
}

// Botao de sair: apaga o token e volta ao login.
document.getElementById('botao-sair').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'index.html';
});

carregarPerfil();
