﻿using PagarmeCoreApi.Standard;
using PagarmeCoreApi.Standard.Models;

namespace Example.Customer
{
    class UpdateCustomer
    {
        static void Main(string[] args)
        {
            string basicAuthUserName = "sk_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
            string basicAuthPassword = ""; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            string customerId = "cus_6l5dMWZ0hkHZ4XnE";
            var request = new UpdateCustomerRequest
            {
                Name = "Peter Parker",
                Email = "parker@avengers.com"
            };

            var response = client.Customers.UpdateCustomer(customerId, request);
        }
    }
}
