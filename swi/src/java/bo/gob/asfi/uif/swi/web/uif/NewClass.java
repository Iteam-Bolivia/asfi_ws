/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import com.google.gson.Gson;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author John
 */
public class NewClass {

    public static void main(String[] args) {
        try {

            //RestTemplate restTemplate = new RestTemplateFactory().getObject();

            HttpHost host = new HttpHost("localhost", 8080, "http");
            RestTemplate restTemplate = new RestTemplate(
                    new HttpComponentsClientHttpRequestFactoryBasicAuth(host));

            System.err.println(restTemplate);

            HttpComponentsClientHttpRequestFactory requestFactory = (HttpComponentsClientHttpRequestFactory) restTemplate.getRequestFactory();

            DefaultHttpClient httpClient = (DefaultHttpClient) requestFactory.getHttpClient();
            httpClient.getCredentialsProvider().setCredentials(
                    new AuthScope("localhost", 8080, AuthScope.ANY_REALM),
                    new UsernamePasswordCredentials("uif", "123456"));

            //ResponseEntity en = restTemplate.exchange("http://localhost:8080/segip-ws/service/searchfields",
            ResponseEntity en = restTemplate.exchange("http://google.com",      
                    HttpMethod.GET, null, String.class);
            Gson g = new Gson();
            System.out.println(en.toString());


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
