const agendamentoService = require('../services/agendamentoService')

exports.create = async (req, res) => {
    try {
        const agendamento = await agendamentoService.create(req.body)
        res.status(201).json(agendamento)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}