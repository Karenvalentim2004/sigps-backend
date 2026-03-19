const connection = require('../database/db')

// Criar agendamento 
exports.create = (dados) => {
    return new Promise((resolve, reject) => {

        const { paciente_id, profissional_id, data, hora } = dados

        // conflito de horário
        connection.query(
            'SELECT * FROM agendamentos WHERE profissional_id = ? AND data = ? AND hora = ? AND status = "agendado"',
            [profissional_id, data, hora],
            (err, results) => {
                if (err) return reject(err)

                if (results.length > 0) {
                    return reject(new Error('Horário já ocupado'))
                }

                // Se livre - agenda
                connection.query(
                    'INSERT INTO agendamentos (paciente_id, profissional_id, data, hora) VALUES (?, ?, ?, ?)',
                    [paciente_id, profissional_id, data, hora],
                    (err, result) => {
                        if (err) return reject(err)

                        resolve({
                            id: result.insertId,
                            ...dados
                        })
                    }
                )
            }
        )
    })
}