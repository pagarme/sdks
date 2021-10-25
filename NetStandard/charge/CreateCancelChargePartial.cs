using PagarmeCoreApi.Standard;
using PagarmeCoreApi.Standard.Models;

namespace Example.Charges
{
    class CreateCancelChargePartial
    {
        static void Main(string[] args)
        {
            string basicAuthUserName = "sk_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
            string basicAuthPassword = ""; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);
            string chargeId = "ch_exRAY21fvNFVD9EX";


            var request = new CreateCancelChargeRequest
            {
                Amount = 100
            };

            client.Charges.CancelChargeAsync(chargeId, request);

        }
    }
}
