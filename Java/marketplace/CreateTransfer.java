
package examples.marketplace;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.RecipientsController;
import me.pagar.api.http.client.*;
import me.pagar.api.models.*;

public class CreateTransfer {

    public static void main(String[] args) {

        String basicAuthUserName = "ak_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
        String basicAuthPassword = ""; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        RecipientsController recipients_controller = new RecipientsController();

        CreateTransferRequest request = new CreateTransferRequest();

        request.setAmount(100);

        String recipientId = "rp_RElaP4NMCJu08V9m";

        recipients_controller.createTransferAsync(recipientId, request, null, new APICallBack<GetTransferResponse>() {
            @Override
            public void onSuccess(HttpContext context, GetTransferResponse response) {

                System.out.println("Transfer create!");
                System.out.println("Transfer ID: " + response.getId());
                System.out.println("Transfer status: " + response.getStatus());

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