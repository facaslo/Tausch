const responseRegister = (req,res,status)=>{    
    try{
        if(status){
            res.status(200).json({registerSuccess:true, email: req.email})
        }
        else{
            res.status(200).json({registerSuccess:false, emailOrUserAvailable: false})
        }        
    }
    catch (err) {
        res.status(403).json({registerSuccess:false, data:err})
    }
}

module.exports = responseRegister