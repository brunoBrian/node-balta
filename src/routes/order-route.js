'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');

// Listando pedido na api
router.get('/', controller.get);

// Criando um pedido na api
router.post('/', controller.post);

module.exports = router;