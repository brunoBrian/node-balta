'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

// Listando pedido na api
router.get('/', controller.get);

// Criando um produto na api
router.post('/', controller.post);

module.exports = router;