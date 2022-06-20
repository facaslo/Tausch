const express = require('express')
const router = express.Router()
const declineOffer = require('../models/declineOffer')
const authorization = require('../middleware/authorization')

router.put('/', authorization, async (req, res) => {

    try{

        await declineOffer(req)

        res.status(200).send({success:true, msg:'Oferta rechazada exitosamente.'})

    }
    catch(err){
        res.status(403).send({success:false, error: err})
    }


})

module.exports = router