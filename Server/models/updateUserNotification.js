const client = require('./databaseConnection')

const updateUserNotification = async (req) => {

    const client_pool = await client.connect()
    let result;

    try{
        
        result = await client_pool.query(`UPDATE notificacion SET notificacion_abierta = true
        WHERE email='${req.user_email}';`).then(res => res.rows).catch(e => console.log(e))

    }
    finally{
        client_pool.release()
    }

    return result
}

module.exports = updateUserNotification