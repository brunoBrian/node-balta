const express = require('express');

const app = express();
// Arquivo de rota
const router = express.Router();

// Criando uma rota
const route = router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'Node API',
    version: '0.0.1'
  });
});

app.use('/', route);

module.exports = app;