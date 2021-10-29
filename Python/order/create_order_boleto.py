from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.models import *
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

orders_controller = orders_controller.OrdersController()

customer = create_customer_request.CreateCustomerRequest()
customer.name = "sdk customer test"
customer.email = "tonystark@avengers.com"
customer.address = create_address_request.CreateAddressRequest()
customer.address.street = "Malibu Point"
customer.address.number = "10880"
customer.address.zip_code = "90265"
customer.address.neighborhood = "Central Malibu"
customer.address.city = "Malibu"
customer.address.state = "CA"
customer.address.country = "US"

boleto = create_boleto_payment_request.CreateBoletoPaymentRequest()
boleto.bank = "033"
boleto.instructions = "Pagar até o vencimento"
boleto.due_at = '2019-12-31T00:00:00Z'

request = create_order_request.CreateOrderRequest()

request.items = [create_order_item_request.CreateOrderItemRequest()]
request.items[0].description = "Tesseract Bracelet"
request.items[0].quantity = 3
request.items[0].amount = 1490

request.payments = [create_payment_request.CreatePaymentRequest()]
request.payments[0].payment_method = "boleto"
request.payments[0].boleto = boleto
request.customer = customer

try:
    result = orders_controller.create_order(request)
    assert result.status == "pending"
    assert result.charges[0].status == "pending"
    assert result.charges[0].last_transaction.success is True
    assert result.charges[0].last_transaction.status == "generated"
    assert result.charges[0].last_transaction.url is not None
    assert result.charges[0].last_transaction.bank is not None
    assert result.charges[0].last_transaction.pdf is not None
    assert result.charges[0].last_transaction.instructions is not None
    print("Order id: ", result.id)
    print("Order result status: ", result.status)
    print("Boleto pdf: ", result.charges[0].last_transaction.pdf)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex
    