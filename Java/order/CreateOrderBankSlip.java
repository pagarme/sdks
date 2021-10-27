package examples.order;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.OrdersController;
import me.pagar.api.http.client.*;
import me.pagar.api.models.*;
import org.joda.time.DateTime;

import java.util.ArrayList;

public class CreateOrderBankSlip {

    public static void main(String[] args) {

        // Configuration parameters and credentials
        String basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
        String basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        OrdersController orders_controller = new OrdersController();

        CreateCustomerRequest customer = new CreateCustomerRequest();
        customer.setName("sdk customer order");
        customer.setEmail("tonystark@avengers.com");
        customer.setAddress(new CreateAddressRequest());
        customer.getAddress().setStreet("Malibu Point");
        customer.getAddress().setNumber("10880");
        customer.getAddress().setZipCode("90265");
        customer.getAddress().setNeighborhood("Central Malibu");
        customer.getAddress().setCity("Malibu");
        customer.getAddress().setState("CA");
        customer.getAddress().setCountry("US");

        CreateBoletoPaymentRequest create_boleto_payment_request = new CreateBoletoPaymentRequest();
        create_boleto_payment_request.setBank("033");
        create_boleto_payment_request.setInstructions("Pagar até o vencimento");
        create_boleto_payment_request.setDueAt(DateTime.parse("2019-12-31T00:00:00Z"));

        CreateOrderRequest request = new CreateOrderRequest();

        CreateOrderItemRequest orderItem = new CreateOrderItemRequest();
        orderItem.setDescription("Tesseract Bracelet");
        orderItem.setQuantity(3);
        orderItem.setAmount(1490);
        ArrayList<CreateOrderItemRequest> listOrderItem = new ArrayList<CreateOrderItemRequest>();
        listOrderItem.add(orderItem);
        request.setItems(listOrderItem);

        CreatePaymentRequest paymentItem = new CreatePaymentRequest();
        paymentItem.setPaymentMethod("boleto");
        paymentItem.setBoleto(create_boleto_payment_request);
        request.setCustomer(customer);
        ArrayList<CreatePaymentRequest> lisPaymentItem = new ArrayList<CreatePaymentRequest>();
        lisPaymentItem.add(paymentItem);
        request.setPayments(lisPaymentItem);

        orders_controller.createOrderAsync(request, null, new APICallBack<GetOrderResponse>() {
            public void onSuccess(HttpContext context, GetOrderResponse response) {

                System.out.println("Order bank slip create !");
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