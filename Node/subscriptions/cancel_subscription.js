import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const subscriptionsController = pagarme.SubscriptionsController;

const subscriptionId = 'sub_5wmVL3lfmyIAWAKn';

const request = new pagarme.CreateCancelSubscriptionRequest();
request.cancel_pending_invoices = true;

subscriptionsController
    .cancelSubscription(subscriptionId, request)
    .then(subscription => {
        console.log(`Subscription Id: ${subscription.id}`);
        console.log(`Subscription Status: ${subscription.status}`);
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