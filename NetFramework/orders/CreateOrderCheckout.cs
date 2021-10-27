using PagarmeCoreApi.PCL;
using PagarmeCoreApi.PCL.Models;
using System.Collections.Generic;

namespace Example.Order
{
    class CreateOrderCheckout
    {
        static void Main(string[] args)
        {
           // Configuration parameters and credentials
            string basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
            string basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            var request = new CreateOrderRequest
            {
                Customer = new CreateCustomerRequest
                {
                    Name = "Tony Stark",
                    Email = "tonystark@avengers.com",
                },
                Payments = new List<CreatePaymentRequest>
                {
                    new CreatePaymentRequest
                    {
                        Amount = 990,
                        PaymentMethod = "credit_card",
                        CreditCard = new CreateCreditCardPaymentRequest
                        {
                            StatementDescriptor = "AVENGERS",
                            Card = new CreateCardRequest
                            {
                                Number = "4024007131429325",
                                HolderName = "Tony Stark2",
                                ExpMonth = 1,
                                ExpYear = 18,
                                Cvv = "355",
                            }
                        }
                    },
                    new CreatePaymentRequest
                    {
                        Amount = 2000,
                        PaymentMethod = "credit_card",
                        CreditCard = new CreateCreditCardPaymentRequest
                        {
                            StatementDescriptor = "AVENGERS",
                            Card = new CreateCardRequest
                            {
                                Number = "4024007131429325",
                                HolderName = "Tony Stark3",
                                ExpMonth = 1,
                                ExpYear = 18,
                                Cvv = "355",
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
                }
            };
            
            var response = client.Orders.CreateOrder(request);

        }
    }
}
