// Enrutamiento de las url y llamada de los controladores

// dirección url: /delete-post
const express = require('express');
const router = express.Router();
const deletePublication = require('../models/deletePublication')

<<<<<<< HEAD
// La dirección '/' es relativa a '/delete'. Si fuera '/url', la dirección absoluta sería '/delete/url'
router.delete('/', async (req, res) => {
=======
// La dirección '/' es relativa a '/delete-post'. Si fuera '/url', la dirección absoluta sería '/delete-post/url'
router.delete('/', async (req, res) => {// validacion ?
>>>>>>> 98c813fe4008bd842be1688861a1a0955c1e746c

    try{
        await deletePublication(req.body.id)
        res.status(200).json({deleteSuccess:true, msg: 'Publicacion borrada exitosamente.'})
    }
    catch(err){
        res.status(400).json({deleteSuccess:false, data: err})
    }

});

module.exports = router;