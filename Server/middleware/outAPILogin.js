//Se trae el generador de tokens
const jwtGenerator = require("../utils/jwtGenerator");

const responseLogin = (req,res, isCorrect, activated) => {    
    try{
        let userLogin;
        if(isCorrect){
            userLogin = {"email":req.body.email, "userName":req.body.userName, "firstName":req.body.firstName, "lastName" : req.body.firstName};

            if(activated){
                //Se añade campo para entregar la token al usuario que hacer log in
                //La token se genera a partir del email del usuario, es el unico dato que almacenara
                const token = jwtGenerator(userLogin.email);
                res.status(200).json({loginSuccess: true, credentialsValidated:true, isActivated: true, data:userLogin, token:token});
            }
            else{
                res.status(200).json({loginSuccess: false, credentialsValidated:true, isActivated:false, data:userLogin});
            }                        
        }
        else{           
            res.status(200).json({loginSuccess: false, credentialsValidated:false});
        }                    
        
    }
    catch(err){
        res.status(403).json({loginSuccess:false, data:err})
    }
}


module.exports = responseLogin