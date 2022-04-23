const responseRegister = (req,res)=>{
    
    try{
        const respNewUser = {
            "userName":req.body.userName, 
            "firstName":req.body.firstName, 
            "lastName":req.body.lastName, 
            "phoneNumber":req.body.phoneNumber,
            "facebook":req.body.facebook,
            "twitter":req.body.twitter,
            "instagram":req.body.instagram
        }

        res.status(200).json({success:true, msg:'Se registro correctamente el usuario.', data:respNewUser})
    }
    catch (err) {
        res.status(403).json({success:false, data:err})
    }
}

module.exports = {responseRegister}