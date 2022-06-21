const client = require('./databaseConnection')

const cancelOffer = async (req) => {

    const client_pool = await client.connect()
    let result;

    try{

        result = await client_pool.query(`UPDATE propuesta SET estado_propuesta = 'cancelada' WHERE id_propuesta='${req.body.idOffer}';`).then(res => res.rows).catch(e => console.log(e))
        for (const idPub of req.body.idsPublications){
            await client_pool.query(`UPDATE publicacion set activa=true WHERE id='${idPub}';`).then(res => res.rows).catch(e => console.log(e))
        }
    }
    finally{
        client_pool.release()
    }
    return result

}

module.exports = cancelOffer