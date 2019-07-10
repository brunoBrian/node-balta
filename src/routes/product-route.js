'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

// Criando um registro na api
router.post('/', controller.post);

// Atualizando um registro na api
router.put('/:id', controller.put);

// Deletando um registro na api
router.delete('/', controller.delete);

module.exports = router;