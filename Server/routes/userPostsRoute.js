// Enrutamiento de las url y llamada de los controladores

// dirección url: /user-posts
const express = require('express');
const router = express.Router();
const getUserPosts = require('../models/getUserPosts')
const authorization = require('../middleware/authorization');

// La dirección '/' es relativa a '/user-posts'. Si fuera '/url', la dirección absoluta sería '/user-posts/url'
router.get('/', authorization, async (req, res) => {
    
    let userPosts;
    try{
        userPosts = await getUserPosts(req.user_email);
        res.status(200).json({success: true, posts: userPosts})
    }
    catch(err){
        res.status(400).json({success: false, error: err})
    }
});

module.exports = router;