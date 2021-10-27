using PagarmeCoreApi.PCL;
using PagarmeCoreApi.PCL.Models;
using System.Collections.Generic;

namespace Example.Order
{
    class CreateOrderCreditCard
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
                        PaymentMethod = "credit_card",
                        CreditCard = new CreateCreditCardPaymentRequest
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
                Antifraud = new CreateAntifraudRequest
                {
                    Type = "clearsale",
                    Clearsale =new CreateClearSaleRequest
                    {
                        CustomSla = 90
                    }
                },
                Customer = new CreateCustomerRequest
                {
                    Name = "sdk customer order",
                    Email = "tonystark@avengers.com"
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
            };

            var response = client.Orders.CreateOrder(request);


        }
    }
}
