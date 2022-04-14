// Los modelos se encargan de conectar y hacer transacciones en la base de datos
const client = require('./databaseConnection');

const getUserInfoFromDB = async (usuario) => {
    client.connect();
    result = await client.query(`SELECT * FROM usuario WHERE nombre_de_usuario='${usuario}' AND estado_de_cuenta=false`).then(res=> res.rows).catch(e=> console.log(e));
    client.end();
    return result;
}

module.exports = getUserInfoFromDB;
