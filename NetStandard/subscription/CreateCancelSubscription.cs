using PagarmeCoreApi.Standard;
using PagarmeCoreApi.Standard.Models;

namespace Example.Subscription
{
    class CreateCancelSubscription
    {
        static void Main(string[] args)
        {
            string basicAuthUserName = "sk_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
            string basicAuthPassword = ""; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            string subscrptionId = "sub_WeEMlp2FXFMjVq3Q";

            var request = new CreateCancelSubscriptionRequest
            {
                CancelPendingInvoices = true
            };

            var response = client.Subscriptions.CancelSubscription(subscrptionId, request);
        }
    }
}
