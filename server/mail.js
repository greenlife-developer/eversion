require('dotenv').config({
    path: './config/.env'
})

const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


const auth = {
    auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN_KEY
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: email,
        to: 'yemijoshua80@gmail.com',
        subject: subject,
        text: text 
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    })
}

module.exports = sendMail;