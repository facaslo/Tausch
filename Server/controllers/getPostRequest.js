// Los controladores son la api que se encarga de procesar las llamadas de react y responder a las peticiones, bien sea llamando un modelo o enviando un json de respuesta

const postRegister = (req,res)=>{
    res.send('<h1> Esta es una petición post a la url /registro </h1>')
}

const postLogin = (req,res) => {
    res.send('<h1> Esta es una petición post a la url /login </h1>')
}

module.exports = {postRegister, postLogin}