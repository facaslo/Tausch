const client = require('./databaseConnection')

const getUserBarters = async (req) => {

    const client_pool = await client.connect()

    let result;
    try{

        result = client_pool.query(`SELECT * FROM propuesta WHERE email_receptor='${req.user_email}' AND estado_propuesta == 'aceptados'`).then(res => res.rows).catch(e => console.log(e))
    }
    finally{
        client_pool.release()
    }

    return result
}

module.exports = getUserBarters