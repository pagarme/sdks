﻿using PagarmeCoreApi.Standard;
using PagarmeCoreApi.Standard.Models;
using System;

namespace Example.Marketplace
{
    class CreateAnticipation
    {
        static void Main(string[] args)
        {
            // Configuration parameters and credentials
            string basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
            string basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            var request = new CreateAnticipationRequest
            {
                Amount = 100,
                Timeframe= "start",
                PaymentDate = DateTime.Parse("2019-08-21")

            };

            String recipientId = "rp_RElaP4NMCJu08V9m";

            client.Recipients.CreateAnticipationAsync(recipientId, request);
            

        }

    }
}
