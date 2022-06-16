const client = require('./databaseConnection');

const createOffer = async (email_proponente,email_receptor,id_publicacion_receptor,mensaje, lista_publicaciones) => {    
    const client_pool = await client.connect();
    const fecha = new Date()
    try{        
        const idpropuesta= await  client_pool.query(`INSERT INTO propuesta(email_proponente,email_receptor,id_publicacion_receptor,mensaje,fecha_propuesta) 
        values('${email_proponente}',
            '${email_receptor}',
            '${id_publicacion_receptor}',
            '${mensaje}',
            '${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}') RETURNING id_propuesta;`).then(res=> res.rows).catch(e=> console.log(e));   
            for (const idp of lista_publicaciones){
            await client_pool.query(`INSERT INTO propuesta_tiene_publicacion(id_propuesta, id_publicacion)
            values('${idpropuesta[0].id_propuesta}','${idp}');`).then(res=> res.rows).catch(e=> console.log(e));
            }
        }
    finally {
        client_pool.release();
    }    
}

module.exports = createOffer;