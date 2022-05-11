const client = require('./databaseConnection');

const checkEmailOrUsername = async (usuario,email) => {
    let result;
    const client_pool = await client.connect();
    try{        
    
        result = await client_pool.query(`SELECT * FROM usuario WHERE nombre_de_usuario='${usuario}' OR email='${email}'`).then(res=> res.rows).catch(e=> console.log(e));    
        
    }    
    finally {
        client_pool.release();
    }  
    
    return result;
}

module.exports = checkEmailOrUsername;