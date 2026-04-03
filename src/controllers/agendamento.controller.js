const agendamentoService = require('../services/agendamentoService')

// Criar
exports.create = async (req, res) => {
    try {
        const agendamento = await agendamentoService.create(req.body)
        res.status(201).json(agendamento)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Listar
exports.getAll = async (req, res) => {
    try {
        const agendamentos = await agendamentoService.getAll();
        res.json(agendamentos); // ⚠️ sem objeto, retorna direto array
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};