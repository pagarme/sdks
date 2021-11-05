from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.models import *
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

customers_controller = customers_controller.CustomersController()

request = update_customer_request.UpdateCustomerRequest()
request.name = "Peter Parker"
request.email = "parker@avangers.com"
request.gender = "male"

customer_Id = "cus_6l5dMWZ0hkHZ4XnE"

try:
    result = customers_controller.update_customer(customer_Id, request)
    assert result is not None
    assert result.name == request.name
    assert result.email == request.email
    assert result.gender == request.gender
    print("Customer id: ", result.id)
    print("New name: ", result.name)

except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex
