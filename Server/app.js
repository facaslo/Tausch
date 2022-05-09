const express = require("express");
const path = require('path');
const cors = require('cors');
const printRequestType = require('./middleware/requestType');
const app = express();

// Routes
const registerRoute = require('./routes/registerRouter');
const loginRoute = require('./routes/loginRouter');
const activationRoute = require('./routes/accountActivation');
const newPublicationRoute = require('./routes/newPublicationRoute')

// Configuración del servidor, puerto 3080
app.set('port', process.env.PORT || 3080); 

//Cross origin resource sharing
app.use(cors());
// parse form data
app.use(express.urlencoded({extended: false}))
// parse json
app.use(express.json())

// Llamada a midlewares
app.use(printRequestType);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/activate', activationRoute);
app.use('/new-post', newPublicationRoute);

// Iniciar servidor
app.listen(app.get('port'), ()=>{
    console.log("Server on port ", app.get('port'))  //start server with the selected port
});
