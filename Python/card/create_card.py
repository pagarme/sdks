from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.models import *
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

customers_controller = customers_controller.CustomersController()


customer = create_customer_request.CreateCustomerRequest()
customer.name = "sdk customer test"
customer.email = "tonystark@avengers.com"

request = create_card_request.CreateCardRequest()

request.number = "4000000000000010"
request.holder_name = "Tony Stark"
request.holder_document = "93095135270"
request.exp_month = 1
request.exp_year = 25
request.cvv = "351"
# Brand is Optional field and autodetected
request.brand = "Mastercard"
request.private_label = False
# Billing Address
request.billing_address = create_address_request.CreateAddressRequest()
request.billing_address.line_1 = "10880, Malibu Point, Malibu Central"
request.billing_address.line_2 = "7º floor"
request.billing_address.zip_code = "90265"
request.billing_address.city = "Malibu"
request.billing_address.state = "CA"
request.billing_address.country = "US"
# Card Options: Verify OneDollarAuth
request.options = create_card_options_request.CreateCardOptionsRequest()
request.options.verify_card = True

try:
    createdCustomer = customers_controller.create_customer(customer)
    result = customers_controller.create_card(createdCustomer.id, request)
    assert createdCustomer is not None
    assert result is not None
    print("Customer id: ", createdCustomer.id)
    print("Card id: ", result.id)

except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex

