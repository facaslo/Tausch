const express = require("express");
const path = require('path');
const cors = require('cors');
const printRequestType = require('./middleware/requestType');
const app = express();

// Routes
const registerRoute = require('./routes/registerRouter');
const loginRoute = require('./routes/loginRouter');
const activationRoute = require('./routes/accountActivation');
const authenticationRoute = require('./routes/authenticationRoute');
const newPublicationRoute = require('./routes/newPublicationRoute')
const filterRoute = require('./routes/filterRoute')
const getLast10 = require('./routes/getLast10PubRoute')

// Configuración del servidor, puerto 3080
app.set('port', process.env.PORT || 3080); 

//Cross origin resource sharing
app.use(cors());
// parse form data
app.use(express.urlencoded({extended: false}))
// parse json
app.use(express.json({limit: '25mb'}))

// Llamada a midlewares
app.use(printRequestType);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/activate', activationRoute);
app.use('/authentication',authenticationRoute);
app.use('/new-post', newPublicationRoute);
app.use('/filter', filterRoute);
app.use('/getLastTen', getLast10)

// Iniciar servidor
app.listen(app.get('port'), ()=>{
    console.log("Server on port ", app.get('port'))  //start server with the selected port
});

// exportar el app.js para usarlo en las pruebas
module.exports = app
