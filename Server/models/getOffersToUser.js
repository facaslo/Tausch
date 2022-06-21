const client = require('./databaseConnection');

const getOffersToUser = async (email) => {

    let result;
    const client_pool = await client.connect();
    try{       
        result = await client_pool.query(`SELECT notificacion.id_propuesta, notificacion.estado_propuesta, 
        notificacion.notificacion_abierta, notificacion.email AS notificacion_email, propuesta.email_proponente,
        propuesta.email_receptor, CASE 
            WHEN propuesta.email_proponente = '${email}' THEN (SELECT getName(propuesta.email_receptor))
            WHEN propuesta.email_receptor = '${email}' THEN (SELECT getName(propuesta.email_proponente))
        END AS nombre, publicacion.titulo
        FROM (notificacion join propuesta ON notificacion.id_propuesta=propuesta.id_propuesta) 
        join publicacion ON publicacion.id = propuesta.id_publicacion_receptor  
        WHERE notificacion.email = '${email}' AND (propuesta.email_proponente = notificacion.email
        OR propuesta.email_receptor = notificacion.email);
        `).then(res=> res.rows).catch(e=> console.log(e))
    }
    finally {
        client_pool.release();
    }    
    return result;
}

module.exports = getOffersToUser;