from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.models import *
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

charges_controller = charges_controller.ChargesController()

charge_Id = "ch_4PAVPy2tAuxxq1aX"
request = create_cancel_charge_request.CreateCancelChargeRequest()
request.code = "calcel_total_operation"

try:
    result = charges_controller.cancel_charge(charge_Id, request)
    assert result is not None
    assert result.canceled_amount is not None
    assert result.canceled_amount == result.paid_amount
    assert result.status == "canceled"
    assert result.last_transaction.status == "refunded"
    assert result.order.status == "canceled"
    print("Canceled amount: ", result.canceled_amount)
    print("Charge status: ", result.status)
    print("Last transaction status: ", result.last_transaction.status)
    print("Charge is total canceled.")
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex
    