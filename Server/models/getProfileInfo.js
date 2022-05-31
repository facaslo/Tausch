// Los modelos se encargan de conectar y hacer transacciones en la base de datos
const client = require('./databaseConnection');

const getProfileInfo = async (email) => {
    let result;
    const cliente = await client.connect();
    try{        
        result = await cliente.query(`SELECT * FROM usuario JOIN perfil ON usuario.email = perfil.email WHERE usuario.email='${email}'`).then(res=> res.rows).catch(e=> console.log(e));            
    }    
    finally {
        cliente.release();
    }  
    
    return result;
}

/*
console.log("a");
(async function(){
    // let a = await getUserInfoFromDB('Pepita', null)
    let a = await getUserInfoFromDB(null, 'facaslo.99@gmail.com')
    console.log(a);
})(); 
*/

module.exports = getProfileInfo;