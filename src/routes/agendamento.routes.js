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

//Listar
router.get(
    '/',
    authMiddleware,
    identificarMiddleware(['recepcionista']),
    agendamentoController.getAll
)

module.exports = router