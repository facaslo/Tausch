// Enrutamiento de las url y llamada de los controladores

// dirección url: /filter
const express = require('express');
const router = express.Router();
const getLast10Publications = require('../models/getLast10Publications')

// La dirección '/' es relativa a '/filter'. Si fuera '/url', la dirección absoluta sería '/filter/url'
router.get('/', async (req, res) => {
    let last10 = await getLast10Publications();
    res.json(last10)   
});

module.exports = router;