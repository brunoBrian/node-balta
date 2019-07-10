'use strict';

// Criando um registro na api
exports.post = (req, res, next) => {
  res.status(201).send(req.body);
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