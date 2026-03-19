const express = require('express')
const router = express.Router()

const prontuarioController = require('../controllers/prontuario.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const identificarMiddleware = require('../middlewares/identificarMiddlewares')

router.post(
    '/',
    authMiddleware,
    identificarMiddleware(['medico']),
    prontuarioController.create
)

module.exports = router