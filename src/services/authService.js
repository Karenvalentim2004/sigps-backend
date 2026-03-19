const connection = require('../database/db')
const bcrypt = require('bcrypt')

exports.register = (nome, email, senha, identificar) => {
    return new Promise(async (resolve, reject) => {

        const hashedsenha = await bcrypt.hash(senha, 10)

        connection.query(
            'INSERT INTO users (nome, email, senha, identificar) VALUES (?, ?, ?, ?)',
            [nome, email, hashedsenha, identificar],
            (err, result) => {
                if (err) return reject(err)

                resolve({
                    id: result.insertId,
                    nome,
                    email,
                    identificar
                })
            }
        )
    })
}


const jwt = require('jsonwebtoken')

exports.login = (email, senha) => {
    return new Promise((resolve, reject) => {

        connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (err, results) => {
                if (err) return reject(err)

                if (results.length === 0) {
                    return reject(new Error('Usuário não encontrado'))
                }

                const user = results[0]

                const senhaValida = await bcrypt.compare(senha, user.senha)

                if (!senhaValida) {
                    return reject(new Error('Senha inválida'))
                }

                const token = jwt.sign(
                    { id: user.id, identificar: user.identificar },
                    'segredo', // depois vamos melhorar isso
                    { expiresIn: '1d' }
                )

                resolve({
                    token,
                    user: {
                        id: user.id,
                        nome: user.nome,
                        email: user.email,
                        identificar: user.identificar
                    }
                })
            }
        )
    })
}