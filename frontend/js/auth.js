// Logica da tela de login e cadastro. Conversa com a API usando Fetch.
// - [Equipe Pizzaria]

// >>> ENDERECO DA API <<<
// Descobre sozinho onde a API esta:
// - Local: http://localhost:3000
// - GitHub Codespaces: troca a porta do frontend pela 3000 do backend.
//   Ex.: nome-5500.app.github.dev  ->  nome-3000.app.github.dev
// Assim ninguem precisa editar este arquivo. - [Equipe Pizzaria]
function descobrirApiUrl() {
  const host = window.location.hostname;
  if (host.endsWith('.app.github.dev')) {
    return 'https://' + host.replace(/-\d+\.app\.github\.dev$/, '-3000.app.github.dev');
  }
  return 'http://localhost:3000';
}
const API_URL = descobrirApiUrl();

// --- Troca de abas (Entrar / Cadastrar) ---
const abaLogin = document.getElementById('aba-login');
const abaCadastro = document.getElementById('aba-cadastro');
const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');

abaLogin.addEventListener('click', () => {
  abaLogin.classList.add('ativa');
  abaCadastro.classList.remove('ativa');
  formLogin.classList.add('ativo');
  formCadastro.classList.remove('ativo');
});

abaCadastro.addEventListener('click', () => {
  abaCadastro.classList.add('ativa');
  abaLogin.classList.remove('ativa');
  formCadastro.classList.add('ativo');
  formLogin.classList.remove('ativo');
});

// Mostra uma mensagem (erro ou sucesso) na tela.
function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = 'mensagem ' + tipo; // tipo = "erro" ou "sucesso"
}

// --- LOGIN ---
formLogin.addEventListener('submit', async (evento) => {
  evento.preventDefault(); // impede o recarregamento padrao do formulario

  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;
  const msg = document.getElementById('msg-login');

  try {
    const resposta = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mostrarMensagem(msg, dados.erro || 'Erro ao entrar.', 'erro');
      return;
    }

    // Guarda o token no navegador para usar nas rotas protegidas.
    localStorage.setItem('token', dados.token);
    localStorage.setItem('usuario', JSON.stringify(dados.usuario));

    // Vai para a pagina protegida.
    window.location.href = 'dashboard.html';
  } catch (erro) {
    mostrarMensagem(msg, 'Nao foi possivel conectar a API.', 'erro');
  }
});

// --- CADASTRO ---
formCadastro.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const nome = document.getElementById('cad-nome').value;
  const email = document.getElementById('cad-email').value;
  const senha = document.getElementById('cad-senha').value;
  const msg = document.getElementById('msg-cadastro');

  try {
    const resposta = await fetch(`${API_URL}/auth/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      mostrarMensagem(msg, dados.erro || 'Erro ao cadastrar.', 'erro');
      return;
    }

    // O cadastro ja devolve token: entra direto.
    localStorage.setItem('token', dados.token);
    localStorage.setItem('usuario', JSON.stringify(dados.usuario));

    mostrarMensagem(msg, 'Conta criada! Entrando...', 'sucesso');
    setTimeout(() => (window.location.href = 'dashboard.html'), 800);
  } catch (erro) {
    mostrarMensagem(msg, 'Nao foi possivel conectar a API.', 'erro');
  }
});
