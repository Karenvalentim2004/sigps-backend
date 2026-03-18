const authService = require('../services/authService')

exports.login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email e senha são obrigatórios'
        })
    }

    try {
        const result = await authService.login(email, password)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json({
            error: error.message
        })
    }
}