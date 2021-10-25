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

voucher = create_voucher_payment_request.CreateVoucherPaymentRequest()
voucher.capture = True
voucher.installments = 2
voucher.statement_descriptor = "test descriptor"
voucher.card = create_card_request.CreateCardRequest()
voucher.card.number = "4000000000000010"
voucher.card.holder_name = "Tony Stark"
voucher.card.exp_month = 1
voucher.card.exp_year = 2025
voucher.card.cvv = "123"

request = create_order_request.CreateOrderRequest()

request.items = [create_order_item_request.CreateOrderItemRequest()]
request.items[0].description = "Tesseract Bracelet"
request.items[0].quantity = 3
request.items[0].amount = 1490

request.payments = [create_payment_request.CreatePaymentRequest()]
request.payments[0].payment_method = "voucher"
request.payments[0].voucher = voucher
request.customer = customer

try:
    result = orders_controller.create_order(request)
    assert result.status == "paid"
    print("Order id: ", result.id)
    print("Order result status: ", result.status)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex
