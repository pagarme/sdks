import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const subscriptionsController = pagarme.SubscriptionsController;

const subscriptionId = 'sub_2EvZ8GdFYZhXkbe4';

subscriptionsController
    .getSubscription(subscriptionId)
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