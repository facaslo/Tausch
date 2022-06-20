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
const deletePublicationRoute = require('./routes/deletePublicationRoute')
const getPublicationListRoute = require('./routes/getPublicationListRoute')
const publicationRouter = require('./routes/publicationRouter')
const userPostsRoute = require('./routes/userPostsRoute')
const newOfferRouter = require('./routes/newOfferRouter')
const offersToUserRoute = require('./routes/offersToUserRoute')// son las ofertas que salen en la campana, ahora devuelven el id_propuesta
const editProfileRoute = require('./routes/editProfileRoute')
const getUserBartersRoute = require('./routes/getUserBartersRoute')
const getOffersRoute = require('./routes/getOffersRoute')// son las ofertas en detalle que van a /offers en el front (tal vez sea bueno cambiar los nombres)
const declineOfferRoute = require('./routes/declineOfferRoute')
const acceptOfferRoute = require('./routes/acceptOfferRoute')
const inactivatePostRoute = require('./routes/inactivatePostRoute')
const confAsProponentRoute = require('./routes/confAsProponentRoute')
const confAsReceptorRoute = require('./routes/confAsReceptorRoute')

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
app.use('/delete-post', deletePublicationRoute);
app.use('/publication_list', getPublicationListRoute);
app.use('/publication',publicationRouter);
app.use('/user-posts', userPostsRoute)
app.use('/new-offer', newOfferRouter);
app.use('/offers-to-user', offersToUserRoute)
app.use('/edit-profile', editProfileRoute)
app.use('/user-barters', getUserBartersRoute)
app.use('/all-offers', getOffersRoute)
app.use('/decline-offer', declineOfferRoute)
app.use('/accept-offer', acceptOfferRoute)
app.use('/inactivate-post', inactivatePostRoute)
app.use('/conf-proponent', confAsProponentRoute)
app.use('/conf-receptor', confAsReceptorRoute)

// Iniciar servidor solo si no es un test
if(process.env.NODE_ENV !== 'test'){
    app.listen(app.get('port'), ()=>{
        console.log("Server on port ", app.get('port'))  //start server with the selected port
    })
}

// exportar el app.js para usarlo en las pruebas
module.exports = app
