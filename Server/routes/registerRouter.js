// Enrutamiento de las url y llamada de los controladores

// dirección url: /register
const express = require('express');
const router = express.Router();
const {postRegister} = require('../controllers/Login-RegisterHandler')

router.post('/', postRegister);

module.exports = router;