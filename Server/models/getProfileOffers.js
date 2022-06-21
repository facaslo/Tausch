const client = require('./databaseConnection');

const getProfileOffers = async (email) => {

    const client_pool = await client.connect()
    let result;

    try{
        result = await client_pool.query(`SELECT email_proponente, email_receptor, id_propuesta, id_publicacion_receptor, estado_propuesta, titulo, CASE 
            WHEN email_proponente = '${email}' THEN (SELECT getName(email_receptor))
            WHEN email_receptor = '${email}' THEN (SELECT getName(email_proponente))
        END AS nombre
	FROM propuesta join publicacion on id_publicacion_receptor=id where email_proponente='${email}' or email_receptor='${email}';`).then(res => res.rows).catch(e => console.log(e))
              
    }
    finally{
        client_pool.release()
    }

    return result;
}

module.exports = getProfileOffers;