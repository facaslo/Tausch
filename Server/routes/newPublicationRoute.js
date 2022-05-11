// Enrutamiento de las url y llamada de los controladores

// dirección url: /new-post
const express = require('express');
const router = express.Router();
const {postNewPublication} = require('../controllers/postHandler');
const multer = require('multer');
const authorization = require('../middleware/authorization');

// La dirección '/' es relativa a '/new-post'. Si fuera '/url', la dirección absoluta sería '/new-post/url'
router.post('/', authorization, postNewPublication);
//router.post('/', authorization ,(req,res) => {    
//    res.json({"postingSuccess" : true})});

module.exports = router;