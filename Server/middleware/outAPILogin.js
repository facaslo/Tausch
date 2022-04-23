const responseLogin = (req,res, isCorrect) => {    
    try{
        let userLogin;
        if(isCorrect){
            userLogin = {"email":req.body.email, "userName":req.body.userName, "firstName":req.body.firstName, "lastName" : req.body.firstName};

            res.status(200).json({success:true, data:userLogin});
        }
        else{           
            
            res.status(200).json({success:false});
        }                    
        
    }
    catch(err){
        res.status(403).json({success:false, data:err})
    }
}


module.exports = responseLogin