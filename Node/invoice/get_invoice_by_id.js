import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const invoicesController = pagarme.InvoicesController;

const invoiceId = 'in_DKRdGqpsaVS4rmpl';

invoicesController
    .getInvoice(invoiceId)
    .then(invoice => {
        console.log(`InvoiceId: ${invoice.id}`);
        console.log(`Invoice status: ${invoice.status}`);
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