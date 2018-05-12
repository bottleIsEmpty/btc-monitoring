module.exports = {

    //Источник информации о курсе BTC
    source: {
        url: 'https://blockchain.info/ru/ticker'
    },

    // Настройки SMTP-сервера
    SMTPSettings: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "c0577e2f61b145",
            pass: "40478af74154b4"
        }
    },

    // Порог, ниже которого будут приходить оповещения 
    threshlold: 5300,

    // Email, на который будут приходить оповещения
    destinationEmail: 'sasha.bobcko@gmail.com',

    // Интервал проверки (минут)
    updateInterval: 60
}