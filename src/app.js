const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API SIGPS rodando 🚀");
});

// Importando rotas
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const pacienteRoutes = require('./routes/paciente.routes')
const agendamentoRoutes = require('./routes/agendamento.routes')
const prontuarioRoutes = require('./routes/prontuario.routes')
const relatorioRoutes = require('./routes/relatorio.routes')
const usuarioRoutes = require("./routes/usuario.routes");


app.use('/api', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/pacientes', pacienteRoutes)
app.use('/api/agendamentos', agendamentoRoutes)
app.use('/api/prontuarios', prontuarioRoutes)
app.use('/api/relatorios', relatorioRoutes)
// app.use("/api/usuarios", usuarioRoutes);
app.use("/api", usuarioRoutes);

module.exports = app  
 