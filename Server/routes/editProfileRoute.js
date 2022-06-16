// Enrutamiento de las url y llamada de los controladores

// dirección url: /edit-profile

const express = require('express')
const router = express.Router()
const {postEditProfile} = require('../controllers/postHandler')
const authorization = require('../middleware/authorization')

router.put('/', authorization, postEditProfile)

module.exports = router