import pagarme from 'lib';
import moment from 'moment';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const recipientsController = pagarme.RecipientsController;

const request = new pagarme.CreateAnticipationRequest();
request.amount = 1000;
request.timeframe = 'start';
request.paymentDate = moment(new Date(2020, 12, 12));

const recipientId = 'rp_RElaP4NMCJu08V9m';

recipientsController
    .createAnticipation(recipientId, request)
    .then(anticipation => {
        console.log(`Anticipation Id: ${anticipation.id}`);
    })
    .catch(error => {
        console.log(`StatusCode: ${error.errorCode}`);
        if (error.errorResponse instanceof pagarme.ErrorException) {
            console.log(error.errorResponse.message);
            console.log(error.errorResponse.errors);
        } else {
            throw error;
        }
    });