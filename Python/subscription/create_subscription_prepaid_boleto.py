from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.models import *
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

subscriptions_controller = subscriptions_controller.SubscriptionsController()

request = create_subscription_request.CreateSubscriptionRequest()
request.payment_method = "credit_card"
request.currency = "BRL"
request.interval = "month"
request.interval_count = 3
request.billing_type = "prepaid"
request.installments = 3
request.gateway_affiliation_id = "C56A4180-65AA-42EC-A945-5FD21DEC0538"
request.minimum_price = 10000
request.boleto_due_days = 5

request.customer = create_customer_request.CreateCustomerRequest()
request.customer.name = "Tony Stark"
request.customer.email = "tonystark@avengers.com"

request.payment_method = "boleto"

request.discounts = [create_discount_request.CreateDiscountRequest()]
request.discounts[0].cycles = 3
request.discounts[0].value = 10
request.discounts[0].discount_type = "percentage"

request.increments = [create_increment_request.CreateIncrementRequest()]
request.increments[0].cycles = 2
request.increments[0].value = 20
request.increments[0].discount_type = "percentage"

request.items = [
    create_subscription_item_request.CreateSubscriptionItemRequest(),
    create_subscription_item_request.CreateSubscriptionItemRequest()]

request.items[0].description = "Musculação"
request.items[0].quantity = 1
request.items[0].pricing_scheme = create_pricing_scheme_request.CreatePricingSchemeRequest()
request.items[0].pricing_scheme.price = 18990

request.items[1].description = "Matrícula"
request.items[1].quantity = 1
request.items[1].cycles = 1
request.items[1].pricing_scheme = create_pricing_scheme_request.CreatePricingSchemeRequest()
request.items[1].pricing_scheme.price = 5990

try:
    result = subscriptions_controller.create_subscription(request)
    assert result is not None
    assert result.customer is not None
    assert result.boleto_due_days is not None
    assert result.discounts is not None
    assert result.discounts[0] is not None
    assert result.increments is not None
    assert result.increments[0] is not None
    assert len(result.items) == 2
    assert result.status == "active"
    assert result.billing_type == 'prepaid'
    print("Subscription Id: ", result.id)
    print("Subscription Status: ", result.status)
    print("Subscription Interval: ", result.interval)
    print("Subscription Boleto DueDays: ", result.boleto_due_days)
    print("Current cycle: ", result.current_cycle.id)
    print("Current cycle Status: ", result.current_cycle.status)
    print("Current cycle Start_At: ", result.current_cycle.start_at)
    print("Current cycle End_At: ", result.current_cycle.end_at)
    print("Current cycle Billing At: ", result.current_cycle.billing_at)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex