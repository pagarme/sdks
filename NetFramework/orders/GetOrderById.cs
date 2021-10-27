using PagarmeCoreApi.PCL;

namespace Example.Order
{
    class GetOrderById
    {
        static void Main(string[] args)
        {
            // Configuration parameters and credentials
            string basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
            string basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            string orderId = "or_9j8m1E4f6HonwYA0";


            var response = client.Orders.GetOrder(orderId);
        }

    }
}
