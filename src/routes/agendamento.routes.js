const express = require('express')
const router = express.Router()

const agendamentoController = require('../controllers/agendamento.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const identificarMiddleware = require('../middlewares/identificarMiddlewares')

// Só recepcionista agenda
router.post(
    '/',
    authMiddleware,
    identificarMiddleware(['recepcionista']),
    agendamentoController.create
)

module.exports = router