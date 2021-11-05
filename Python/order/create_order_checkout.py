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
customer.name = "Tony Stark"
customer.email = "tonystark@avengers.com"

checkout = create_checkout_payment_request.CreateCheckoutPaymentRequest()
checkout.customer_editable = False
checkout.skip_checkout_success_page = True
checkout.accepted_payment_methods = ["credit_card", "boleto", "bank_transfer", "debit_card"]
checkout.accepted_multi_payment_methods = [["credit_card", "credit_card"], ["credit_card", "boleto"]]
checkout.success_url = "https://www.pagar.me"

# Bank transfer payment Setup
checkout.bank_transfer = create_checkout_bank_transfer_request.CreateCheckoutBankTransferRequest()
checkout.bank_transfer.bank = ["237", "001", "341"]

# Boleto Payment Setup
checkout.boleto = create_checkout_boleto_payment_request.CreateCheckoutBoletoPaymentRequest()
checkout.boleto.bank = "033"
checkout.boleto.instructions ="Pagar ate o vencimento"
checkout.boleto.due_at = "2021-07-25T00:00:00Z"

# Credit Card Payment Setup
checkout.credit_card = create_checkout_credit_card_payment_request.CreateCheckoutCreditCardPaymentRequest()
checkout.credit_card.capture = True
checkout.credit_card.statement_descriptor = "Descriptor example"
checkout.credit_card.installments = [ # Credit card installments Setup
    create_checkout_card_installment_option_request.CreateCheckoutCardInstallmentOptionRequest(),
    create_checkout_card_installment_option_request.CreateCheckoutCardInstallmentOptionRequest()]
# installment 1
checkout.credit_card.installments[0].number = 1
checkout.credit_card.installments[0].total = 2000
# installment 2 with extra tax of 500
checkout.credit_card.installments[1].number = 1
checkout.credit_card.installments[1].total = 2500

# Debit Card Payment Setup
checkout.debit_card = create_checkout_debit_card_payment_request.CreateCheckoutDebitCardPaymentRequest()
# Debit card Authentication Setup
checkout.debit_card.authentication = create_payment_authentication_request.CreatePaymentAuthenticationRequest()
checkout.debit_card.authentication.mtype = 'none'
checkout.debit_card.authentication.threed_secure = create_three_d_secure_request.CreateThreeDSecureRequest()
checkout.debit_card.authentication.threed_secure.mpi = "acquirer"
checkout.debit_card.authentication.threed_secure.success_url = "https://www.pagar.me"

request = create_order_request.CreateOrderRequest()
request.code = "test-SDK-python"
request.items = [create_order_item_request.CreateOrderItemRequest()]
request.items[0].description = "Tesseract Bracelet"
request.items[0].quantity = 1
request.items[0].amount = 2990

request.payments = [create_payment_request.CreatePaymentRequest()]
request.payments[0].amount = 2000
request.payments[0].payment_method = "checkout"
request.payments[0].checkout = checkout
request.customer = customer

try:
    result = get_order_response.GetOrderResponse()
    result.checkouts = [get_checkout_payment_response.GetCheckoutPaymentResponse()]
    result = orders_controller.create_order(request)
    print("Order id: ", result.id)
    print("Checkout id: ", result.checkouts[0].id)
    print("Order result status: ", result.status)
    print("Checkout payment url: ", result.checkouts[0].payment_url)
    assert result.status == "pending"
    assert result.checkouts[0].boleto is not None
    assert result.checkouts[0].credit_card is not None
    assert result.checkouts[0].debit_card is not None
    assert result.checkouts[0].bank_transfer is not None
    assert result.checkouts[0].payment_url is not None
except ErrorException as ex:
    print("\n")
    print("Error Message: ", ex.message)
    print("Status code Response: ", ex.response_code)
    if(ex.errors is not None):
        print("Errors: ", ex.errors)
except Exception as ex:
    raise ex
    