const client = require('./databaseConnection');

const getNumberOfRows = async (category) => {
    let result;
    const client_pool = await client.connect();
    try{       
        if(category==="all")
        {
            result = await client_pool.query(`SELECT COUNT(*) FROM publicacion`).then(res=> res.rows).catch(e=> console.log(e));    
        }
        else {
            result = await client_pool.query(`SELECT COUNT(*) FROM publicacion WHERE categoria='${category}'`).then(res=> res.rows).catch(e=> console.log(e));    
        }
                
    }    
    finally {
        client_pool.release();
    }  
    
    return result;
}

module.exports = getNumberOfRows;