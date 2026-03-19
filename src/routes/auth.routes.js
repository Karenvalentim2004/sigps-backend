const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/perfil', authMiddleware, (req, res) => {
    return res.json({
        message: 'Acesso permitido 🔓',
        user: req.user
    })
})

// POST /api/login
router.post('/login', authController.login);
router.post('/register', authController.register)

module.exports = router;