from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

customers_controller = customers_controller.CustomersController()

customerId = "cus_6l5dMWZ0hkHZ4XnE"

try:
    result = customers_controller.get_customer(customerId)
    assert result is not None
    assert customerId == result .id
    print("Customer id: ", result .id)
except ErrorException as ex:
    if ex.response_code == "404":
        print("Customer not found.")
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex