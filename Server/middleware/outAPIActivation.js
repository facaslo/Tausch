const responseActivation = (req,res,status) => {    
    try{
        let userLogin;
        if(status){
            userLogin = {"userName":req.body.userName};

            res.status(200).json({activationSuccess:true, activated:true, data:userLogin});
        }
        else{                       
            res.status(200).json({activationSuccess:false, activated:false});
        }              
    }
    catch(err){
        res.status(403).json({activationSuccess:false, data:err})
    }
}

module.exports = responseActivation