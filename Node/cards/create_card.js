import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const customersController = pagarme.CustomersController;

const customerRequest = new pagarme.CreateCustomerRequest();
customerRequest.name = 'sdk customer test';
customerRequest.email = 'tonystark@avengers.com';

const request = new pagarme.CreateCardRequest();
request.number = '4000000000000010';
request.holder_name = 'Tony Stark';
request.holder_document = '93095135270';
request.exp_month = 1;
request.exp_year = 25;
request.cvv = '351';
// Brand is Optional field and autodetected
request.brand = 'Mastercard';
request.private_label = false;
// Billing Address
request.billing_address = new pagarme.CreateAddressRequest();
request.billing_address.line_1 = '10880, Malibu Point, Malibu Central';
request.billing_address.line_2 = '7º floor';
request.billing_address.zip_code = '90265';
request.billing_address.city = 'Malibu';
request.billing_address.state = 'CA';
request.billing_address.country = 'US';
// Card Options: Verify OneDollarAuth
request.options = new pagarme.CreateCardOptionsRequest();
request.options.verify_card = true;

customersController
    .createCustomer(customerRequest)
    .then(customer => {
        console.log(`Customer Id: ${customer.id}`);
        return customersController.createCard(customer.id, request);
    })
    .then(card => {
        console.log(`Card Id: ${card.id}`);
        console.log(card.id);
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