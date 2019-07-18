'use strict';
const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const ValidationsContract = require('../validators/validations');
const repository = require('../repositories/product-repositories');

// Listando produtos
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

// Pegando produto pelo slug
exports.getBySlug = async (req, res, next) => {
  try {
    const data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch(error) {
    res.status(500).send({
      message: 'Falha ao listar produtos'
    });
  }
}

// Pegando produto pelo id
exports.getById = async (req, res, next) => {
  try {
    const data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch(error) {
    res.status(500).send({
      message: 'Falha ao processar requisição'
    });
  }
}

// Pegando produto pela tag
exports.getByTag = async (req, res, next) => {
  try {
    const data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  }catch(error) {
    res.status(500).send({ 
      message: 'Erro ao processar requisição'
    });
  };
}
 
// Criando um registro na api
exports.post = async (req, res, next) => {
  let contract = new ValidationsContract();

  contract.hasMinLen(req.body.name, 2, 'O nome deve ter pelo menos 2 caracteres');
  contract.hasMinLen(req.body.manufacturerName, 2, 'O nome do fabricante deve ter pelo menos 2 caracteres');
  contract.isRequired(req.body.name, 'O nome deve ter pelo menos 2 caracteres');

  if(!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create(req.body);
    res.status(201).send({
      message: 'Produto cadastrado com sucesso!'
    });
  } catch(error) {
    res.status(500).send({
      message: 'Falha ao cadastrar produto'
    });
  }
};

// Atualizando um registro na api
exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: 'Produto atualizado com sucesso!'
    });
  } catch(error) {
    res.status(400).send({
      message: 'Falha ao atualizar produto'
    });
  }
};

// Deletando um registro na api
exports.delete = async (req, res, next) => {
  try {
    await repository.remove(req.body.id);
    res.status(200).send({
      message: 'Produto removido com sucesso!'
    });
  } catch(error) {
    res.status(400).send({
      message: 'Falha ao remover produto'
    });
  };
};