const client = require('./databaseConnection');

const createPublication = async (email,id,titulo,categoria,subcategoria,descripcion,fecha_publicacion,estado_item, intercambio_por, numero_propuestas, imagen) => {    
    const client_pool = await client.connect();
    try{            
        await client_pool.query(`INSERT INTO publicacion(email,id,titulo,categoria,subcategoria,descripcion,fecha_publicacion,estado_item, intercambio_por, numero_propuestas, imagen) 
        values(${email},
            '${id}',
            '${titulo}',
            '${categoria}',
            '${subcategoria}',
            '${descripcion}',
            '${fecha_publicacion}',
            '${estado_item}',
            '${intercambio_por}',
            ${numero_propuestas}, 
            ${imagen})`).then(res=> res.rows).catch(e=> console.log(e));    
        
    }    
    finally {
        client_pool.release();
    }    
}

module.exports = createPublication;