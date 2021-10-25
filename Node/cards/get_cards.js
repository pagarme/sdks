import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const customersController = pagarme.CustomersController;

const customerId = 'cus_G6gwy4xtJIOyNbrK';

customersController
    .getCards(customerId, 1, 30)
    .then(response => {
        if (response.data.length === 0) {
            console.log('My wallet is empty');
        } else {
            for (const card of response.data) {
                console.log(`Card Id: ${card.id}`);
            }
            console.log(
                `Cards quantity in my wallet: ${response.paging.total}`
            );
        }
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