const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');
const app = express();

mongoose.connect(config.connectionString, {
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
app.use(bodyParser.json({
  limit: '20mb'
}));

// Codifica as urls
app.use(bodyParser.urlencoded({
  limit: '20mb', extended: false
}));

// Habilitando CORS
app.use(() => (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customer', customerRoute);
app.use('/order', orderRoute);

module.exports = app;