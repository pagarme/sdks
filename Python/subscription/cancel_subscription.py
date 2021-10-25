from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.models import *
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

subscriptions_controller = subscriptions_controller.SubscriptionsController()

subscriptionId = "sub_2EvZ8GdFYZhXkbe4"

request = create_cancel_subscription_request.CreateCancelSubscriptionRequest()
request.cancel_pending_invoices = True

try:
    result = subscriptions_controller.cancel_subscription(request)
    assert result is not None
    assert result.status == "canceled"
    print("Subscription Id: ", result.id)
    print("Subscription status: ", result.status)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex