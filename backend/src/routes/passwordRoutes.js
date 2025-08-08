const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

router.post('/generate', passwordController.generatePassword);

// A rota agora inclui um parâmetro dinâmico ':deviceId' para haver um exibição individual das senhas geradaas por dispositivo
router.get('/history/:deviceId', passwordController.getHistory); 

module.exports = router;