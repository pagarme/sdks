package examples.order;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.OrdersController;
import me.pagar.api.http.client.*;
import me.pagar.api.models.GetOrderResponse;

public class GetOrderById {

    public static void main(String[] args) {

        String basicAuthUserName = "ak_test_q73YODBFQhyV9mod"; // The username to use with basic authentication
        String basicAuthPassword = ""; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        String orderId = "or_9j8m1E4f6HonwYA0";

        OrdersController orders_controller = new OrdersController();

        orders_controller.getOrderAsync(orderId, new APICallBack<GetOrderResponse>() {
            @Override
            public void onSuccess(HttpContext context, GetOrderResponse response) {

                System.out.println("Order found!");
                System.out.println("Status response: " + context.getResponse().getStatusCode());
                System.out.println("Order ID: " + response.getId());

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
