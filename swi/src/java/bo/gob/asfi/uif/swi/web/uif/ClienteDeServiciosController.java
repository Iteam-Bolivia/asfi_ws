/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Servicio;
import com.google.gson.Gson;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.Credentials;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author John
 */
@Controller
public class ClienteDeServiciosController {

    @Autowired
    Dao dao;
    //private RestTemplateFactory rest;
    private RestTemplate restTemplate;

    @RequestMapping(value = "/administrarservicios")
    public String administrarServicios() {
        return "servicios/administrarServicios";
    }

    @RequestMapping(value = "/servicios")
    public @ResponseBody
    List<Servicio> servicios() {

        List<Servicio> servicios = dao.find(Servicio.class);
        return servicios;
    }

    @RequestMapping(value = "/crearservicio", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> crearServicio(Servicio servicio) {
        Map<String, Object> body = new HashMap<String, Object>();
        dao.persist(servicio);
        body.put("success", true);
        return body;
    }

    @RequestMapping(value = "/disableservice", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> disableService(Servicio servicio) {
        Map<String, Object> body = new HashMap<String, Object>();

        Servicio s = dao.get(Servicio.class, servicio.getId());
        s.setActivo(!s.getActivo());

        dao.update(s);
        body.put("success", true);
        return body;
    }

    @RequestMapping(value = "/restclient")
    public @ResponseBody
    String restCliente() {

        DefaultHttpClient client = new DefaultHttpClient();
        client.getCredentialsProvider().setCredentials(
                new AuthScope("localhost", 8080),
                new UsernamePasswordCredentials("uif", "123456"));

        Credentials defaultcreds = new UsernamePasswordCredentials("username", "password");
        //client.getState().setCredentials(new AuthScope("myhost", 80, AuthScope.ANY_REALM), defaultcreds);



        ClientHttpRequestFactory commons = new HttpComponentsClientHttpRequestFactory(client);

        RestTemplate template = new RestTemplate(commons);

        String res = template.getForObject("http://localhost:8080/segip-ws/service/searchfields", String.class);


        return res;
    }

    @RequestMapping(value = "/cliente")
    public String cliente() {

        HttpComponentsClientHttpRequestFactory requestFactory = (HttpComponentsClientHttpRequestFactory) restTemplate.getRequestFactory();

        DefaultHttpClient httpClient = (DefaultHttpClient) requestFactory.getHttpClient();
        httpClient.getCredentialsProvider().setCredentials(
                new AuthScope("localhost", 8080, AuthScope.ANY_REALM),
                new UsernamePasswordCredentials("uif", "123456"));

        ResponseEntity en = restTemplate.exchange("http://localhost:8080/spring-security-rest-template/api/foos/1",
                HttpMethod.GET, null, String.class);
        Gson g = new Gson();
        System.err.println(g.toJson(g));
        return "servicios/administrarServicios";
    }
}
