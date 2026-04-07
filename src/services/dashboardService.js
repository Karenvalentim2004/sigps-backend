const connection = require('../database/db');

// TOTAL
exports.getDashboardTotals = async () => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) as total FROM agendamentos"
  );
  return rows;
};

// POR STATUS
exports.getDashboardByStatus = async (status) => {
  const [rows] = await connection.query(
    "SELECT COUNT(*) as total FROM agendamentos WHERE status = ?",
    [status]
  );
  return rows;
};

// POR DIA
exports.getDashboardByDay = async () => {
  const [rows] = await connection.query(`
    SELECT 
      DATE(data) as dia,
      COUNT(*) as total
    FROM agendamentos
    GROUP BY DATE(data)
    ORDER BY dia ASC
  `);
  return rows;
};