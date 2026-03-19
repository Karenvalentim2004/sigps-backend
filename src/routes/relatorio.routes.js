const express = require('express')
const router = express.Router()

const relatorioController = require('../controllers/relatorio.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const identificarMiddleware = require('../middlewares/identificarMiddlewares')

// só profissionais (não paciente)
router.get(
    '/',
    authMiddleware,
    identificarMiddleware(['medico', 'enfermeiro', 'recepcionista']),
    relatorioController.getRelatorio
)

module.exports = router