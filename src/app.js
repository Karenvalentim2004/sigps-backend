const express = require('express');
const app = express();

app.use(express.json());

// Importando rotas
const authRoutes = require('./routes/auth.routes');

app.use('/api', authRoutes);

module.exports = app
