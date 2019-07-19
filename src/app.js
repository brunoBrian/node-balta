const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://brunobsousa:cabelera123@ds062438.mlab.com:62438/petita_petshop', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

// Carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Carregar rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('../src/routes/product-route');
const customerRoute = require('../src/routes/customer-route');
const orderRoute = require('../src/routes/order-route');

// Converte o conteudo para json 
app.use(bodyParser.json());
// Codifica as urls
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customer', customerRoute);
app.use('/order', orderRoute);

module.exports = app;