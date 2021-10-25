package examples.charge;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.ChargesController;
import me.pagar.api.models.CreateCancelChargeRequest;
import me.pagar.api.models.GetChargeResponse;
import me.pagar.api.http.client.*;

public class CreateCancelCharge {

    public static void main(String[] args) {

        String basicAuthUserName = "ak_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
        String basicAuthPassword = ""; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        ChargesController charges_controller = new ChargesController();

        String chargeId = "ch_PLoQOAxFLycVra5z";

        CreateCancelChargeRequest request = new CreateCancelChargeRequest();

        charges_controller.cancelChargeAsync(chargeId, request, null, new APICallBack<GetChargeResponse>() {
            @Override
            public void onSuccess(HttpContext context, GetChargeResponse response) {

                System.out.println("Status response: " + context.getResponse().getStatusCode());
                System.out.println("Canceled amount:" + response.getAmount());
                System.out.println("Charge status: " + response.getStatus());
                System.out.println("Last transaction status: " + response.getLastTransaction().getStatus());
                System.out.println("Last transaction amount: " + response.getLastTransaction().getAmount());
                System.out.println("Last transaction id: " + response.getLastTransaction().getId());
                System.out.println("Charge is total canceled");

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