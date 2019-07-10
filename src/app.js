const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Arquivo de rota
const router = express.Router();

// Converte o conteudo para json 
app.use(bodyParser.json());
// Codifica as urls
app.use(bodyParser.urlencoded({ extended: false }));

// Criando uma rota
const route = router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'Node API',
    version: '0.0.1'
  });
});

// Criando um registro na api
const create = router.post('/', (req, res, next) => {
  res.status(201).send(req.body);
});

// Atualizando um registro na api
const put = router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  res.status(200).send({ 
    id: id,
    item: req.body
  });
});

// Deletando um registro na api
const del = router.delete('/:id', (req, res, next) => {
  res.status(200).send(req.body);
});

app.use('/', route);
app.use('/products', create);
app.use('/products', put);
app.use('/products', del);

module.exports = app;