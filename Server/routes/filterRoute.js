// Enrutamiento de las url y llamada de los controladores

// dirección url: /filter
const express = require('express');
const router = express.Router();
const filterPublication = require('../models/filteredPublications')

// La dirección '/' es relativa a '/filter'. Si fuera '/url', la dirección absoluta sería '/filter/url'
router.post('/', async (req, res) => {// validacion ?

    try{// salida de la api
        const filteredPosts = await filterPublication(req, res)// llamado al modelo
        res.status(200).json({success:true, posts: filteredPosts})
    }
    catch(err){
        res.status(400).json({success:false, data: err})
    }

});

module.exports = router;