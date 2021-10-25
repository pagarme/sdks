import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const recipientsController = pagarme.RecipientsController;

const request = new pagarme.CreateRecipientRequest();
request.name = 'Tony Stark';
request.email = 'tstark@pagarme.com';
request.description = 'Recebedor tony stark';
request.document = '26224451990';
request.type = 'individual';
request.defaultBankAccount = new pagarme.CreateBankAccountRequest();
request.defaultBankAccount.holderName = 'Tony Stark';
request.defaultBankAccount.holderType = 'individual';
request.defaultBankAccount.holderDocument = '26224451990';
request.defaultBankAccount.bank = '341';
request.defaultBankAccount.branchNumber = '12345';
request.defaultBankAccount.branchCheckDigit = '6';
request.defaultBankAccount.accountNumber = '12345';
request.defaultBankAccount.accountCheckDigit = '6';
request.defaultBankAccount.type = 'checking';

recipientsController
    .createRecipient(request)
    .then(recipient => {
        console.log(`Recipient Id: ${recipient.id}`);
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