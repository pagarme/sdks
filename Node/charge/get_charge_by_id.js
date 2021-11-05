import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const chargesController = pagarme.ChargesController;

const chargeId = 'ch_8YQ1JeTLzF8zlqWy';

chargesController
    .getCharge(chargeId)
    .then(charge => {
        console.log('Charge found!');
        console.log(`Charge Id: ${charge.id}`);
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