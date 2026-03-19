const pacienteService = require('../services/pacienteService')

// Criar
exports.create = async (req, res) => {
    try {
        const paciente = await pacienteService.create(req.body)
        res.status(201).json(paciente)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Listar
exports.findAll = async (req, res) => {
    try {
        const pacientes = await pacienteService.findAll()
        res.json(pacientes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Buscar por ID
exports.findById = async (req, res) => {
    try {
        const paciente = await pacienteService.findById(req.params.id)
        res.json(paciente)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Atualizar
exports.update = async (req, res) => {
    try {
        const paciente = await pacienteService.update(req.params.id, req.body)
        res.json(paciente)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Deletar
exports.remove = async (req, res) => {
    try {
        const result = await pacienteService.remove(req.params.id)
        res.json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}