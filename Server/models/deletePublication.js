const client = require('./databaseConnection');

const deletePublication = async (id) => {// email ?
    let result;
    const client_pool = await client.connect();
    try{        
    
        result = await client_pool.query(`DELETE FROM publicacion WHERE id='${id}'`).then(res=> res.rows).catch(e=> console.log(e));    
        
    }    
    finally {
        client_pool.release();
    }  
    
    return result;
}

module.exports = deletePublication;