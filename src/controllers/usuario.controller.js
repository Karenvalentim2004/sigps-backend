const usuarioService = require("../services/usuarioService");

exports.getUsuarios = async (req, res) => {
  try {
    const { tipo } = req.query;

    let usuarios;

    if (tipo) {
      usuarios = await usuarioService.getUsuariosByTipo(tipo);
    } else {
      usuarios = await usuarioService.getUsuarios();
    }

    res.json(usuarios);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
};