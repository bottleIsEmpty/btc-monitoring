const https = require('https');
const EventEmmiter = require('events');
const config = require('./../../config');

class BitcoinInformer extends EventEmmiter {

    constructor() {
        super();
        this.sourceURL = config.source.url;
    }

    updateCourse() {
        let req = https.get(this.sourceURL, (res) => {

            let response = '';

            res.on('data', (chunk) => {
                response += chunk;
            });
            
            res.on('end', () => {
                response = JSON.parse(response);
                this.currentCourse = response.USD.last;

                this.emit('courseUpdated', response.USD.last);
            });
        });

        req.on('error', (err) => {
            throw new Error(err);
        });
    }
}

module.exports = BitcoinInformer;