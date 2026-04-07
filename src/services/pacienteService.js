const connection = require('../database/db')

// Criar
exports.create = async (paciente) => {
  const { nome, email, cpf, data_nascimento, telefone, endereco } = paciente;

  const [result] = await connection.query(
    `INSERT INTO pacientes 
     (nome, email, cpf, data_nascimento, telefone, endereco) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, email, cpf, data_nascimento, telefone, endereco]
  );

  return { id: result.insertId, ...paciente };
};

// Listar
exports.findAll = async () => {
  const [rows] = await connection.query(
    'SELECT * FROM pacientes WHERE ativo = TRUE'
  );
  return rows;
};

// Buscar por ID
exports.findById = async (id) => {
  const [rows] = await connection.query(
    'SELECT * FROM pacientes WHERE id = ? AND ativo = TRUE',
    [id]
  );
  return rows[0];
};

// Atualizar
exports.update = async (id, paciente) => {
  const { nome, email, telefone, endereco } = paciente;

  await connection.query(
    `UPDATE pacientes 
     SET nome=?, email=?, telefone=?, endereco=? 
     WHERE id=?`,
    [nome, email, telefone, endereco, id]
  );

  return { id, ...paciente };
};

// Deletar (soft delete)
exports.remove = async (id) => {
  await connection.query(
    'UPDATE pacientes SET ativo = FALSE WHERE id = ?',
    [id]
  );

  return { message: 'Paciente desativado' };
};