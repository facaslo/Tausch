// Enrutamiento de las url y llamada de los controladores

// dirección url: /filter
const express = require('express');
const router = express.Router();
const getPublicationList = require('../models/getPublicationList')

// La dirección '/' es relativa a '/filter'. Si fuera '/url', la dirección absoluta sería '/filter/url'
router.get('/', async (req, res) => {
    let query = req.query 
    let publicationList = await getPublicationList(query.page, query.limit, query.category);
    res.status(200).json({success: true, posts: publicationList})
});

module.exports = router;