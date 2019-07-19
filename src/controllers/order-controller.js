'use strict';

const ValidationsContract = require('../validators/validations');
const repository = require('../repositories/order-repositories');
const guid = require('guid');

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
  let data = {
    customer: req.body.customer,
    number: guid.raw(),
    items: req.body.items
  };

  try {
    await repository.create(data);
    res.status(201).send({
      message: 'Pedido criado com sucesso!'
    });
  } catch(error) {console.log(error)
    res.status(500).send({
      message: 'Falha ao criar pedido'
    });
  }
};