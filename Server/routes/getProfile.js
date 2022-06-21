const express=require('express')
const router=express.Router()
const getProfileInfo=require('../models/getProfileInfo')

router.post('/',async(req,res)=>{
    try{
        const perfil=await getProfileInfo(req.body.email)
        res.status(200).send({success:true, perfilInfo:perfil})
    }catch(err){
        res.status(403).send({success:false, error:err})
    }
})
module.exports=router