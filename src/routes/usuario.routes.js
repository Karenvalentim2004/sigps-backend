const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuario.controller");

// GET /api/usuarios
router.get("/usuarios", usuarioController.getUsuarios);

module.exports = router;