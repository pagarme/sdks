using PagarmeCoreApi.PCL;
using PagarmeCoreApi.PCL.Models;
using System;
using System.Collections.Generic;

namespace Example.Order
{
    class CreateOrderBankSlip
    {
        static void Main(string[] args)
        {

           // Configuration parameters and credentials
            string basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
            string basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            var request = new CreateOrderRequest
            {
                Payments = new List<CreatePaymentRequest>
                {
                    new CreatePaymentRequest
                    {
                        PaymentMethod = "Boleto",
                        Amount = 1242,
                        Boleto = new CreateBoletoPaymentRequest
                        {
                            DocumentNumber = "276262",
                            Bank = "001"
                        }
                    }
                },
                Items = new List<CreateOrderItemRequest>
                {
                    new CreateOrderItemRequest
                    {
                        Amount = 2990,
                        Description = "Chaveiro do Tesseract",
                        Quantity = 1
                    }
                },
                Customer = new CreateCustomerRequest
                {
                    Name = "sdk customer order",
                    Email = "tonystark@avengers.com"
                }
            };

            var response = client.Orders.CreateOrderAsync(request);

        }

    }
}
