// Enrutamiento de las url y llamada de los controladores

// dirección url: /delete-post
const express = require('express');
const router = express.Router();
const deletePublication = require('../models/deletePublication')

// La dirección '/' es relativa a '/delete-post'. Si fuera '/url', la dirección absoluta sería '/delete-post/url'
router.delete('/', async (req, res) => {// validacion ?

    try{
        await deletePublication(req.body.id)// req.body.email
        res.status(200).json({deleteSuccess:true, msg: 'Publicacion borrada exitosamente.'})
    }
    catch(err){
        res.status(400).json({deleteSuccess:false, data: err})
    }

});

module.exports = router;