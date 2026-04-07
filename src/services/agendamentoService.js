const connection = require('../database/db')

// 🔹 CRIAR AGENDAMENTO
exports.create = async (agendamento) => {
  const { paciente_id, profissional_id, data, hora, status } = agendamento;

  // Verifica se já existe no mesmo horário
  const [existente] = await connection.query(
    `SELECT * FROM agendamentos 
     WHERE profissional_id = ? 
     AND data = ? 
     AND hora = ? 
     AND status = "agendado"`,
    [profissional_id, data, hora]
  );

  if (existente.length > 0) {
    throw new Error("Horário já ocupado");
  }

  const [result] = await connection.query(
    `INSERT INTO agendamentos 
     (paciente_id, profissional_id, data, hora, status) 
     VALUES (?, ?, ?, ?, ?)`,
    [paciente_id, profissional_id, data, hora, status || "agendado"]
  );

  return {
    id: result.insertId,
    ...agendamento
  };
};



// 🔹 LISTAR AGENDAMENTOS (COM NOMES)
exports.getAll = async () => {
  const [rows] = await connection.query(`
    SELECT 
      a.id,
      a.data,
      a.hora,
      a.status,
      a.paciente_id,
      a.profissional_id,

      p.nome AS paciente_nome,
      u.nome AS profissional_nome

    FROM agendamentos a

    LEFT JOIN pacientes p 
      ON p.id = a.paciente_id

    LEFT JOIN users u 
      ON u.id = a.profissional_id

    ORDER BY a.data ASC, a.hora ASC
  `);

  return rows;
};



// 🔹 ATUALIZAR
exports.update = async (id, agendamento) => {
  const { paciente_id, profissional_id, data, hora, status } = agendamento;

  await connection.query(
    `UPDATE agendamentos 
     SET paciente_id=?, profissional_id=?, data=?, hora=?, status=? 
     WHERE id=?`,
    [paciente_id, profissional_id, data, hora, status, id]
  );

  return { message: "Atualizado com sucesso" };
};


// DELETAR
exports.delete = async (id) => {
  await connection.query(
    `DELETE FROM agendamentos WHERE id=?`,
    [id]
  );

  return { message: "Excluído com sucesso" };
};