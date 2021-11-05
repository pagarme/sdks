import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const ordersController = pagarme.OrdersController;

const customerRequest = new pagarme.CreateCustomerRequest();
customerRequest.name = 'sdk customer order';
customerRequest.email = 'tonystark@avengers.com';

const creditCardRequest = new pagarme.CreateCreditCardPaymentRequest();
creditCardRequest.capture = true;
creditCardRequest.installments = 2;
creditCardRequest.card = new pagarme.CreateCardRequest();
creditCardRequest.card.number = '4000000000000010';
creditCardRequest.card.holderName = 'Tony Stark';
creditCardRequest.card.expMonth = 1;
creditCardRequest.card.expYear = 2025;
creditCardRequest.card.cvv = '123';

const request = new pagarme.CreateOrderRequest();

request.items = [new pagarme.CreateOrderItemRequest()];
request.items[0].description = 'Tesseract Bracelet';
request.items[0].quantity = 3;
request.items[0].amount = 1490;

request.payments = [new pagarme.CreatePaymentRequest()];
request.payments[0].paymentMethod = 'credit_card';
request.payments[0].creditCard = creditCardRequest;
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