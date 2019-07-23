'use strict';

const ValidationsContract = require('../validators/validations');
const repository = require('../repositories/order-repositories');
const guid = require('guid');
const authService = require('../services/auth-service');

// Listando pedidos
exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch(error) {
    res.status(400).send({
      message: 'Falha ao listar produtos'
    });
  }
}

// Criando um registro na api do customer
exports.post = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    await repository.create({
      customer: data.id,
      number: guid.raw(),
      items: req.body.items
    });
    res.status(201).send({
      message: 'Pedido criado com sucesso!'
    });
  } catch(error) {console.log(error)
    res.status(500).send({
      message: 'Falha ao criar pedido'
    });
  }
};