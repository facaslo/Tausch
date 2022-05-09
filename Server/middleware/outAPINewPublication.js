const responseNewPublication = (req,res)=>{    
    try{
        res.status(200).json({postingSuccess:true, title:req.body.title, msg:'Publicacion creada exitosamente.'}) 
    }
    catch (err) {
        res.status(403).json({postingSuccess:false, data:err})
    }
}

module.exports = responseNewPublication