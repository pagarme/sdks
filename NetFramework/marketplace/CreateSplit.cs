﻿using PagarmeCoreApi.PCL;
using PagarmeCoreApi.PCL.Models;
using System.Collections.Generic;

namespace Example.Marketplace
{
    class CreateSplit
    {
        static void Main(string[] args)
        {
           string basicAuthUserName = "sk_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
            string basicAuthPassword = ""; // The password to use with basic authentication

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
                        PaymentMethod = "credit_card",
                        Split = new List<CreateSplitRequest>
                        {
                            new CreateSplitRequest {
                                Amount = 20,
                                RecipientId = "sk_test_4AdjlqpseatnmgbW",
                                Type = "percentage"
                            },
                            new CreateSplitRequest
                            {
                                Amount = 35,
                                RecipientId = "sk_test_5AdjlqpseatnmgbW",
                                Type = "percentage"
                            },
                            new CreateSplitRequest 
                            {
                                Amount = 45,
                                RecipientId = "sk_test_6AdjlqpseatnmgbW",
                                Type = "percentage"
                            }
                        },
                        CreditCard = new CreateCreditCardPaymentRequest
                        {
                            Card = new CreateCardRequest
                            {
                                HolderName = "Tony Stark",
                                Number = "342793631858229",
                                ExpMonth = 1,
                                ExpYear = 30,
                                Cvv = "3531"
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

