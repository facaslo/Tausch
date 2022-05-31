// Enrutamiento de las url y llamada de los controladores

// dirección url: /offers-to-user
const express = require('express');
const router = express.Router();
const getOffersToUser = require('../models/getOffersToUser')
const authorization = require('../middleware/authorization');

// La dirección '/' es relativa a '/offers-to-user'. Si fuera '/url', la dirección absoluta sería '/offers-to-user/url'
router.get('/', authorization, async (req, res) => {
    
    let offersToUser;
    try{
        offersToUser = await getOffersToUser(req.user_email);
        console.log(offersToUser)
        res.status(200).json({success: true, offers: offersToUser})
    }
    catch(err){
        res.status(400).json({success: false, error: err})
    }
});

module.exports = router;