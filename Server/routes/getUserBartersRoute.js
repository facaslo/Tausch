const express = require('express')
const authorization = require('../middleware/authorization')
const router = express.Router()
const getUserBarters = require('../models/getUserBarters')

router.get('/', authorization, async (req, res) => {

    try{
        
        const barters = await getUserBarters(req)
        res.status(200).send({success:true, userBarters: barters})
    }
    catch(err){
        res.status(400).send({success: false, data:err})
    }
})

module.exports = router