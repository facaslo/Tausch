const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization')
const confAsReceptor = require('../models/confAsReceptor')

router.put('/', authorization, async (req, res) => {

    try{

        await confAsReceptor(req)
        res.status(200).send({success: true, msg: 'Confirmacion de trueque exitosa.'})
    }
    catch(err){
        res.status(403).send({success: false, error: err})
    }
})

module.exports = router