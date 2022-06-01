const client = require('./databaseConnection');

const getOffersToUser = async (email) => {

    let result;
    const client_pool = await client.connect();
    try{       
        result = await client_pool.query(`SELECT titulo, nombre_de_usuario
        FROM (propuesta join publicacion on propuesta.id_publicacion_receptor=publicacion.id) join usuario on propuesta.email_proponente = usuario.email where email_receptor='${email}' AND propuesta.estado_propuesta='en espera';`).then(res=> res.rows).catch(e=> console.log(e))
    }
    finally {
        client_pool.release();
    }    
    return result;
}

module.exports = getOffersToUser;