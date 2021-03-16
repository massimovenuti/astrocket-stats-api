const express = require('express');
const bodyParser = require('body-parser');
const statsRoutes = require('./routes/stats');
const rankingRoutes = require('./routes/ranking');


const app = express();

app.use(bodyParser.json());
app.use('/stats', statsRoutes);
app.use('/ranking', rankingRoutes);

module.exports = app;
