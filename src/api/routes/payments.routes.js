const { Router } = require('express');

const PaymentsService = require('../services/payments.service');

const paymentsRouter = Router();
const paymentsService = new PaymentsService();

paymentsRouter.route('/pay').post((req, res) => {
    if (!req.body) return res.send('All needed arguments are missing!');
    if (
        typeof req.body.paymentInfo === 'undefined' ||
        typeof req.body.amountDetails === 'undefined' ||
        typeof req.body.billTo === 'undefined'
    )
        return res.send('One of more needed arguments are missing!');

    const { amountDetails, billTo, paymentInfo } = req.body;

    if (!amountDetails || !billTo || !paymentInfo)
        return res.send('One or more needed arguments have falsy values!');

    paymentsService.authorizePayment(paymentInfo, amountDetails, billTo);
});

module.exports = paymentsRouter;
