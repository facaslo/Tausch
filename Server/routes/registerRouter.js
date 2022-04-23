// Enrutamiento de las url y llamada de los controladores

// dirección url: /register
const express = require('express');
const router = express.Router();
const {postRegister} = require('../controllers/getPostRequest')
const {responseRegister} = require('../middleware/outAPIRegister')

router.post('/', postRegister, responseRegister);

module.exports = router;