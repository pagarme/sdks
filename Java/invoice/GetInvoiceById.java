package examples.invoice;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.InvoicesController;
import me.pagar.api.http.client.*;
import me.pagar.api.models.GetInvoiceResponse;

public class GetInvoiceById {

    public static void main(String[] args) {

        // Configuration parameters and credentials
        String basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
        String basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        String invoiceId = "in_DKRdGqpsaVS4rmpl";

        InvoicesController invoices_controller = new InvoicesController();

        invoices_controller.getInvoiceAsync(invoiceId, new APICallBack<GetInvoiceResponse>() {
            @Override
            public void onSuccess(HttpContext context, GetInvoiceResponse response) {

                System.out.println("Invoice found!");
                System.out.println("Status response: " + context.getResponse().getStatusCode());
                System.out.println("Charge ID: " + response.getId());

            }

            @Override
            public void onFailure(HttpContext context, Throwable error) {

                System.out.println("Status response: " + context.getResponse().getStatusCode());
                System.out.println(error.getMessage());
                error.printStackTrace();

            }
        });
    }
}