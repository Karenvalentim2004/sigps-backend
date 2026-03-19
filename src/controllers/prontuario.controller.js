const prontuarioService = require('../services/prontuarioService')

exports.create = async (req, res) => {
    try {
        const prontuario = await prontuarioService.create(req.body)
        res.status(201).json(prontuario)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}