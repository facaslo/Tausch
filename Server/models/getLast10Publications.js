const client = require('./databaseConnection');

const getLast10Publications = async () => {
    let result;
    const client_pool = await client.connect();
    try{        
    
        result = await client_pool.query(`SELECT * FROM publicacion ORDER BY fecha_publicacion DESC LIMIT 10;`).then(res=> res.rows).catch(e=> console.log(e));    
        
    }    
    finally {
        client_pool.release();
    }  
    
    return result;
}

module.exports = getLast10Publications;