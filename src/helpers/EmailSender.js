const nodemailer = require('nodemailer');
const config = require('./../../config');

let transporter = nodemailer.createTransport(config.SMTPSettings);

function sendEmail(course, threshold = config.threshlold) {
    let emailOptions = {
        from: config.senderEmail, 
        to: config.destinationEmail, 
        subject: `Курс Bitcoin на ${new Date().toLocaleString('ru-RU')}`,
        text: `Внимание! Курс BTC упал ниже ${threshold}! Текущий курс: ${course}! Не упустите свой шанс!`,
        html: `<div>
            <p><b>Внимание!</b></p>
            <p>
                Курс BTC упал ниже <span style="color: red">${threshold}</span>!
                Текущий курс: <span style="color: red">${course}</span>
            </p>
            <p>
                Не упустите свой шанс!
            </p>
        </div>`
    };

    transporter.sendMail(emailOptions, (err, info) => {
        if (err) {
            throw new Error(err);
        }

        console.log(info);
    })
}

module.exports = sendEmail;
