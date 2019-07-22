'use strict';

const md5 = require('md5');
const ValidationsContract = require('../validators/validations');
const repository = require('../repositories/customer-repositories');
const emailService = require('../services/email-service');

// Listando contas
exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch(error) {
    res.status(400).send({
      message: 'Falha ao listar contas'
    });
  }
}

// Criando um registro na api do customer
exports.post = async (req, res, next) => {
  let contract = new ValidationsContract();
  const { name, email, password } = req.body;

  contract.hasMinLen(req.body.name, 3, 'O nome deve ter pelo menos 3 caracteres');
  contract.isEmail(req.body.email, 'E-mail inválido!');
  contract.isRequired(req.body.password, 6, 'O nome deve ter pelo menos 2 caracteres');

  if(!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      name,
      email,
      password: md5(password + global.SALT_KEY)
    });

    emailService.send(
      req.body.email, 
      'Bem vindo à Petita Petshop', 
      global.EMAIL_TMPL.replace('{0}', req.body.name)
    );

    res.status(201).send({
      message: 'Cliente cadastrado com sucesso!'
    });
  } catch(error) {
    res.status(500).send({
      message: 'Falha ao cadastrar cliente'
    });
  }
};