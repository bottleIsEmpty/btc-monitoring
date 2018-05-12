const informer = require('./helpers/BitcoinInformer');
const config = require('./../config');
const sendEmail = require('./helpers/EmailSender');

// Время обновления (мс)
const updateInterval = config.updateInterval * 60 * 1000;

console.log('Здравствуйте! Убедитесь, что Вы внесли все необходимые данные в файл config.js. А тем временем я начинаю работу...');

informer.on('exchangeRateUpdated', (newExchangeRate) => {

    console.log(`Данные обновлены! Текущий курс составляет ${newExchangeRate}`);

    let alreadySent = false;

    if (newExchangeRate <= config.threshlold && !alreadySent) {
        console.log('Курс ниже установленного порога, уведомление отправлено!')
        sendEmail(newExchangeRate);
        alreadySent = true;
    } else {
        alreadySent = false;
    }
});

// Выхов при запуске программы;
informer.updateExchangeRate();

setInterval(() => {
    informer.updateExchangeRate();
}, updateInterval);

