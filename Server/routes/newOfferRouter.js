// Enrutamiento de las url y llamada de los controladores

// dirección url: /new-offer
const express = require('express');
const router = express.Router();
const {postNewOffer} = require('../controllers/postHandler');

// La dirección '/' es relativa a '/new-offer'. Si fuera '/url', la dirección absoluta sería '/new-offer/url'
router.post('/', postNewOffer);
//router.post('/', authorization ,(req,res) => {    
//    res.json({"postingSuccess" : true})});

module.exports = router;