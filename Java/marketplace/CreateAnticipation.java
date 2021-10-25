package examples.marketplace;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.RecipientsController;
import me.pagar.api.models.CreateAnticipationRequest;
import me.pagar.api.models.GetAnticipationResponse;
import me.pagar.api.http.client.*;
import org.joda.time.DateTime;

public class CreateAnticipation {

    public static void main(String[] args) {

        String basicAuthUserName = "ak_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
        String basicAuthPassword = ""; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        RecipientsController recipients_controller = new RecipientsController();

        CreateAnticipationRequest request = new CreateAnticipationRequest();

        request.setAmount(100);
        request.setTimeframe("start");
        request.setPaymentDate(DateTime.parse("2019-08-21"));

        String recipientId = "rp_RElaP4NMCJu08V9m";

        recipients_controller.createAnticipationAsync(recipientId, request, null,
                new APICallBack<GetAnticipationResponse>() {
                    @Override
                    public void onSuccess(HttpContext context, GetAnticipationResponse response) {
                        System.out.println("Anticipation create!");
                        System.out.println("Anticipation ID: " + response.getId());
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
