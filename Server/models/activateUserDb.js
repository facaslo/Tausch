// Los modelos se encargan de conectar y hacer transacciones en la base de datos
const client = require('./databaseConnection');
const {hashPassword} = require('../utils/hashPassword');
let result;
const getUserToken = async (email,token) => {
    const cliente = await client.connect();
    try{
        result = await cliente.query(`SELECT * FROM activation_token WHERE email='${email}' AND token='${token}';`).then(res=> res.rows).catch(e=> console.log(e));
    } finally {
        cliente.release()
    }     
    return result;
}

const activateAccountDB = async (email) => {
    const cliente = await client.connect();
    try{
        await cliente.query(`BEGIN; 
        UPDATE usuario SET estado_de_cuenta = true 
        WHERE email='${email}';
        DELETE FROM activation_token WHERE email='${email}';
        COMMIT;`).then(res=> res.rows).catch(e=> console.log(e));
    } finally {
        cliente.release()
    } 
    
    return;
}

module.exports = {getUserToken, activateAccountDB}