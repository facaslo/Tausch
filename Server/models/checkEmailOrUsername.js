const client = require('./databaseConnection');

const checkEmailOrUsername = async (usuario,email) => {
    let result;
    const cliente = await client.connect();
    try{        
    
        result = await cliente.query(`SELECT * FROM usuario WHERE nombre_de_usuario='${usuario}' OR email='${email}'`).then(res=> res.rows).catch(e=> console.log(e));    
        
    }    
    finally {
        cliente.release();
    }  
    
    return result;
}

module.exports = checkEmailOrUsername;