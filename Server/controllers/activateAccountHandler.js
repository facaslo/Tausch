const {getUserToken, activateAccountDB} = require('../models/activateUserDb');
const responseActivation = require('../middleware/outAPIActivation');

const activateAccount = async(req,res,next) => {
    let result = await getUserToken(req.body.userName, req.body.token);    
    if(result.length !== 0){
        await activateAccountDB(result[0].nombre_de_usuario, result[0].email);
        responseActivation(req,res,true);
    }
    else if (result.length === 0){
        responseActivation(req,res,false);
    }
    return next();
}

module.exports = activateAccount;