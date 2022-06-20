const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization')
const inactivatePost = require('../models/inactivatePost')

router.put('/', authorization, async (req, res) => {

    try{

        await inactivatePost(req)
        res.status(200).send({success: true, msg: 'La publicacion ahora esta inactiva.'})
        
    }
    catch(err){
        res.status(403).send({success: false, error: err})
    }
})

module.exports = router