const client = require('./databaseConnection');

const deletePublication = async (id) => {// email ?
    let result;
    const client_pool = await client.connect();
    try{         
        await client_pool.query(`UPDATE propuesta SET estado_propuesta='cancelada' WHERE id_publicacion_receptor='${id}' AND estado_propuesta='en espera';`).then(res => res.rows).catch(e => console.log(e))
        await client_pool.query(`UPDATE propuesta SET estado_propuesta='cancelada' WHERE estado_propuesta='en espera' AND id_propuesta in (select id_propuesta from propuesta_tiene_publicacion where id_publicacion='${id}');`).then(res => res.rows).catch(e => console.log(e))
        await client_pool.query(`UPDATE publicacion SET activa=false WHERE id='${id}'`).then(res=> res.rows).catch(e=> console.log(e));    
        
    }    
    finally {
        client_pool.release();
    }  
    
    return
}

module.exports = deletePublication;