const client = require('./databaseConnection');

const getUserPosts = async (email) => {

    let result;
    const client_pool = await client.connect();
    try{       
        result = await client_pool.query(`SELECT * FROM publicacion WHERE email='${email}' AND activa='true'`).then(res=> res.rows).catch(e=> console.log(e))
    }
    finally {
        client_pool.release();
    }    
    return result;
}

module.exports = getUserPosts;