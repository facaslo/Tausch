const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization')
const confAsProponent = require('../models/confAsProponent')

router.put('/', authorization, async (req, res) => {

    try{

        await confAsProponent(req)
        res.status(200).send({success: true, msg: 'Confirmacion de trueque exitosa.'})
    }
    catch(err){
        res.status(403).send({success: false, error: err})
    }
})

module.exports = router