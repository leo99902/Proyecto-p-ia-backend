const nodemailer = require('nodemailer');
const ShippingPassword = require('./stiles/shipping-password');

const EMAIL_USER = 'aticeiproject@gmail.com';
const EMAIL_PASS = 'iiok xnnl vqid zudo';

function createTransporter() {

    return nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });
}

class MailSenderReset {

    constructor() {

        this.transporter = createTransporter();
    }

    process(recipientEmail, name, password) {

        console.log('MailSenderReset - process - enviando email');

        const options = {

            from: EMAIL_USER,
            to: recipientEmail,
            subject: 'Recuperación contraseña de el sistema ATI',
            html: ShippingPassword({ name, password })
        };

        this.transporter.sendMail(options, (error, info) => {

            if (error) {
                console.error('MailSenderReset - process - Error al enviar email', error);
                throw new Error(error);
            } else {
                console.log('MailSenderReset - process - Email sent:', info.response);
            }
        });
    }
}

module.exports = MailSenderReset;