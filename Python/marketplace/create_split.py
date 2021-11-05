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
customer.name = "sdk customer order"
customer.email = "tonystark@avengers.com"

credit_card = create_credit_card_payment_request.CreateCreditCardPaymentRequest()
credit_card.capture = True
credit_card.installments = 2
credit_card.statement_descriptor = "descriptor"
credit_card.card = create_card_request.CreateCardRequest()
credit_card.card.number = "4000000000000010"
credit_card.card.holder_name = "Tony Stark"
credit_card.card.exp_month = 1
credit_card.card.exp_year = 2025
credit_card.card.cvv = "123"

request = create_order_request.CreateOrderRequest()

request.items = [create_order_item_request.CreateOrderItemRequest()]
request.items[0].description = "Tesseract Bracelet"
request.items[0].quantity = 1
request.items[0].amount = 200000

request.payments = [create_payment_request.CreatePaymentRequest()]
request.payments[0].payment_method = "credit_card"
request.payments[0].credit_card = credit_card
request.customer = customer

request.payments[0].split = [create_split_request.CreateSplitRequest(),
                             create_split_request.CreateSplitRequest()]

request.payments[0].split[0].recipient_id = "rp_L4kwWE5FDuNdXYQP"
request.payments[0].split[0].amount = 100000
request.payments[0].split[0].mtype = "flat"

request.payments[0].split[1].recipient_id = "rp_4jl0ra2h3bI8VBvR"
request.payments[0].split[1].amount = 100000
request.payments[0].split[1].mtype = "flat"

try:
    result = orders_controller.create_order(request)
    assert result.status == "paid"
    print("Order id: ", result.id)
    print("Charge id: ", result.charges[0].id)
    print("Order result status: ", result.status)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex
    