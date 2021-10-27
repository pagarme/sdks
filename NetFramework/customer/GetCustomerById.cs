using PagarmeCoreApi.PCL;

namespace Example.Customer
{
    class GetCustomerById
    {
        static void Main(string[] args)
        {
            // Configuration parameters and credentials
            string basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
            string basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            string customerId = "cus_6l5dMWZ0hkHZ4XnE";

            var response = client.Customers.GetCustomer(customerId);
        }
    }
}
