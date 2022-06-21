const client = require('./databaseConnection')

const acceptOffer = async (req) => {

    const client_pool = await client.connect()
    let result;

    try{
        result = await client_pool.query(`UPDATE propuesta SET estado_propuesta = 'aceptada' WHERE id_propuesta = '${req.body.idOffer}';`).then(res => res.rows).catch(e => console.log(e))
        for(const offer of req.body.notSelectedOffers){
            await client_pool.query(`DELETE FROM propuesta_tiene_publicacion WHERE id_propuesta='${req.body.idOffer}' AND id_publicacion = '${offer}';`).then(res => res.rows).catch(e => console.log(e))
        }
        for (const idPub of req.body.idsPublications){
            await client_pool.query(`UPDATE propuesta SET estado_propuesta='cancelada' WHERE id_publicacion_receptor='${idPub}' and id_propuesta !='${req.body.idOffer}';`).then(res => res.rows).catch(e => console.log(e))
            await client_pool.query(`UPDATE propuesta SET estado_propuesta='cancelada' WHERE id_propuesta in (select id_propuesta from propuesta_tiene_publicacion where id_publicacion='${idPub}') and id_propuesta !='${req.body.idOffer}';`).then(res => res.rows).catch(e => console.log(e))
            await client_pool.query(`UPDATE publicacion SET activa=false WHERE id='${idPub}';`).then(res => res.rows).catch(e => console.log(e))
        }       
    }
    finally{
        client_pool.release()
    }

    return result
}

module.exports = acceptOffer