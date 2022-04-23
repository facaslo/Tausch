const responseLogin = (req,res) => {
    try{
        const userLogin = {"email":req.body.email, "password":req.body.password}

        //res.status(200).json({success:true, msg:'Inicio de sesion exitoso.', data:getUserInfoFromDB(req.body.userName)})
        res.status(200).json({success:true, msg:'Inicio de sesion exitoso.', data:userLogin})
        
    }
    catch(err){
        res.status(403).json({success:false, data:err})
    }
}

module.exports = {responseLogin}