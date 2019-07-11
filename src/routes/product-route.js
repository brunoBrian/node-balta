'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

// Listando produtos
router.get('/', controller.get);

// Pegando produto pelo slug
router.get('/:slug', controller.getBySlug);

// Pegando produto pelo id
router.get('/admin/:id', controller.getById);

// Pegando produtos pela tag
router.get('/tags/:tag', controller.getByTag);

// Criando um produto na api
router.post('/', controller.post);

// Atualizando um produto na api
router.put('/:id', controller.put);

// Deletando um produto na api
router.delete('/', controller.delete);

module.exports = router;