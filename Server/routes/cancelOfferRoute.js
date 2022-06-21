const express=require('express')
const router=express.Router()
const cancelOffer=require('../models/cancelOffer')
const authorization=require('../middleware/authorization')

router.post('/',authorization, async(req,res)=>{
    try{
        const perfil=await cancelOffer(req)
        res.status(200).send({success:true, msg:'Propuesta cancelada exitosamente'})
    }catch(err){
        res.status(403).send({success:false, error:err})
    }
})
module.exports=router