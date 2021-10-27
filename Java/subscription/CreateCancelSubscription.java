package examples.subscription;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.SubscriptionsController;
import me.pagar.api.http.client.*;
import me.pagar.api.models.*;

public class CreateCancelSubscription {

    public static void main(String[] args) {

        // Configuration parameters and credentials
        String basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
        String basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        SubscriptionsController subscriptions_controller = new SubscriptionsController();

        String subscriptionId = "sub_4qK9P5gtaipabMxV";

        CreateCancelSubscriptionRequest request = new CreateCancelSubscriptionRequest();

        request.setCancelPendingInvoices(true);

        subscriptions_controller.cancelSubscriptionAsync(subscriptionId, request, null,
                new APICallBack<GetSubscriptionResponse>() {
                    public void onSuccess(HttpContext context, GetSubscriptionResponse response) {

                        System.out.println("Status response: " + context.getResponse().getStatusCode());
                        System.out.println("Subscription cancel !");
                        System.out.println("Subscription id: " + response.getId());
                        System.out.println("Subscription status: " + response.getStatus());

                    }

                    public void onFailure(HttpContext context, Throwable error) {

                        System.out.println("Status response: " + context.getResponse().getStatusCode());
                        System.out.println(error.getMessage());
                        error.printStackTrace();

                    }
                });
    }

}
