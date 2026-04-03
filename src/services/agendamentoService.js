const connection = require('../database/db')

// Cria agendamento
exports.create = (agendamento) => {
  return new Promise((resolve, reject) => {

    const { paciente_id, profissional_id, data, hora, status } = agendamento

    // Bloqueia horario já ocupado
    connection.query(
      `SELECT * FROM agendamentos 
       WHERE profissional_id = ? 
       AND data = ? 
       AND hora = ? 
       AND status = "agendado"`,
      [profissional_id, data, hora],
      (err, results) => {
        if (err) return reject(err)

        if (results.length > 0) {
          return reject(new Error('Horário já ocupado'))
        }

        // Insert
        connection.query(
          `INSERT INTO agendamentos 
           (paciente_id, profissional_id, data, hora, status) 
           VALUES (?, ?, ?, ?, ?)`,
          [paciente_id, profissional_id, data, hora, status || "agendado"],
          (err, result) => {
            if (err) return reject(err)

            resolve({
              id: result.insertId,
              ...agendamento
            })
          }
        )
      }
    )
  })
}

// Lista com Join
exports.getAll = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT 
        a.*,
        p.nome AS paciente_nome,
        u.nome AS profissional_nome
      FROM agendamentos a
      JOIN pacientes p ON p.id = a.paciente_id
      JOIN usuarios u ON u.id = a.profissional_id`,
      (err, results) => {
        if (err) return reject(err)
        resolve(results)
      }
    )
  })
}

// Atualizar
exports.update = (id, agendamento) => {
  return new Promise((resolve, reject) => {

    const { paciente_id, profissional_id, data, hora, status } = agendamento

    connection.query(
      `UPDATE agendamentos 
       SET paciente_id=?, profissional_id=?, data=?, hora=?, status=? 
       WHERE id=?`,
      [paciente_id, profissional_id, data, hora, status, id],
      (err) => {
        if (err) return reject(err)

        resolve({ message: "Atualizado com sucesso" })
      }
    )
  })
}

// Deletar
exports.delete = (id) => {
  return new Promise((resolve, reject) => {

    connection.query(
      `DELETE FROM agendamentos WHERE id=?`,
      [id],
      (err) => {
        if (err) return reject(err)

        resolve({ message: "Excluído com sucesso" })
      }
    )
  })
}