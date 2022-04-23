const responseRegister = (req,res,status)=>{    
    try{
        if(status){
            res.status(200).json({success:true, email: req.email})
        }
        else{
            res.status(200).json({success:false, emailOrUserAvailable: false})
        }        
    }
    catch (err) {
        res.status(403).json({success:false, data:err})
    }
}

module.exports = responseRegister