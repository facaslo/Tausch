// Enrutamiento de las url y llamada de los controladores

// dirección url: /all-offers
const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization')
const getOffers = require('../models/getOffers')
const getPublicationInfo = require('../models/getPublicationInfo')

// La dirección '/' es relativa a '/all-offers'. Si fuera '/url', la dirección absoluta sería '/all-offers/url'
router.post('/', authorization, async (req, res) => {

    try{
        
        const allOffers = await getOffers(req)
        const post = await getPublicationInfo(allOffers[0].id_publicacion_receptor)

        res.status(200).send({
            success: true, 
            nameOfferOwner: allOffers[0].nombres + " " + allOffers[0].apellidos, 
            offerMsg: allOffers[0].mensaje, 
            exchanges: allOffers,
            myPost: post[0]
        })

    }
    catch(err){
        res.status(403).send({success: false, error: err})
    }

})

module.exports = router