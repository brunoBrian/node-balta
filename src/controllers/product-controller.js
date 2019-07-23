'use strict';

const azure = require('azure-storage');
const guid = require('guid');

const ValidationsContract = require('../validators/validations');
const repository = require('../repositories/product-repositories');
const config = require('../config');

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
  let data = req.body;
  let { imageURL } = data;

  contract.hasMinLen(data.name, 2, 'O nome deve ter pelo menos 2 caracteres');
  contract.hasMinLen(data.manufacturerName, 2, 'O nome do fabricante deve ter pelo menos 2 caracteres');
  contract.isRequired(data.name, 'O nome deve ter pelo menos 2 caracteres');

  if(!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    const blobSvc = azure.createBlobService(config.containerConnectionString);
    
    let filename = guid.raw().toString() + '.jpg'; // Encriptando a imagem
    let rawData = imageURL;
    let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/); // Remove cabeçalho da imagem que foi gerada
    let type = matches[1];
    let buffer = new Buffer(matches[2], 'base64');

    // Salvando a imagem
    await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
      contentType: type
    }, function(error, result, response) {
      if (error) {
        filename = 'default-product.png'
      }
    });

    await repository.create({
      ...data,
      imageURL: 'https://petitapetshop.blob.core.windows.net/product-images/' + filename
    });
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