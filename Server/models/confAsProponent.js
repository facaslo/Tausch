const client = require('./databaseConnection')

const confAsProponent = async (req) => {

    const client_pool = await client.connect()
    let result;

    try{

        result = await client_pool.query(`UPDATE propuesta SET confirmacion_proponente = 'true' WHERE id_propuesta = '${req.body.idOffer}';`).then(res => res.rows).catch(e => console.log(e))
    }
    finally{
        client_pool.release()
    }

    return result
}

module.exports = confAsProponent