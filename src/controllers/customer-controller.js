'use strict';

const md5 = require('md5');
const ValidationsContract = require('../validators/validations');
const repository = require('../repositories/customer-repositories');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

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
  const { name, email, password, _id } = req.body;

  contract.hasMinLen(req.body.name, 3, 'O nome deve ter pelo menos 3 caracteres');
  contract.isEmail(req.body.email, 'E-mail inválido!');
  contract.isRequired(req.body.password, 6, 'O nome deve ter pelo menos 2 caracteres');

  if(!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      id: _id,
      name,
      email,
      password: md5(password + global.SALT_KEY),
      roles: ['user']
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
    console.log(error)
    res.status(500).send({
      message: 'Falha ao cadastrar cliente'
    });
  }
};

// Autenticando Customer
exports.authenticate = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const customer = await repository.authenticate({
      email,
      password: md5(password + global.SALT_KEY)
    });

    if(!customer) {
      res.status(404).send({
        message: 'Usuário ou senha Inválidos'
      });
      return;
    }
    
    const token = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles
    })

    res.status(201).send({
      token,
      data: {
        email: customer.email,
        name: customer.name,
        roles: customer.roles
      }
    });

  } catch(error) {
    res.status(400).send({
      message: 'Falha ao gerar token'
    });
  }
}

// Gerando Refresh Token do Customer
exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await authService.decodeToken(token);

    const customer = await repository.getById(data.id)

    if(!customer) {
      res.status(404).send({
        message: 'Cliente não encontrado'
      });
      return;
    }
    
    const tokenData = await authService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name,
      roles: customer.roles
    })

    res.status(201).send({
      tokenData,
      data: {
        email: customer.email,
        name: customer.name,
      }
    });

  } catch(error) {
    res.status(400).send({
      message: 'Falha ao gerar token'
    });
  }
}