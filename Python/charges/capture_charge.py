from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.models import *
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

charges_controller = charges_controller.ChargesController()

chargeId = "ch_8YQ1JeTLzF8zlqWy"
request = create_capture_charge_request.CreateCaptureChargeRequest()
request.code = "new_code"

try:
    result = charges_controller.capture_charge(chargeId, request)
    assert result is not None
    assert result.paid_amount == result.amount
    assert result.status == "paid"
    assert result.last_transaction.status == "captured"
    print("Captured amount: ", result.paid_amount)
    print("Charge status: ", result.status)
    print("Last Transaction status: ", result.last_transaction.status)
    print("Charge is captured")
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex