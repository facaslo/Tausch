// Enrutamiento de las url y llamada de los controladores

// dirección url: /publication
const express = require('express');
const router = express.Router();

//Traer modelo de la base de datos para consultar
const getPublicationInfo = require('../models/getPublicationInfo');

// La dirección '/' es relativa a '/publication'. Si fuera '/url', la dirección absoluta sería '/publication/url'
router.get('/:id', async (req, res) =>{
    //Extraer el id de la publicacion
    const publicationId = req.params.id;
    const data = await getPublicationInfo(publicationId);
    //Retorna el objeto con los datos correspondientes al id de la publicacion
    res.send(data[0]);
});

module.exports = router;