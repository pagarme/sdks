import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const ordersController = pagarme.OrdersController;

const customerRequest = new pagarme.CreateCustomerRequest();
customerRequest.name = 'sdk customer order';
customerRequest.email = 'tonystark@avengers.com';
customerRequest.type = 'individual';

creditCardRequest = new pagarme.CreateCreditCardPaymentRequest();
creditCardRequest.capture = true;
creditCardRequest.installments = 2;
creditCardRequest.statementDescriptor = 'descriptor';
creditCardRequest.card = new pagarme.CreateCardRequest();
creditCardRequest.card.number = '4000000000000010';
creditCardRequest.card.holderName = 'Tony Stark';
creditCardRequest.card.expMonth = 1;
creditCardRequest.card.expYear = 2025;
creditCardRequest.card.cvv = '123';

const orderRequest = new pagarme.CreateOrderRequest();

orderRequest.items = [new pagarme.CreateOrderItemRequest()];
orderRequest.items[0].description = 'Tesseract Bracelet';
orderRequest.items[0].quantity = 1;
orderRequest.items[0].amount = 200000;

orderRequest.payments = [new pagarme.CreatePaymentRequest()];
orderRequest.payments[0].paymentMethod = 'credit_card';
orderRequest.payments[0].creditCard = creditCardRequest;
orderRequest.customer = customerRequest;

orderRequest.payments[0].split = [
    new pagarme.CreateSplitRequest(),
    new pagarme.CreateSplitRequest()
];

orderRequest.payments[0].split[0].recipientId = 'rp_L4kwWE5FDuNdXYQP';
orderRequest.payments[0].split[0].amount = 100000;
orderRequest.payments[0].split[0].type = 'flat';

orderRequest.payments[0].split[1].recipientId = 'rp_4jl0ra2h3bI8VBvR';
orderRequest.payments[0].split[1].amount = 100000;
orderRequest.payments[0].split[1].type = 'flat';

ordersController
    .createOrder(orderRequest)
    .then(order => {
        console.log(`Order Id: ${order.id}`);
        console.log(`Charge Id: ${order.charges[0].id}`);
        console.log(`Order status: ${order.status}`);
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