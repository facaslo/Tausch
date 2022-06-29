const nodemailer = require('nodemailer');
const {google} = require('googleapis')

const CLIENT_ID = '456307078252-76g5t7kt27rd1j1oobk3v10rduj24jku.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04pkbyPd8jXqICgYIARAAGAQSNwF-L9Ir3Dx_rT31rK5mwvlMNY4hpa2vlT1eEqcCcAmSWSx5KG19wRA2flpKAHJCcATk0mRp18c'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})



const sendActivationEmail = async (user, token, email) => {
    const accessToken = await oAuth2Client.getAccessToken()

    console.log('entra')
    // Información del email de origen
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        type: 'OAuth2',
        user: 'tausch.email.token@gmail.com ',
        clientId : CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken : accessToken
        } 
    })
    
    if(typeof email === 'string' && email.length > 0){
        try{
            let emailOptions = {
                from: 'tausch.email.token@gmail.com',
                to: email,
                subject: 'Verificación de cuenta de Tausch',            
                html: `<p> Para activar su cuenta de Tausch acceda al siguiente enlace <hr/> <a href="http://localhost:3000/activacion?user=${user}&token=${token}"> enlace de activación </a>`
            }
    
            const result = await transporter.sendMail(emailOptions);
            await console.log(result)
        }
        catch (e){
            console.log(e)
        }        
    }
    
}


// (async function(){
//     await sendActivationEmail('facaslo', 'hola ',  'facaslo.99@gmail.com');
// })();



module.exports = sendActivationEmail