from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.models import *
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

recipients_controller = recipients_controller.RecipientsController()

request = create_anticipation_request.CreateAnticipationRequest()
request.amount = 10000
request.timeframe = "start"
request.payment_date = "2020-12-12"

recipientId = "rp_RElaP4NMCJu08V9m"

try:
    result = recipients_controller.create_anticipation(recipientId, request)
    assert result is not None
    assert result.id is not None
    print("Anticipation id: ", result.id)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex