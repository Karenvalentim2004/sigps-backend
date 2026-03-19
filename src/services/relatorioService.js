const connection = require('../database/db')

// Total de atendimentos
exports.totalAtendimentos = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT COUNT(*) AS total FROM prontuarios',
            (err, result) => {
                if (err) return reject(err)
                resolve(result[0])
            }
        )
    })
}

// Média por dia
exports.mediaDiaria = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT 
                COUNT(*) / COUNT(DISTINCT DATE(data_atendimento)) AS media 
             FROM prontuarios`,
            (err, result) => {
                if (err) return reject(err)
                resolve(result[0])
            }
        )
    })
}

// Profissionais com mais atendimentos
exports.topMedicos = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT medico_id, COUNT(*) as total 
             FROM prontuarios 
             GROUP BY medico_id 
             ORDER BY total DESC`,
            (err, result) => {
                if (err) return reject(err)
                resolve(result)
            }
        )
    })
}