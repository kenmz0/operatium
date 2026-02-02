const express = require('express');
const healthRoutes = require('./routes/health.routes');

const app = express();

//middleware
app.use(express.json());
//rutas
app.use('/health', healthRoutes);

module.exports = app;
