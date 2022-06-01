const responseNewOffer = (req,res)=>{    
    try{
        res.status(200).json({offerSuccess:true, msg:'Oferta de trueque creada exitosamente.'}) 
    }
    catch (err) {
        res.status(403).json({offerSuccess:false, data:err})
    }
}

module.exports = responseNewOffer