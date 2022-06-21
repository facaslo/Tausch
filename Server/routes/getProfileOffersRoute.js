
// dirección url: /all-offers
const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization')
const getProfileOffers = require('../models/getProfileOffers')


router.get('/', authorization, async (req, res) => {

    try{
        
        const allOffers = await getProfileOffers(req.user_email)
        res.status(200).send({
            success: true, 
            offers: allOffers
        })

    }
    catch(err){
        res.status(403).send({success: false, error: err})
    }

})

module.exports = router