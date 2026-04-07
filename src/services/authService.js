const connection = require('../database/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (nome, email, senha, identificar) => {
  const hashed = await bcrypt.hash(senha, 10);

  const [result] = await connection.query(
    'INSERT INTO users (nome, email, senha, identificar) VALUES (?, ?, ?, ?)',
    [nome, email, hashed, identificar]
  );

  return { id: result.insertId, nome, email, identificar };
};

exports.login = async (email, senha) => {
  const [users] = await connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (users.length === 0) {
    throw new Error('Usuário não encontrado');
  }

  const user = users[0];

  const senhaValida = await bcrypt.compare(senha, user.senha);

  if (!senhaValida) {
    throw new Error('Senha inválida');
  }

  const token = jwt.sign(
    { id: user.id, identificar: user.identificar },
    'segredo',
    { expiresIn: '1d' }
  );

  return {
    token,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      identificar: user.identificar
    }
  };
};