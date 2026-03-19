const authService = require('../services/authService')

async function register(req, res) {
    const { nome, email, senha, identificar } = req.body

    if (!nome || !email || !senha || !identificar) {
        return res.status(400).json({
            error: 'Todos os campos são obrigatórios'
        })
    }

    try {
        const user = await authService.register(nome, email, senha, identificar)
        return res.status(201).json(user)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

async function login(req, res) {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({
            error: 'Email e senha são obrigatórios'
        })
    }

     try {
        const result = await authService.login(email, senha)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json({
            error: error.message
        })
    }
}

module.exports = {
    register,
    login
}

