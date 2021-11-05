import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const ordersController = pagarme.OrdersController;

const customerRequest = new pagarme.CreateCustomerRequest();
customerRequest.name = 'sdk customer order';
customerRequest.email = 'tonystark@avengers.com';

const debitCardRequest = new pagarme.CreateDebitCardPaymentRequest();
debitCardRequest.statementDescriptor = 'test descriptor';
debitCardRequest.card = new pagarme.CreateCardRequest();
debitCardRequest.card.number = '4000000000000010';
debitCardRequest.card.holderName = 'Tony Stark';
debitCardRequest.card.expMonth = 1;
debitCardRequest.card.expYear = 2025;
debitCardRequest.card.cvv = '123';

const request = new pagarme.CreateOrderRequest();

request.items = [new pagarme.CreateOrderItemRequest()];
request.items[0].description = 'Tesseract Bracelet';
request.items[0].quantity = 3;
request.items[0].amount = 1490;

request.payments = [new pagarme.CreatePaymentRequest()];
request.payments[0].paymentMethod = 'debit_card';
request.payments[0].debitCard = debitCardRequest;
request.customer = customerRequest;

ordersController
    .createOrder(request)
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