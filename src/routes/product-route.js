'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

// Listando produtos
router.get('/', controller.get);

// Criando um produto na api
router.post('/', controller.post);

// Atualizando um produto na api
router.put('/:id', controller.put);

// Deletando um produto na api
router.delete('/', controller.delete);

module.exports = router;