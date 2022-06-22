const express = require('express')
const router = express.Router()
const updateUserNotification = require('../models/updateUserNotification')
const authorization = require('../middleware/authorization')

router.put('/', authorization, async (req, res) => {

    try{

        await updateUserNotification(req)

        res.status(200).send({success:true, msg:'Se ha actualizado el estado de la notificación'})

    }
    catch(err){
        res.status(403).send({success:false, error: err})
    }


})

module.exports = router