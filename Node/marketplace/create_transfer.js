import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const recipientsController = pagarme.RecipientsController;

const request = new pagarme.CreateTransferRequest();
request.amount = 100;

recipientsController
    .createTransfer('rp_RElaP4NMCJu08V9m', request)
    .then(transfer => {
        console.log(`Transfer Id: ${transfer.id}`);
        console.log(`Transfer status: ${transfer.status}`);
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