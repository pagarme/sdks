﻿using PagarmeCoreApi.Standard;

namespace Example.Charges
{
    class GetChargeById
    {
        static void Main(string[] args)
        {
            string basicAuthUserName = "sk_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
            string basicAuthPassword = ""; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);
            string chargeId = "ch_exRAY21fvNFVD9EX";

            var response = client.Charges.GetCharge(chargeId);
        }
    }
}
