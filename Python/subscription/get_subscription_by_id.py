from pagarmecoreapi.pagarmecoreapi_client import PagarmecoreapiClient
from pagarmecoreapi.controllers import *
from pagarmecoreapi.exceptions.error_exception import *

# Configuration parameters and credentials
basic_auth_user_name = 'basic_auth_user_name' # The username to use with basic authentication
basic_auth_password = 'basic_auth_password' # The password to use with basic authentication

PagarmecoreapiClient(basic_auth_user_name, basic_auth_password)

subscriptions_controller = subscriptions_controller.SubscriptionsController()

subscription_Id = "sub_2EvZ8GdFYZhXkbe4"

try:
    result = subscriptions_controller.get_subscription(subscription_Id)
    assert result is not None
    assert result.id == subscription_Id
    print("Subscription id: ", result.id)
except ErrorException as ex:
    print(ex.message)
    print("Errors: ", ex.errors)
except Exception as ex:
    raise ex
    