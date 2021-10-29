from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.models import *
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

plans_controller = plans_controller.PlansController()

request = create_plan_request.CreatePlanRequest()
request.name = "Plano Gold"
request.currency = "BRL"
request.interval = "month"
request.interval_count = 3
request.billing_type = "prepaid"
request.minimum_price = 10000
request.installments = [3]
request.payment_methods = ["credit_card", "boleto"]
request.items = [create_plan_item_request.CreatePlanItemRequest(), create_plan_item_request.CreatePlanItemRequest()]
# Plan Item 1
request.items[0].name = "Musculação"
request.items[0].quantity = 1
request.items[0].pricing_scheme = create_pricing_scheme_request.CreatePricingSchemeRequest()
request.items[0].pricing_scheme.price = 18990
request.items[0].price = 18990
# Plan Item 2
request.items[1].name = "Matrícula"
# Matrícula ira cobrar apenas 1 vez. Após a primeira cobrança, nao será mais cobrado
request.items[1].cycles = 1
request.items[1].quantity = 1
request.items[1].pricing_scheme
request.items[1].price = 18990
request.items[1].pricing_scheme = create_pricing_scheme_request.CreatePricingSchemeRequest()
request.items[1].pricing_scheme.price = 5990

try:
    result = plans_controller.create_plan(request)
    assert result is not None
    print("Plan Id: ", result.id)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex
    