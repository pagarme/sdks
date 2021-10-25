package examples.cards;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.CustomersController;
import me.pagar.api.http.client.*;
import me.pagar.api.models.GetCardResponse;
import me.pagar.api.models.ListCardsResponse;

public class GetCards {

    public static void main(String[] args) {

        String basicAuthUserName = "ak_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
        String basicAuthPassword = ""; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        CustomersController customers_controller = new CustomersController();

        String customerId = "cus_G6gwy4xtJIOyNbrK";

        customers_controller.getCardsAsync(customerId, 1, 30, new APICallBack<ListCardsResponse>() {

            @Override
            public void onSuccess(HttpContext context, ListCardsResponse response) {
                System.out.println("Cards found !");
                System.out.println("Status response: " + context.getResponse().getStatusCode());

                response.getData().isEmpty();

                if (response.getData().isEmpty()) {
                    System.out.println("My wallet is empty");
                } else {
                    for (GetCardResponse cardItem : response.getData()) {
                        System.out.println("Card ID: " + cardItem.getId());
                    }
                    System.out.println("Cards quantity in my wallet: " + response.getPaging().getTotal());
                }
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