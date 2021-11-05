using PagarmeCoreApi.PCL;
using System;

namespace Examples.card
{
    class GetCards
    {
        static void Main(string[] args)
        {

            // Configuration parameters and credentials
            string basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
            string basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            string customerId = "cus_6l5dMWZ0hkHZ4XnE";
            string cardId = "card_8ELY0AwVF9HDa3jK";

            var response = client.Customers.GetCard(customerId, cardId);

        }
    }
}
