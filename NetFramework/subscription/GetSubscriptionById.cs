using PagarmeCoreApi.PCL;

namespace Example.Subscription
{
    class GetSubscriptionById
    {
        static void Main(string[] args)
        {
            string basicAuthUserName = "sk_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
            string basicAuthPassword = ""; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);
            string subscrptionId = "sub_05jkdIfGYPfN26mI";

            var response = client.Subscriptions.GetSubscription(subscrptionId);

        }
    }
}
