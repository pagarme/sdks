package examples.customer;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.CustomersController;
import me.pagar.api.http.client.APICallBack;
import me.pagar.api.http.client.HttpContext;
import me.pagar.api.models.GetCustomerResponse;
import me.pagar.api.models.UpdateCustomerRequest;

public class UpdateCustomer {

    public static void main(String[] args) {

        // Configuration parameters and credentials
        String basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
        String basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        CustomersController customers_controller = new CustomersController();

        UpdateCustomerRequest request = new UpdateCustomerRequest();

        request.setName("Peter Parker");
        request.setEmail("parker@avangers.com");

        String customerId = "cus_YL6zwglSxhg2X14g";

        customers_controller.updateCustomerAsync(customerId, request, null, new APICallBack<GetCustomerResponse>() {
            @Override
            public void onSuccess(HttpContext context, GetCustomerResponse response) {

                System.out.println("Status response: " + context.getResponse().getStatusCode());
                System.out.println("Customer update!");
                System.out.println("Customer ID: " + response.getId());

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