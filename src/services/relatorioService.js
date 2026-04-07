const connection = require('../database/db')

// Total
exports.totalAtendimentos = async () => {
  const [rows] = await connection.query(
    'SELECT COUNT(*) AS total FROM prontuarios'
  );
  return rows[0];
};

// Média diária
exports.mediaDiaria = async () => {
  const [rows] = await connection.query(`
    SELECT 
      COUNT(*) / COUNT(DISTINCT DATE(data_atendimento)) AS media 
    FROM prontuarios
  `);
  return rows[0];
};

// Top médicos
exports.topMedicos = async () => {
  const [rows] = await connection.query(`
    SELECT medico_id, COUNT(*) as total 
    FROM prontuarios 
    GROUP BY medico_id 
    ORDER BY total DESC
  `);
  return rows;
};