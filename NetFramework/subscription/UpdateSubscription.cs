﻿using PagarmeCoreApi.PCL;
using PagarmeCoreApi.PCL.Models;

namespace Example.Subscription
{
    class UpdateSubscription
    {
        static void Main(string[] args)
        {
            string basicAuthUserName = "sk_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
            string basicAuthPassword = ""; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            string subscrptionId = "sub_05jkdIfGYPfN26mI";
            var request = new UpdateSubscriptionCardRequest
            {

                Card = new CreateCardRequest
                {

                    Number = "4024007149094251",
                    HolderName = "Tony Stark",
                    ExpMonth = 6,
                    ExpYear = 30,
                    Cvv = "680",
                    BillingAddress = new CreateAddressRequest
                    {
                        Line1 = "375, Av. General Justo, Centro",
                        Line2 = "8º andar",
                        ZipCode = "20021130",
                        City = "Rio de Janeiro",
                        State = "RJ",
                        Country = "BR"
                    }
                }
            };

            var response = client.Subscriptions.UpdateSubscriptionCard(subscrptionId, request);
        }
    }
}
