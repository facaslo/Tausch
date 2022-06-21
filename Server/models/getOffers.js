const client = require('./databaseConnection')

const getOffers = async (req) => {

    let result;
    const client_pool = await client.connect();

    try{

        // en esta consulta se unen 4 tablas para los campos solicitados aqui abajo  |
        // si es necesario se pueden agregar otros que se consideren importantes     v
        // se devuelve el nombre del proponente, el mensaje de la propuesta, 
        // el id de la publicacion del receptor y la informacion importante de las
        // publicaciones para intercambio, incluido sus IDs

        result = await client_pool.query(`SELECT fecha_trueque, id_publicacion_receptor, email_proponente, confirmacion_receptor, confirmacion_proponente, estado_propuesta, fecha_propuesta, nombres, apellidos, mensaje, titulo, id, categoria, descripcion, estado_item, imagen
        FROM ((propuesta JOIN propuesta_tiene_publicacion
        ON propuesta_tiene_publicacion.id_propuesta = propuesta.id_propuesta)
        JOIN perfil ON propuesta.email_proponente = perfil.email)
        JOIN publicacion ON publicacion.id = propuesta_tiene_publicacion.id_publicacion
        WHERE propuesta.id_propuesta = ${req.body.idOffer}`).then(res => res.rows).catch(e => console.log(e))

    }
    finally{
        client_pool.release()
    }

    return result
}

module.exports = getOffers