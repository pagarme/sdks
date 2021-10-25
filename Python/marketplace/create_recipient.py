from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.models import *
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

recipients_controller = recipients_controller.RecipientsController()

request = create_recipient_request.CreateRecipientRequest()
request.name = "Tony Stark"
request.email = "tstark@mundipagg.com"
request.description = "Recebedor tony stark"
request.document = "26224451990"
request.mtype = "individual"
request.default_bank_account = create_bank_account_request.CreateBankAccountRequest()
request.default_bank_account.holder_name = "Tony Stark"
request.default_bank_account.holder_type = "individual"
request.default_bank_account.holder_document = "26224451990"
request.default_bank_account.bank = "341"
request.default_bank_account.branch_number = "12345"
request.default_bank_account.branch_check_digit = "6"
request.default_bank_account.account_number = "12345"
request.default_bank_account.account_check_digit = "6"
request.default_bank_account.mtype = "checking"

try:
    result = recipients_controller.create_recipient(request)
    assert result is not None
    print("Recipient Id on mundipagg: ", result.id)
    print("Recipient Id on Pagar.me: ", result.gateway_recipients[0].pgid)
    print("Recipient default_bank_account id: ",  result.default_bank_account.id)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex