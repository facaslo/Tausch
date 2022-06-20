const client = require('./databaseConnection')

const declineOffer = async (req) => {

    const client_pool = await client.connect()
    let result;

    try{

        result = await client_pool.query(`UPDATE propuesta SET estado_propuesta = 'rechazada' WHERE id_propuesta='${req.body.idOffer}';`).then(res => res.rows).catch(e => console.log(e))
    }
    finally{
        client_pool.release()
    }
    return result

}

module.exports = declineOffer