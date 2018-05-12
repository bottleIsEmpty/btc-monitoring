const BitcoinInformer = require('./helpers/BitcoinInformer');
const config = require('./../config');
const sendEmail = require('./helpers/EmailSender');

// Время обновления (мс)
const updateInterval = config.updateInterval * 60 * 1000;
const informer = new BitcoinInformer();

console.log('Здравствуйте! Убедитесь, что Вы внесли все необходимые данные в файл config.js. А тем временем я начинаю работу...');

informer.on('courseUpdated', (newCourse) => {

    console.log(`Данные обновлены! Текущий курс составляет ${newCourse}`);

    let alreadySent = false;

    if (newCourse <= config.threshlold && !alreadySent) {
        console.log('Курс ниже установленного порога, уведомление отправлено!')
        sendEmail(newCourse);
        alreadySent = true;
    } else {
        alreadySent = false;
    }
});

// Выхов при запуске программы;
informer.updateCourse();

setInterval(() => {
    informer.updateCourse();
}, updateInterval);

