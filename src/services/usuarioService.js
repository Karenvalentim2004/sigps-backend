const connection = require('../database/db')

// Todos
const getUsuarios = async () => {
  const [rows] = await connection.query("SELECT * FROM users");
  return rows;
};

// Por tipo
const getUsuariosByTipo = async (tipo) => {
  const [rows] = await connection.query(
    "SELECT * FROM users WHERE identificar = ?",
    [tipo]
  );
  return rows;
};

module.exports = {
  getUsuarios,
  getUsuariosByTipo
};