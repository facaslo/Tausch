// Enrutamiento de las url y llamada de los controladores

// dirección url: /new-post
const express = require('express');
const router = express.Router();
const {postLogin} = require('../controllers/postHandler');

// La dirección '/' es relativa a '/new-post'. Si fuera '/url', la dirección absoluta sería '/new-post/url'
router.post('/', postLogin);

module.exports = router;