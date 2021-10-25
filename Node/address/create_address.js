import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const customersController = pagarme.CustomersController;

const customerId = 'cus_G6gwy4xtJIOyNbrK';

const request = new pagarme.CreateAddressRequest();
request.line_1 = '10880, Malibu Point, Malibu Central';
request.line_2 = '7º floor';
request.zip_code = '90265';
request.city = 'Malibu';
request.state = 'CALIFORNIA';
request.country = 'US';
request.metadata = new pagarme.UpdateMetadataRequest();
request.metadata.id = 'my_address_id';

customersController
    .createAddress(customerId, request)
    .then(address => {
        console.log(`Address Id: ${address.id}`);
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