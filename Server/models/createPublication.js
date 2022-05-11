const client = require('./databaseConnection');

const createPublication = async (email,titulo,categoria,subcategoria,descripcion,estado_item, intercambio_por, imagen) => {    
    const client_pool = await client.connect();
    const fecha = new Date()
    try{            
        await client_pool.query(`INSERT INTO publicacion(email,titulo,categoria,subcategoria,descripcion,fecha_publicacion,estado_item, intercambio_por,imagen) 
        values('${email}',
            '${titulo}',
            '${categoria}',
            '${subcategoria}',
            '${descripcion}',
            '${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}',
            '${estado_item}',
            '${intercambio_por}',             
            '${imagen}');`).then(res=> res.rows).catch(e=> console.log(e));    
        
    }    
    finally {
        client_pool.release();
    }    
}

module.exports = createPublication;