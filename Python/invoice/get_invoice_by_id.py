from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)


invoices_controller = invoices_controller.InvoicesController()

invoice_Id = "in_DKRdGqpsaVS4rmpl"

try:
    result = invoices_controller.get_invoice(invoice_Id)
    assert result is not None
    assert result.id is not None
    print("Invoice id: ", result.id)
    print("Invoice status: ", result.status)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex
    