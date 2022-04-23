const nodemailer = require('nodemailer');

// Información del email de origen
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tausch.email.token@gmail.com',
      pass: 'ytRg82ZJWPfgiLb'
    }
  });

const sendActivationEmail = async (user, token, email) => {
    
    if(typeof email === 'string' && email.length > 0){
        let emailOptions = {
            from: 'tausch.email.token@gmail.com',
            to: email,
            subject: 'Verificación de cuenta de Tausch',            
            html: `<p> Para activar su cuenta de Tausch acceda al siguiente enlace <hr/> <a href="http://localhost:3000/activate?user=${user}&token=${token}"> enlace de activación </a>`
        }

        await transporter.sendMail(emailOptions);
    }
    else{
        console.log("Error al enviar email");        
    }
}


module.exports = sendActivationEmail