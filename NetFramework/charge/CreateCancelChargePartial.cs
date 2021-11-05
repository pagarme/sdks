using PagarmeCoreApi.PCL;
using PagarmeCoreApi.PCL.Models;

namespace Example.Charges
{
    class CreateCancelChargePartial
    {
        static void Main(string[] args)
        {
            // Configuration parameters and credentials
            string basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
            string basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

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
