const connection = require('../database/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = (email, password) => {
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

                const validPassword = await bcrypt.compare(password, user.password)

                if (!validPassword) {
                    return reject(new Error('Senha inválida'))
                }

                const token = jwt.sign(
                    { id: user.id, role: user.role },
                    'segredo',
                    { expiresIn: '1d' }
                )

                resolve({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                })
            }
        )
    })
}