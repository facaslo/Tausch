const responseNewPost = (req,res)=>{    
    try{
        res.status(200).json({postingSuccess:true, data:req.body})  // que se debe mandar como respuesta   
    }
    catch (err) {
        res.status(403).json({postingSuccess:false, data:err})
    }
}

module.exports = responseNewPost