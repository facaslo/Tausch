const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization')
const acceptOffer = require('../models/acceptOffer')

router.put('/', authorization, async (req, res) => {

    try{

        await acceptOffer(req)

        res.status(200).send({success: true, msg: 'Oferta aceptada exitosamente.'})

    }
    catch(err){
        res.status(403).send({success:false, error: err})
    }
})

module.exports = router