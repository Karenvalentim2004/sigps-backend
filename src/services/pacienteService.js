const connection = require('../database/db')

// Criar paciente
exports.create = (paciente) => {
    return new Promise((resolve, reject) => {
        const { nome, cpf, data_nascimento, telefone, endereco } = paciente

        connection.query(
            'INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, endereco) VALUES (?, ?, ?, ?, ?)',
            [nome, cpf, data_nascimento, telefone, endereco],
            (err, result) => {
                if (err) return reject(err)

                resolve({ id: result.insertId, ...paciente })
            }
        )
    })
}

// Listar pacientes
exports.findAll = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM pacientes WHERE ativo = TRUE',
            (err, results) => {
                if (err) return reject(err)
                resolve(results)
            }
        )
    })
}

// Buscar por ID
exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM pacientes WHERE id = ? AND ativo = TRUE',
            [id],
            (err, results) => {
                if (err) return reject(err)
                resolve(results[0])
            }
        )
    })
}

// Atualizar
exports.update = (id, paciente) => {
    return new Promise((resolve, reject) => {
        const { nome, telefone, endereco } = paciente

        connection.query(
            'UPDATE pacientes SET nome = ?, telefone = ?, endereco = ? WHERE id = ?',
            [nome, telefone, endereco, id],
            (err) => {
                if (err) return reject(err)
                resolve({ id, ...paciente })
            }
        )
    })
}

//delete
exports.remove = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE pacientes SET ativo = FALSE WHERE id = ?',
            [id],
            (err) => {
                if (err) return reject(err)
                resolve({ message: 'Paciente desativado' })
            }
        )
    })
}