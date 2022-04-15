const getUserInfoFromDB = require('../models/getUserInfo');
const nodemailer = require('nodemailer');

// Información del email de origen
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tausch.email.token@gmail.com',
      pass: 'ytRg82ZJWPfgiLb'
    }
  });

const sendEmail = async (user) => {
    const userObject = await getUserInfoFromDB(user);    
    if(userObject){
        let emailOptions = {
            from: 'tausch.email.token@gmail.com',
            to: `${userObject[0].email}`,
            subject: 'Verificación de cuenta de Tausch',
            text: 'Este es un email de prueba'
        }

        await transporter.sendMail(emailOptions);
    }
    else{
        console.log("Error al enviar email");
        console.log(userObject);
    }
}

sendEmail('prueba');