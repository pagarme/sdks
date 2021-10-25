package examples.address;

import me.pagar.api.PagarmeCoreApiClient;
import me.pagar.api.controllers.CustomersController;
import me.pagar.api.http.client.APICallBack;
import me.pagar.api.http.client.HttpContext;
import me.pagar.api.models.*;

import java.util.LinkedHashMap;

public class CreateAddress {

    public static void main(String[] args) {

        String basicAuthUserName = "ak_test_4tdVXpseumRmqbo"; // The username to use with basic authentication
        String basicAuthPassword = ""; // The password to use with basic authentication

        PagarmeCoreApiClient client = new PagarmeCoreApiClient(basicAuthUserName, basicAuthPassword);

        CustomersController customers_controller = new CustomersController();

        String customerId = "cus_PzRyp10FeNca2rVB";

        CreateAddressRequest request = new CreateAddressRequest();

        request.setLine1("10880, Malibu Point, Malibu Central");
        request.setLine2("7º floor");
        request.setZipCode("90265");
        request.setCity("Malibu");
        request.setState("CA");
        request.setCountry("US");
        LinkedHashMap<String, String> metadata = new LinkedHashMap<String, String>();
        metadata.put("id", "my_address_id");
        UpdateMetadataRequest updateMetadata = new UpdateMetadataRequest();
        updateMetadata.setMetadata(metadata);
        request.setMetadata(updateMetadata.getMetadata());

        customers_controller.createAddressAsync(customerId, request, null, new APICallBack<GetAddressResponse>() {
            @Override
            public void onSuccess(HttpContext context, GetAddressResponse response) {

                System.out.println("Address create !");
                System.out.println("Status response: " + context.getResponse().getStatusCode());
                System.out.println("Address id: " + response.getId());

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