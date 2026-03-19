const relatorioService = require('../services/relatorioService')

exports.getRelatorio = async (req, res) => {
    try {
        const total = await relatorioService.totalAtendimentos()
        const media = await relatorioService.mediaDiaria()
        const top = await relatorioService.topMedicos()

        res.json({
            totalAtendimentos: total.total,
            mediaDiaria: media.media,
            topMedicos: top
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}