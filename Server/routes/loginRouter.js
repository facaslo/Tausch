// Enrutamiento de las url y llamada de los controladores

// dirección url: /login
const express = require('express');
const router = express.Router();
const {postLogin} = require('../controllers/postHandler');

// La dirección '/' es relativa a '/login'. Si fuera '/url', la dirección absoluta sería '/login/url'
router.post('/', postLogin);

module.exports = router;