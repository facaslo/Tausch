const {getUserToken, activateAccountDB} = require('../models/activateUserDb');
const responseActivation = require('../middleware/outAPIActivation');

const activateAccount = async(req,res,next) => {
    let result = await getUserToken(req.body.email, req.body.token);    
    if(result.length !== 0){
        await activateAccountDB(req.body.email);
        responseActivation(req,res,true);
    }
    else{
        responseActivation(req,res,false);
    }
    return next();
}

module.exports = activateAccount;