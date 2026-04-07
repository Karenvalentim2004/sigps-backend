const connection = require('../database/db')

exports.create = async (dados) => {
  const { paciente_id, medico_id, sintomas, diagnostico, prescricao } = dados;

  const [result] = await connection.query(
    `INSERT INTO prontuarios 
     (paciente_id, medico_id, sintomas, diagnostico, prescricao) 
     VALUES (?, ?, ?, ?, ?)`,
    [paciente_id, medico_id, sintomas, diagnostico, prescricao]
  );

  return { id: result.insertId, ...dados };
};