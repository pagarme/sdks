import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const plansController = pagarme.PlansController;

const request = new pagarme.CreatePlanRequest();
request.name = 'Plano Gold';
request.currency = 'BRL';
request.interval = 'month';
request.intervalCount = 3;
request.billingType = 'prepaid';
request.minimum_price = 10000;
request.installments = [3];
request.paymentMethods = ['credit_card', 'boleto'];
request.items = [
    new pagarme.CreatePlanItemRequest(),
    new pagarme.CreatePlanItemRequest()
];
// Plan Item 1
request.items[0].name = 'Musculação';
request.items[0].quantity = 1;
request.items[0].pricingScheme = new pagarme.CreatePricingSchemeRequest();
request.items[0].pricingScheme.price = 18990;
request.items[0].price = 18990;
// Plan Item 2
request.items[1].name = 'Matrícula';
// Matrícula ira cobrar apenas 1 vez. Após a primeira cobrança, nao será mais cobrado
request.items[1].cycles = 1;
request.items[1].quantity = 1;
request.items[1].price = 18990;
request.items[1].pricingScheme = new pagarme.CreatePricingSchemeRequest();
request.items[1].pricingScheme.price = 5990;

plansController
    .createPlan(request)
    .then(order => {
        console.log(`Plan Id: ${order.id}`);
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