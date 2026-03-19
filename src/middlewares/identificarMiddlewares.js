function identificarMiddleware(identificarPermitidos) {
    return (req, res, next) => {

        const userIdentificar = req.user.identificar

        if (!identificarPermitidos.includes(userIdentificar)) {
            return res.status(403).json({
                error: 'Acesso negado'
            })
        }

        next()
    }
}

module.exports = identificarMiddleware