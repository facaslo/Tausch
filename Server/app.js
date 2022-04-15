const express = require("express");
const path = require('path');
const printRequestType = require('./middleware/requestType');
const app = express();

// Routes
const registerRoute = require('./routes/registerRouter');
const loginRoute = require('./routes/loginRouter');

// Configuración del servidor, puerto 3000
app.set('port', process.env.PORT || 3000); 

// parse form data
app.use(express.urlencoded({extended: false}))
// parse json
app.use(express.json())

// Llamada a midlewares
app.use(printRequestType);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

// Iniciar servidor
app.listen(app.get('port'), ()=>{
    console.log("Server on port ", app.get('port'))  //start server with the selected port
});
