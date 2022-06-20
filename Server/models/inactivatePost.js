const client = require('./databaseConnection')

const inactivatePost = async (req) => {

    const client_pool = await client.connect()
    let result;

    try{

        result = await client_pool.query(`UPDATE publicacion SET activa = 'false' WHERE id = '${req.body.idPost}';`).then(res => res.rows).catch(e => console.log(e))
    }
    finally{
        client_pool.release()
    }

    return result
}

module.exports = inactivatePost