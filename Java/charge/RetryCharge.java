package examples.charge;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.ChargesController;
import me.pagar.api.http.client.APICallBack;
import me.pagar.api.http.client.HttpContext;
import me.pagar.api.models.GetChargeResponse;

public class RetryCharge {

    public static void main(String[] args) {

        // Configuration parameters and credentials
        String basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
        String basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        ChargesController charges_controller = new ChargesController();

        String chargeId = "ch_8dla503fAUdNXgz2";

        charges_controller.retryChargeAsync(chargeId, null, new APICallBack<GetChargeResponse>() {
            @Override
            public void onSuccess(HttpContext context, GetChargeResponse response) {

                System.out.println("Status response: " + context.getResponse().getStatusCode());
                System.out.println("Charge retry!");
                System.out.println("Charge ID: " + response.getId());
                System.out.println("Charge status: " + response.getStatus());
                System.out.println("Last transaction status: " + response.getLastTransaction().getStatus());

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