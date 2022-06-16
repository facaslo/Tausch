const client = require('./databaseConnection')

const editProfile = async (req) => {

    const client_pool = await client.connect()
    let result;

    try{
        
        result = client_pool.query(`UPDATE perfil SET celular='${req.body.phoneNumber}', facebook='${req.body.facebook}', twitter='${req.body.twitter}', instagram='${req.body.instagram}'
        WHERE email='${req.user_email}';`).then(res => res.rows).catch(e => console.log(e))

    }
    finally{
        client_pool.release()
    }

    return result
}

module.exports = editProfile