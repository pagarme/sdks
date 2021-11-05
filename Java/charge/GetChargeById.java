package examples.charge;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.ChargesController;
import me.pagar.api.http.client.*;
import me.pagar.api.models.GetChargeResponse;

public class GetChargeById {

    public static void main(String[] args) {

        // Configuration parameters and credentials
        String basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
        String basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        String chargeId = "ch_Dzk8rbVSynuM80Ad";

        ChargesController charges_controller = new ChargesController();

        charges_controller.getChargeAsync(chargeId, new APICallBack<GetChargeResponse>() {
            @Override
            public void onSuccess(HttpContext context, GetChargeResponse response) {

                System.out.println("Status response: " + context.getResponse().getStatusCode());
                System.out.println("Charge found!");
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