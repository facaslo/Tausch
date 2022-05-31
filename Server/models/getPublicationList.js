const client = require('./databaseConnection');

const getPublicationList = async (page, limit, category) => {
    let result;
    const client_pool = await client.connect();
    try{       
        if(category==="all")
        {
            result = await client_pool.query(`SELECT * FROM publicacion ORDER BY fecha_publicacion DESC OFFSET ${page-1}*${limit} LIMIT ${limit}`).then(res=> res.rows).catch(e=> console.log(e));    
        }
        else {
            result = await client_pool.query(`SELECT * FROM publicacion WHERE categoria='${category}' ORDER BY fecha_publicacion DESC OFFSET ${page-1}*${limit} LIMIT ${limit}`).then(res=> res.rows).catch(e=> console.log(e));    
        }
                
    }    
    finally {
        client_pool.release();
    }  
    
    return result;
}

module.exports = getPublicationList;