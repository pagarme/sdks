import pagarme from 'lib';

pagarme.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
pagarme.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

const customersController = pagarme.CustomersController;

const request = new pagarme.CreateCustomerRequest();
request.name = 'sdk customer test';
request.email = 'tonystark@avengers.com';
request.type = 'individual';
request.document = '55342561094';
request.code = 'MY_CUSTOMER_001';

request.address = new pagarme.CreateAddressRequest();
request.address.line_1 = '375, Av. General Justo, Centro';
request.address.line_2 = '8º andar';
request.address.zip_code = '20021130';
request.address.city = 'Rio de Janeiro';
request.address.state = 'RJ';
request.address.country = 'BR';
request.address.metadata = new pagarme.UpdateMetadataRequest();
request.address.metadata.id = 'my_address_id';

request.phones = new pagarme.CreatePhonesRequest();
request.phones.home_phone = new pagarme.CreatePhoneRequest();
request.phones.home_phone.area_code = '21';
request.phones.home_phone.country_code = '55';
request.phones.home_phone.number = '000000000';
request.phones.mobile_phone = new pagarme.CreatePhoneRequest();
request.phones.mobile_phone.area_code = '21';
request.phones.mobile_phone.country_code = '55';
request.phones.mobile_phone.number = '000000000';

customersController
    .createCustomer(request)
    .then(customer => {
        console.log(`Customer Id: ${customer.id}`);
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