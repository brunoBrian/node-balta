'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

// Listando pedido na api
router.get('/', controller.get);

// Criando um pedido na api
router.post('/', authService.authorize, controller.post);

module.exports = router;