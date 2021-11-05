
package examples.order;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.OrdersController;
import me.pagar.api.http.client.*;
import me.pagar.api.models.*;

import java.util.ArrayList;

public class CreateOrderCreditCard {

    public static void main(String[] args) {

        // Configuration parameters and credentials
        String basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
        String basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        OrdersController orders_controller = new OrdersController();

        CreateCustomerRequest customer = new CreateCustomerRequest();
        customer.setName("sdk customer order");
        customer.setEmail("tonystark@avengers.com");

        CreateCreditCardPaymentRequest create_credit_card_payment_request = new CreateCreditCardPaymentRequest();
        create_credit_card_payment_request.setCapture(true);
        create_credit_card_payment_request.setInstallments(2);
        create_credit_card_payment_request.setCard(new CreateCardRequest());
        create_credit_card_payment_request.getCard().setNumber("4000000000000010");
        create_credit_card_payment_request.getCard().setHolderName("Tony Stark");
        create_credit_card_payment_request.getCard().setExpMonth(1);
        create_credit_card_payment_request.getCard().setExpYear(2025);
        create_credit_card_payment_request.getCard().setCvv("123");

        CreateOrderRequest request = new CreateOrderRequest();

        CreateOrderItemRequest orderItem = new CreateOrderItemRequest();
        orderItem.setDescription("Tesseract Bracelet");
        orderItem.setQuantity(3);
        orderItem.setAmount(1490);
        ArrayList<CreateOrderItemRequest> listOrderItem = new ArrayList<CreateOrderItemRequest>();
        listOrderItem.add(orderItem);
        request.setItems(listOrderItem);

        CreatePaymentRequest paymentItem = new CreatePaymentRequest();
        paymentItem.setPaymentMethod("credit_card");
        paymentItem.setCreditCard(create_credit_card_payment_request);
        request.setCustomer(customer);
        ArrayList<CreatePaymentRequest> lisPaymentItem = new ArrayList<CreatePaymentRequest>();
        lisPaymentItem.add(paymentItem);
        request.setPayments(lisPaymentItem);

        orders_controller.createOrderAsync(request, null, new APICallBack<GetOrderResponse>() {
            public void onSuccess(HttpContext context, GetOrderResponse response) {

                System.out.println("Order credit card create !");
                System.out.println("Status response: " + context.getResponse().getStatusCode());
                System.out.println("Order result status: " + response.getStatus());
                System.out.println("Order id: " + response.getId());

            }

            public void onFailure(HttpContext context, Throwable error) {

                System.out.println("Status response: " + context.getResponse().getStatusCode());
                System.out.println(error.getMessage());
                error.printStackTrace();

            }
        });

    }

}