const {
    ApiClient,
    CreatePaymentRequest,
    PaymentsApi,
    Ptsv2paymentsClientReferenceInformation,
    Ptsv2paymentsOrderInformation,
    Ptsv2paymentsOrderInformationAmountDetails,
    Ptsv2paymentsOrderInformationBillTo,
    Ptsv2paymentsPaymentInformation,
    Ptsv2paymentsPaymentInformationCard,
    Ptsv2paymentsProcessingInformation
} = require('cybersource-rest-client');

const cybersourceConf = require('../../config/cybersource.config');

module.exports = class PaymentsService {
    #config = cybersourceConf;

    #apiClient = new ApiClient();
    #clientReferenceInformation = new Ptsv2paymentsClientReferenceInformation();
    #orderInformation = new Ptsv2paymentsOrderInformation();
    #orderInformationAmountDetails = new Ptsv2paymentsOrderInformationAmountDetails();
    #orderInformationBillTo = new Ptsv2paymentsOrderInformationBillTo();
    #paymentInformation = new Ptsv2paymentsPaymentInformation();
    #paymentInformationCard = new Ptsv2paymentsPaymentInformationCard();
    #paymentsApi = new PaymentsApi(this.#config, this.#apiClient);
    #processingInformation = new Ptsv2paymentsProcessingInformation();

    /**
     * @param {{
     *          cardNumber: string,
     *          expirationMonth: string,
     *          expirationYear: string
     * }} paymentInfo Represents the information of the card that will be used to make the payment.
     * @param {{
     *          totalAmount: string,
     *          currency: string
     * }} amountDetails Represents the information about the currency and total amount for transaction.
     * @param {{
     *          firstName: string,
     *          lastName: string,
     *          email: string,
     *          address1: string,
     *          locality: string,
     *          administrativeArea: string,
     *          postalCode: string,
     *          phoneNumber: string
     *          country: string,
     * }} billTo
     * @param {boolean} enableCapture Whether the server must allow capture of the payment or not.
     *
     * @description This function will send a request to CyberSource server to authorize the payment.
     *
     * `Important`: All parameters must be validated before calling this function.
     */
    authorizePayment(paymentInfo, amountDetails, billTo, enableCapture = false) {
        if (enableCapture) this.#processingInformation.capture = true;
        else this.#processingInformation.capture = false;

        const requestObject = new CreatePaymentRequest();

        this.#clientReferenceInformation.code = 'TC50171_3';

        this.#orderInformationAmountDetails.currency = amountDetails.currency;
        this.#orderInformationAmountDetails.totalAmount = amountDetails.totalAmount;

        this.#orderInformationBillTo.address1 = billTo.address1;
        this.#orderInformationBillTo.administrativeArea = billTo.administrativeArea;
        this.#orderInformationBillTo.country = billTo.country;
        this.#orderInformationBillTo.email = billTo.email;
        this.#orderInformationBillTo.firstName = billTo.firstName;
        this.#orderInformationBillTo.lastName = billTo.lastName;
        this.#orderInformationBillTo.locality = billTo.locality;
        this.#orderInformationBillTo.phoneNumber = billTo.phoneNumber;
        this.#orderInformationBillTo.postalCode = billTo.postalCode;

        this.#paymentInformationCard.cardNumber = paymentInfo.cardNumber;
        this.#paymentInformationCard.expirationMonth = paymentInfo.expirationMonth;
        this.#paymentInformationCard.expirationYear = paymentInfo.expirationYear;

        this.#orderInformation.amountDetails = this.#orderInformationAmountDetails;
        this.#orderInformation.billTo = this.#orderInformationBillTo;
        this.#paymentInformation.card = this.#paymentInformationCard;

        requestObject.clientReferenceInformation = this.#clientReferenceInformation;
        requestObject.orderInformation = this.#orderInformation;
        requestObject.paymentInformation = this.#paymentInformation;
        requestObject.processingInformation = this.#processingInformation;

        try {
            this.#paymentsApi.createPayment(requestObject, (error, data, response) => {
                if (error) console.log('Error:', JSON.stringify(error));
                if (data) console.log('Data:', JSON.stringify(data));

                console.log('Response:', JSON.stringify(response));
                console.log(
                    'Response Code of Process a Payment:',
                    JSON.stringify(response.status)
                );

                callback(error, data, response);
            });
        } catch (error) {
            console.log('Exception on calling the API:', error);
        }
    }
};
