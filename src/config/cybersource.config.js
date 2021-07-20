require('dotenv').config();

const { AUTHENTICATION_TYPE, MERCHANT_ID, RUN_ENVIRONMENT } = process.env;

const cybersourceConf = {
    authenticationType: AUTHENTICATION_TYPE,
    enableLog: true,
    merchantID: MERCHANT_ID,
    runEnvironment: RUN_ENVIRONMENT
};

module.exports = cybersourceConf;
