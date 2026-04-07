const connection = require('../database/db');

// TOTAL
exports.getDashboardTotals = async () => {
  const [rows] = await connection.promise().query(
    "SELECT COUNT(*) as total FROM agendamento"
  );
  return rows;
};

// POR STATUS
exports.getDashboardByStatus = async (status) => {
  const [rows] = await connection.promise().query(
    "SELECT COUNT(*) as total FROM agendamento WHERE status = ?",
    [status]
  );
  return rows;
};

// POR DIA
exports.getDashboardByDay = async () => {
  const [rows] = await connection.promise().query(`
    SELECT 
      DATE(data) as dia,
      COUNT(*) as total
    FROM agendamento
    GROUP BY DATE(data)
    ORDER BY dia ASC
  `);
  return rows;
};