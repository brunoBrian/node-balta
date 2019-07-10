const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Carregar rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('../src/routes/product-route');

// Converte o conteudo para json 
app.use(bodyParser.json());
// Codifica as urls
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;