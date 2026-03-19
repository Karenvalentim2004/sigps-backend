const express = require('express')
const router = express.Router()

const pacienteController = require('../controllers/paciente.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const identificarMiddleware = require('../middlewares/identificarMiddlewares')

// criar
router.post(
    '/',
    authMiddleware,
    identificarMiddleware(['recepcionista']),
    pacienteController.create
)

// listar
router.get(
    '/',
    authMiddleware,
    identificarMiddleware(['recepcionista', 'enfermeiro', 'medico']),
    pacienteController.findAll
)

// id
router.get(
    '/:id',
    authMiddleware,
    identificarMiddleware(['recepcionista', 'enfermeiro', 'medico']),
    pacienteController.findById
)

// atualizar
router.put(
    '/:id',
    authMiddleware,
    identificarMiddleware(['recepcionista']),
    pacienteController.update
)

// deletar
router.delete(
    '/:id',
    authMiddleware,
    identificarMiddleware(['recepcionista']),
    pacienteController.remove
)

module.exports = router