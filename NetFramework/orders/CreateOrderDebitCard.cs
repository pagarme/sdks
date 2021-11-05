using PagarmeCoreApi.PCL;
using PagarmeCoreApi.PCL.Models;
using System.Collections.Generic;

namespace Example.Order
{
    class CreateOrderDebitCard
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
                    PaymentMethod = "debit_card",
                        DebitCard  = new CreateDebitCardPaymentRequest
                        {
                            Card = new CreateCardRequest
                            {
                                HolderName = "Tony Stark",
                                Number = "342793631858229",
                                ExpMonth = 1,
                                ExpYear = 18,
                                Cvv = "3531",
                            }
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
