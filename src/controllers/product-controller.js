'use strict';
const mongoose = require('mongoose');

const Product = mongoose.model('Product');

// Listando produtos
exports.get = (req, res, next) => {
  Product.find({ active: true }, 'name manufacturerName image line petType description racePorte race age amount indication use slug type howToUse benefits smell materialType tags date').then( data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send(error);
  });
}

// Pegando produto pelo slug
exports.getBySlug = (req, res, next) => {
  Product.findOne({ slug: req.params.slug, active: true }, 'name image manufacturerName line petType description racePorte race age amount indication use slug type howToUse benefits smell materialType tags date').then( data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send(error);
  });
}

// Pegando produto pelo id
exports.getById = (req, res, next) => {
  Product.findById(req.params.id).then( data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send(error);
  });
}

// Pegando produto pela tag
exports.getByTag = (req, res, next) => {
  Product.find({ tags: req.params.tag, active: true }, 'name image manufacturerName line petType description racePorte race age amount indication use slug type howToUse benefits smell materialType tags date').then( data => {
    res.status(200).send(data);
  }).catch(error => {
    res.status(400).send(error);
  });
}
 
// Criando um registro na api
exports.post = (req, res, next) => {
  var product = new Product(req.body);
  product.save().then( response => {
    res.status(201).send({message: 'Produto cadastrado com sucesso!'});
  }).catch(error => {
    res.status(400).send({message: 'Falha ao cadastrar produto', data: error});
  });
};

// Atualizando um registro na api
exports.put = (req, res, next) => {
  const id = req.params.id;
  
  res.status(200).send({ 
    id: id,
    item: req.body
  });
};

// Deletando um registro na api
exports.delete = (req, res, next) => {
  res.status(200).send(req.body);
};