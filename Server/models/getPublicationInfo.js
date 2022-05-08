const client = require('./databaseConnection');

const getPublicationInfo = async (id) => {
    let result;
    const client_pool = await client.connect();
    try{        
    
        result = await client_pool.query(`SELECT * FROM publicacion WHERE id='${id}'`).then(res=> res.rows).catch(e=> console.log(e));    
        
    }    
    finally {
        client_pool.release();
    }  
    
    return result;
}

module.exports = getPublicationInfo;