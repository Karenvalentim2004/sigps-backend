const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Importando rotas
const authRoutes = require('./routes/auth.routes');
const pacienteRoutes = require('./routes/paciente.routes')
const agendamentoRoutes = require('./routes/agendamento.routes')
const prontuarioRoutes = require('./routes/prontuario.routes')
const relatorioRoutes = require('./routes/relatorio.routes')


app.use('/api', authRoutes)
app.use('/api/pacientes', pacienteRoutes)
app.use('/api/agendamentos', agendamentoRoutes)
app.use('/api/prontuarios', prontuarioRoutes)
app.use('/api/relatorios', relatorioRoutes)

module.exports = app  
 