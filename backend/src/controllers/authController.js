// Controller de autenticacao.
// O controller guarda a LOGICA de cada acao (o que acontece quando
// alguem chama uma rota). As rotas so apontam para essas funcoes.
// - [Equipe Pizzaria]

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/User');

// Funcao auxiliar que gera um token JWT para um usuario.
function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, nome: usuario.nome, email: usuario.email }, // dados dentro do token
    process.env.JWT_SECRET, // chave secreta
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } // validade
  );
}

// CADASTRO de um novo usuario.
async function registrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Envie nome, email e senha.' });
    }

    // Verifica se ja existe alguem com esse email.
    const jaExiste = await Usuario.findOne({ where: { email } });
    if (jaExiste) {
      return res.status(400).json({ erro: 'Este email ja esta cadastrado.' });
    }

    // Criptografa a senha antes de salvar (nunca salvamos a senha pura).
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
    });

    // Ja devolve um token para o usuario entrar direto apos o cadastro.
    const token = gerarToken(usuario);

    return res.status(201).json({
      mensagem: 'Usuario criado com sucesso!',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao registrar usuario.', detalhe: erro.message });
  }
}

// LOGIN de um usuario existente.
async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Envie email e senha.' });
    }

    // Procura o usuario pelo email.
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha incorretos.' });
    }

    // Compara a senha digitada com a senha criptografada do banco.
    const senhaConfere = await bcrypt.compare(senha, usuario.senha);
    if (!senhaConfere) {
      return res.status(401).json({ erro: 'Email ou senha incorretos.' });
    }

    const token = gerarToken(usuario);

    return res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao fazer login.', detalhe: erro.message });
  }
}

// Retorna os dados do usuario logado (rota protegida).
// O req.usuario foi preenchido pelo middleware de autenticacao.
async function perfil(req, res) {
  return res.json({ usuario: req.usuario });
}

module.exports = { registrar, login, perfil };
