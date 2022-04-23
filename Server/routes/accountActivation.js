// Enrutamiento de las url y llamada de los controladores

// dirección url: /activate
const express = require('express');
const router = express.Router();
const activateAccount = require('../controllers/activateAccountHandler')


// La dirección '/' es relativa a '/login'. Si fuera '/url', la dirección absoluta sería '/login/url'
router.post('/', activateAccount);

module.exports = router;