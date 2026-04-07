const agendamentoService = require("../services/dashboardService");

exports.getDashboard = async (req, res) => {
  try {
    const total = await agendamentoService.getDashboardTotals();

    const agendados = await agendamentoService.getDashboardByStatus("agendado");
    const cancelados = await agendamentoService.getDashboardByStatus("cancelado");
    const concluidos = await agendamentoService.getDashboardByStatus("concluido");

    const porDia = await agendamentoService.getDashboardByDay();

    res.json({
      total: total[0].total,
      agendados: agendados[0].total,
      cancelados: cancelados[0].total,
      concluidos: concluidos[0].total,
      porDia
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};