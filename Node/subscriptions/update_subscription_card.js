import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const subscriptionsController = pagarme.SubscriptionsController;

const subscriptionId = 'sub_2EvZ8GdFYZhXkbe4';

const request = new pagarme.UpdateSubscriptionCardRequest();
request.card = new pagarme.CreateCardRequest();
request.card.number = '4532912167490007';
request.card.holderName = 'Tony Stark';
request.card.expMonth = 1;
request.card.expYear = 2028;
request.card.cvv = '123';
request.card.billingAddress = new pagarme.CreateAddressRequest();
request.card.billingAddress.line1 = '375  Av. General Justo  Centro';
request.card.billingAddress.line2 = '8º andar';
request.card.billingAddress.zipCode = '20021130';
request.card.billingAddress.city = 'Rio de Janeiro';
request.card.billingAddress.state = 'RJ';
request.card.billingAddress.country = 'BR';

subscriptionsController
    .updateSubscriptionCard(subscriptionId, request)
    .then(subscription => {
        console.log(`Card updated`);
        console.log(`Card Id: ${subscription.card.id}`);
        console.log(`First six digits: ${subscription.card.firstSixDigits}`);
        console.log(`Last four digits: ${subscription.card.lastFourDigits}`);
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