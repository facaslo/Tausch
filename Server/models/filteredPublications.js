const client = require('./databaseConnection');

const filteredPublications = async (req, res) => {
    let result;
    const client_pool = await client.connect();
    try{        
    
        result = await client_pool.query(`SELECT * FROM publicacion WHERE categoria='${req.body.category}' AND subcategoria='${req.body.subcategory}'`).then(res=> res.rows).catch(e=> console.log(e));    
        
    }    
    finally {
        client_pool.release();
    }  
    
    return result;
}

module.exports = filteredPublications;