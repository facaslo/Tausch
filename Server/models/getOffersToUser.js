const client = require('./databaseConnection');

const getOffersToUser = async (email) => {

    let result;
    const client_pool = await client.connect();
    try{       
        result = await client_pool.query(`SELECT * FROM propuesta WHERE email_receptor='${email}' AND estado_propuesta='en espera'`).then(res=> res.rows).catch(e=> console.log(e))
    }
    finally {
        client_pool.release();
    }    
    return result;
}

module.exports = getOffersToUser;