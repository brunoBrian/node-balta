'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

// Listando customers na api
router.get('/', controller.get);

// Criando um customer na api
router.post('/', controller.post);

// Autenticando customers na api
router.post('/authenticate', controller.authenticate);

// Refresh token customers na api
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;