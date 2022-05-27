const client = require('./databaseConnection');

const createOffer = async (email_proponente,email_receptor,id_publicacion_receptor,id_publicacion_proponente,mensaje) => {    
    const client_pool = await client.connect();
    const fecha = new Date()
    try{        
        await client_pool.query(`INSERT INTO propuesta(email_proponente,email_receptor,id_publicacion_receptor,id_publicacion_proponente,mensaje,fecha_propuesta) 
        values('${email_proponente}',
            '${email_receptor}',
            '${id_publicacion_receptor}',
            '${id_publicacion_proponente}',
            '${mensaje}',
            '${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}');`).then(res=> res.rows).catch(e=> console.log(e));   
    }
    finally {
        client_pool.release();
    }    
}

module.exports = createOffer;