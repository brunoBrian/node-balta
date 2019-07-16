'use strict';
const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const ValidationsContract = require('../validators/validations');
const repository = require('../repositories/product-repositories');

// Listando produtos
exports.get = (req, res, next) => {
  repository.get()
  .then( data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send(error);
  });
}

// Pegando produto pelo slug
exports.getBySlug = (req, res, next) => {
  repository.getBySlug(req.params.slug)
  .then( data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send(error);
  });
}

// Pegando produto pelo id
exports.getById = (req, res, next) => {
  repository.getById(req.params.id)
  .then( data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send(error);
  });
}

// Pegando produto pela tag
exports.getByTag = (req, res, next) => {
  repository.getByTag(req.params.tag)
  .then( data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send(error);
  });
}
 
// Criando um registro na api
exports.post = (req, res, next) => {
  let contract = new ValidationsContract();

  contract.hasMinLen(req.body.name, 2, 'O nome deve ter pelo menos 2 caracteres');
  contract.hasMinLen(req.body.manufacturerName, 2, 'O nome do fabricante deve ter pelo menos 2 caracteres');
  contract.isRequired(req.body.name, 'O nome deve ter pelo menos 2 caracteres');

  if(!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  repository.create(req.body)
  .then( response => {
    res.status(201).send({message: 'Produto cadastrado com sucesso!'});
  }).catch(error => {
    res.status(400).send({message: 'Falha ao cadastrar produto', data: error});
  });
};

// Atualizando um registro na api
exports.put = (req, res, next) => {
  repository.update(req.params.id, req.body)
  .then( response => {
    res.status(200).send({message: 'Produto atualizado com sucesso!'});
  }).catch(error => {
    res.status(400).send({message: 'Falha ao atualizar produto', data: error});
  });
};

// Deletando um registro na api
exports.delete = (req, res, next) => {
  repository.remove(req.body.id)
  .then( data => {
    res.status(200).send({message: 'Produto removido com sucesso!'});
  }).catch(error => {
    res.status(400).send({message: 'Falha ao remover produto', data: error});
  });
};