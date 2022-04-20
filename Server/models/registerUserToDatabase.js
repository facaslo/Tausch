// Los modelos se encargan de conectar y hacer transacciones en la base de datos
const client = require('./databaseConnection');
const {hashPassword} = require('../utils/hashPassword');

const postUserInfoFromDBNoGoogle = async (infoUsuario) => {
    const hashedPassword = await hashPassword(infoUsuario.password);
    client.connect();
    const fecha = new Date()
    const resultUsuario = await client.query(`BEGIN;
        INSERT into usuario VALUES 
        ('${infoUsuario.userName}', 
        '${infoUsuario.email}',
        false,
        '${hashedPassword}',
        false,
        'Regular',
        '${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}'); \n
        INSERT into perfil VALUES 
        ('${infoUsuario.firstName}', 
        '${infoUsuario.lastName}', 
        ${infoUsuario.age}, 
        ${infoUsuario.phoneNumber},        
        '${infoUsuario.facebook}',
        '${infoUsuario.twitter}',
        '${infoUsuario.instagram}',
        '${infoUsuario.email}');
        COMMIT;`).then(res=> res.rows).catch(e=> console.log(e));
    client.end();
    return;
}

/*
const postUserInfoFromDBGoogle = async () => {
    client.connect();
    result = await client.query(`INSERT into FROM usuario WHERE nombre_de_usuario='${usuario}' AND estado_de_cuenta=false`).then(res=> res.rows).catch(e=> console.log(e));
    client.end();
    return result;
}
*/

/*
Prueba de usuario
postUserInfoFromDBNoGoogle({
    "userName":"Pepita",
    "password":"O6@NsmXVJmoJ",
    "email":"prueba4@yahoo.es", 
    "firstName":"fabian", 
    "lastName":"castro", 
    "age":"40",
    "phoneNumber":"313133131",
    "facebook":"Pepita",
    "twitter":"@Pepita",
    "instagram":"PepitaPH"
});
*/
module.exports = {postUserInfoFromDBNoGoogle};
