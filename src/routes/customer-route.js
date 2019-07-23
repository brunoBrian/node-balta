'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

// Listando customers na api
router.get('/', controller.get);

// Criando um customer na api
router.post('/', controller.post);

// Autenticando customers na api
router.post('/authenticate', controller.authenticate);

module.exports = router;