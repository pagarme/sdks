using PagarmeCoreApi.Standard;
using PagarmeCoreApi.Standard.Models;

namespace Example.Charges
{
    class CreateCaptureChargePartial
    {
        static void Main(string[] args)
        {
            string basicAuthUserName = "sk_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
            string basicAuthPassword = ""; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);
            string chargeId = "ch_exRAY21fvNFVD9EX";

            var request = new CreateCaptureChargeRequest
            {
                Amount = 100,
                Code = "capture_partial_operation"
            };

            client.Charges.CaptureChargeAsync(chargeId, request);

        }

    }
}
