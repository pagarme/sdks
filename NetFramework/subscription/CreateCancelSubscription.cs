using PagarmeCoreApi.PCL;
using PagarmeCoreApi.PCL.Models;

namespace Example.Subscription
{
    class CreateCancelSubscription
    {
        static void Main(string[] args)
        {
            // Configuration parameters and credentials
            string basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
            string basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

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
