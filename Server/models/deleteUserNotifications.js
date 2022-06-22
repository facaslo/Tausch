const client = require('./databaseConnection')

const deleteUserNotifications = async (req) => {

    const client_pool = await client.connect()
    let result;

    try{
        
        result = await client_pool.query(`DELETE FROM notificacion
        WHERE email='${req.user_email}';`).then(res => res.rows).catch(e => console.log(e))

    }
    finally{
        client_pool.release()
    }

    return result
}

module.exports = deleteUserNotifications