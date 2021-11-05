import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const subscriptionsController = pagarme.SubscriptionsController;

const request = new pagarme.CreateSubscriptionRequest();
request.paymentMethod = 'credit_card';
request.currency = 'BRL';
request.interval = 'month';
request.intervalCount = 3;
request.billingType = 'prepaid';
request.installments = 3;
request.gatewayAffiliationId = 'C56A4180-65AA-42EC-A945-5FD21DEC0538';
request.minimumPrice = 10000;
request.boletoDueDays = 5;

request.customer = new pagarme.CreateCustomerRequest();
request.customer.name = 'Tony Stark';
request.customer.email = 'tonystark@avengers.com';

request.card = new pagarme.CreateCardRequest();
request.card.holderName = 'Tony Stark';
request.card.number = '4000000000000010';
request.card.expMonth = 1;
request.card.expYear = 26;
request.card.cvv = '903';
request.card.billingAddress = new pagarme.CreateAddressRequest();
request.card.billingAddress.line1 = '375  Av. General Justo  Centro';
request.card.billingAddress.line2 = '8º andar';
request.card.billingAddress.zipCode = '20021130';
request.card.billingAddress.city = 'Rio de Janeiro';
request.card.billingAddress.state = 'RJ';
request.card.billingAddress.country = 'BR';

request.discounts = [new pagarme.CreateDiscountRequest()];
request.discounts[0].cycles = 3;
request.discounts[0].value = 10;
request.discounts[0].discountType = 'percentage';

request.increments = [new pagarme.CreateIncrementRequest()];
request.increments[0].cycles = 2;
request.increments[0].value = 20;
request.increments[0].discountType = 'percentage';

request.items = [
    new pagarme.CreateSubscriptionItemRequest(),
    new pagarme.CreateSubscriptionItemRequest()
];

request.items[0].description = 'Musculação';
request.items[0].quantity = 1;
request.items[0].pricingScheme = new pagarme.CreatePricingSchemeRequest();
request.items[0].pricingScheme.price = 18990;

request.items[1].description = 'Matrícula';
request.items[1].quantity = 1;
request.items[1].cycles = 1;
request.items[1].pricingScheme = new pagarme.CreatePricingSchemeRequest();
request.items[1].pricingScheme.price = 5990;

subscriptionsController
    .createSubscription(request)
    .then(subscription => {
        console.log(`Subscription Id: ${subscription.id}`);
        console.log(`Subscription Status: ${subscription.status}`);
        console.log(`Subscription Interval: ${subscription.interval}`);
        console.log(
            `Subscription Boleto DueDays: ${subscription.boletoDueDays}`
        );
        console.log(`Subscription Cycle: ${subscription.currentCycle.id}`);
        console.log(
            `Subscription Cycle status: ${subscription.currentCycle.status}`
        );
        console.log(
            `Subscription Cycle StartAt: ${subscription.currentCycle.startAt}`
        );
        console.log(
            `Subscription Cycle EndAt: ${subscription.currentCycle.endAt}`
        );
        console.log(
            `Subscription Cycle BillingAt: ${
                subscription.currentCycle.billingAt
            }`
        );
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