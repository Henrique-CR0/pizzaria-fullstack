// Middleware de autenticacao.
// Um "middleware" e uma funcao que roda ANTES da rota.
// Aqui ele verifica se a requisicao trouxe um token JWT valido.
// Se nao trouxer, bloqueia o acesso (rota protegida).
// - [Equipe Pizzaria]

const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  // O token chega no cabecalho assim: "Authorization: Bearer <token>"
  const cabecalho = req.headers.authorization;

  if (!cabecalho) {
    return res.status(401).json({ erro: 'Token nao enviado. Faca login.' });
  }

  // Separa a palavra "Bearer" do token de fato.
  const partes = cabecalho.split(' ');
  const token = partes.length === 2 ? partes[1] : partes[0];

  try {
    // Verifica se o token e valido usando a mesma chave secreta da criacao.
    const dados = jwt.verify(token, process.env.JWT_SECRET);

    // Guarda os dados do usuario na requisicao para as proximas funcoes usarem.
    req.usuario = dados;

    next(); // tudo certo: segue para a rota
  } catch (erro) {
    return res.status(401).json({ erro: 'Token invalido ou expirado.' });
  }
}

module.exports = autenticar;
