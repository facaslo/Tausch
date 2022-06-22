const express = require('express')
const router = express.Router()
const deleteUserNotifications = require('../models/deleteUserNotifications')
const authorization = require('../middleware/authorization')

router.delete('/', authorization, async (req, res) => {

    try{

        await deleteUserNotifications(req)

        res.status(200).send({success:true, msg:'Se han eliminado las notificaciones del usuario'})

    }
    catch(err){
        res.status(403).send({success:false, error: err})
    }


})

module.exports = router