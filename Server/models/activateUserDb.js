// Los modelos se encargan de conectar y hacer transacciones en la base de datos
const client = require('./databaseConnection');


const getUserToken = async (user,token) => {
    const cliente = await client.connect();
    let result;
    try{
        result = await cliente.query(`SELECT * FROM activation_token JOIN usuario 
        ON activation_token.email = usuario.email 
        WHERE nombre_de_usuario='${user}' AND token='${token}';`).then(res=> res.rows).catch(e=> console.log(e));
    } finally {
        cliente.release()
    }     
    return result;
}

const activateAccountDB = async (user,email) => {
    const cliente = await client.connect();
    try{
        await cliente.query(`BEGIN; 
        UPDATE usuario SET estado_de_cuenta = true 
        WHERE nombre_de_usuario='${user}';
        DELETE FROM activation_token WHERE email='${email}';
        COMMIT;`).then(res=> res.rows).catch(e=> console.log(e));
    } finally {
        cliente.release()
    } 
    
    return;
}

module.exports = {getUserToken, activateAccountDB}