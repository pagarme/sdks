﻿using PagarmeCoreApi.Standard;
using PagarmeCoreApi.Standard.Models;

namespace Example.Marketplace
{
    class CreateTransfer
    {
        static void Main(string[] args)
        {

           // Configuration parameters and credentials
            string basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
            string basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            var request = new CreateRecipientRequest
            {
                Name = "Tony Stark",
                Document = "12312312312",
                Email = "Star22k@mundipagg.com",
                Type = "individual",
                DefaultBankAccount = new CreateBankAccountRequest
                {
                    HolderName = "Tony Stark",
                    HolderDocument = "12312312312",
                    HolderType = "individual",
                    Bank = "341",
                    AccountNumber = "123",
                    Type = "checking"

                }
            };

            var response = client.Recipients.CreateRecipient(request);

        }
    }
}
