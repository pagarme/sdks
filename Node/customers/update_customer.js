import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const customersController = pagarme.CustomersController;

const customerId = 'cus_6l5dMWZ0hkHZ4XnE';
const request = new pagarme.UpdateCustomerRequest();
request.name = 'Peter Parker';
request.email = 'parker@avangers.com';
request.gender = 'male';

customersController
    .updateCustomer(customerId, request)
    .then(customer => {
        console.log(`Customer Id: ${customer.id}`);
        console.log(`New name: ${customer.name}`);
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