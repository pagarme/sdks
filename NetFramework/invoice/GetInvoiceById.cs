using PagarmeCoreApi.PCL;

namespace Example.Invoice
{
    class GetInvoiceById
    {
        static void Main(string[] args)
        {
            // Configuration parameters and credentials
            string basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
            string basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

            var client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

            string invoiceId = "in_n87qwY1FA2SzwXDb";
            var response = client.Invoices.GetInvoice(invoiceId);
        }
    }
}
