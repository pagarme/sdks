import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const ordersController = pagarme.OrdersController;

const customerRequest = new pagarme.CreateCustomerRequest();
customerRequest.name = 'Tony Stark';
customerRequest.email = 'tonystark@avengers.com';

const checkoutRequest = new pagarme.CreateCheckoutPaymentRequest();
checkoutRequest.customerEditable = false;
checkoutRequest.skipCheckoutSuccessPage = true;
checkoutRequest.acceptedPaymentMethods = [
    'credit_card',
    'boleto',
    'bank_transfer',
    'debit_card'
];
checkoutRequest.acceptedMultiPaymentMethods = [
    ['credit_card', 'credit_card'],
    ['credit_card', 'boleto']
];
checkoutRequest.successUrl = 'https://www.pagarme.com';

// Bank transfer payment Setup
checkoutRequest.bankTransfer = new pagarme.CreateCheckoutBankTransferRequest();
checkoutRequest.bankTransfer.bank = ['237', '001', '341'];

// Boleto Payment Setup
checkoutRequest.boleto = new pagarme.CreateCheckoutBoletoPaymentRequest();
checkoutRequest.boleto.bank = '033';
checkoutRequest.boleto.instructions = 'Pagar ate o vencimento';
checkoutRequest.boleto.dueAt = '2021-07-25T00:00:00Z';

// Credit Card Payment Setup
checkoutRequest.creditCard = new pagarme.CreateCheckoutCreditCardPaymentRequest();
checkoutRequest.creditCard.capture = true;
checkoutRequest.creditCard.statementDescriptor = 'Descriptor example';
checkoutRequest.creditCard.installments = [
    // Credit card installments Setup
    new pagarme.CreateCheckoutCardInstallmentOptionRequest(),
    new pagarme.CreateCheckoutCardInstallmentOptionRequest()
];
// installment 1
checkoutRequest.creditCard.installments[0].number = 1;
checkoutRequest.creditCard.installments[0].total = 2000;
// installment 2 with extra tax of 500
checkoutRequest.creditCard.installments[1].number = 1;
checkoutRequest.creditCard.installments[1].total = 2500;

// Debit Card Payment Setup
checkoutRequest.debitCard = new pagarme.CreateCheckoutDebitCardPaymentRequest();
// Debit card Authentication Setup
checkoutRequest.debitCard.authentication = new pagarme.CreatePaymentAuthenticationRequest();
checkoutRequest.debitCard.authentication.type = 'threed_secure';
checkoutRequest.debitCard.authentication.threedSecure = new pagarme.CreateThreeDSecureRequest();
checkoutRequest.debitCard.authentication.threedSecure.mpi = 'acquirer';
checkoutRequest.debitCard.authentication.threedSecure.successUrl =
    'https://www.pagarme.com';

const request = new pagarme.CreateOrderRequest();
request.code = 'test-SDK-NodeJS';
request.items = [new pagarme.CreateOrderItemRequest()];
request.items[0].description = 'Tesseract Bracelet';
request.items[0].quantity = 1;
request.items[0].amount = 2990;

request.payments = [new pagarme.CreatePaymentRequest()];
request.payments[0].amount = 2000;
request.payments[0].paymentMethod = 'checkout';
request.payments[0].checkout = checkoutRequest;
request.customer = customerRequest;

ordersController
    .createOrder(request)
    .then(order => {
        console.log(`Order Id: ${order.id}`);
        console.log(`Checkout Id: ${order.checkouts[0].id}`);
        console.log(`Order status: ${order.status}`);
        console.log(`Checkout payment url: ${order.checkouts[0].paymentUrl}`);
    })
    .catch(error => {
        console.log(`Status Code: ${error.errorCode}`);
        if (error.errorResponse instanceof pagarme.ErrorException) {
            console.log(error.errorResponse.message);
            console.log(error.errorResponse.errors);
        } else {
            throw error;
        }
    });