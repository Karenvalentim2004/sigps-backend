const connection = require('../database/db')

exports.create = (dados) => {
    return new Promise((resolve, reject) => {

        const { paciente_id, medico_id, sintomas, diagnostico, prescricao } = dados

        connection.query(
            'INSERT INTO prontuarios (paciente_id, medico_id, sintomas, diagnostico, prescricao) VALUES (?, ?, ?, ?, ?)',
            [paciente_id, medico_id, sintomas, diagnostico, prescricao],
            (err, result) => {
                if (err) return reject(err)

                resolve({
                    id: result.insertId,
                    ...dados
                })
            }
        )
    })
}