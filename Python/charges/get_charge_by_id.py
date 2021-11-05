from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

charges_controller = charges_controller.ChargesController()

charge_Id = "ch_8YQ1JeTLzF8zlqWy"

try:
    result = charges_controller.get_charge(charge_Id)
    assert result is not None
    assert result.id == charge_Id
    print("Charge found!")
    print("Charge_Id: ", result.id)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex
    