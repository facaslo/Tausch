const {Pool} = require('pg');
const  client = new Pool(
    {
        host : "93.188.164.106",
        port : 5432,
        user: "tauschdeveloper",
        password: "4sAVjZuR9y",
        database: "Tausch"        
    }
)

module.exports = client;

/* Ejemplo de query

client.connect();

client.query(`Select * from usuario`, (err, res)=>{
    if(!err){
        console.log(res.rows);
    } else{
        console.log(err.message);
    }
    client.end();
});

*/