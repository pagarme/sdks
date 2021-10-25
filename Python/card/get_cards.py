from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

customers_controller = customers_controller.CustomersController()

customerId = "cus_G6gwy4xtJIOyNbrK"

try:
    result = customers_controller.get_cards(customerId, 1, 30)
    assert result is not None
    assert result.data is not None

    if(result.data and result.data[0]):
        print("Card[0] id: ", result.data[0].id)
        print("Cards quantity in my wallet: ", result.paging.total)
    else:
        print("My wallet is empty")


except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex