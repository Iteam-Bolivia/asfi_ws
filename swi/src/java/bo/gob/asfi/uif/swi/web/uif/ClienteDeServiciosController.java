/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Node;
import bo.gob.asfi.uif.swi.model.Operacion;
import bo.gob.asfi.uif.swi.model.Puerto;
import bo.gob.asfi.uif.swi.model.Servicio;
import bo.gob.asfi.uif.swi.model.Servidor;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.predic8.wsdl.Binding;
import com.predic8.wsdl.BindingOperation;
import com.predic8.wsdl.Definitions;
import com.predic8.wsdl.Port;
import com.predic8.wsdl.Service;
import com.predic8.wsdl.WSDLParser;
import java.lang.reflect.Type;
import java.util.ArrayList;
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
    List<Servidor> servicios() {

        List<Servidor> servicios = dao.find(Servidor.class);
        return servicios;
    }

    @RequestMapping(value = "/crearservicio", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> crearServicio(Servidor servidor) {
        Map<String, Object> body = new HashMap<String, Object>();
        WSDLParser parser = new WSDLParser();
        try {
            Definitions defs = parser.parse(servidor.getWsdlurl());
            servidor.setJsonstruct(this.jsonStruct(defs));
            dao.persist(servidor);
            body.put("success", true);
            return body;
        } catch (Exception e) {
        }
        body.put("success", false);
        return body;
    }

    private String jsonStruct(Definitions definitions) {
        List<Servicio> servicios = new ArrayList<Servicio>();
        for (Service srv : definitions.getServices()) {
            Servicio s = new Servicio();
            s.setNombre(srv.getName());
            s.setPuertos(new ArrayList<Puerto>());
            for (Port port : srv.getPorts()) {
                Puerto p = new Puerto();
                p.setNombre(port.getName());
                p.setOperaciones(new ArrayList<Operacion>());
                for (BindingOperation op : port.getBinding().getOperations()) {
                    Operacion o = new Operacion();
                    o.setNombre(op.getName());
                    p.getOperaciones().add(o);
                }
                s.getPuertos().add(p);
            }
            servicios.add(s);
        }
        return new Gson().toJson(servicios);
    }

    @RequestMapping(value = "/disableservice", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> disableService(Servidor servidor) {
        Map<String, Object> body = new HashMap<String, Object>();

        Servidor s = dao.get(Servidor.class, servidor.getId());
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

    private String ejemploJsonTree() {
        return "[{\n"
                + "    text: 'To Do', \n"
                + "    iconCls: 'server', \n"
                + "    children: [{\n"
                + "        text: 'Go jogging',\n"
                + "        leaf: true,\n"
                + "        checked: false\n"
                + "    },{\n"
                + "        text: 'Take a nap',\n"
                + "        leaf: true,\n"
                + "        checked: false\n"
                + "    },{\n"
                + "        text: 'Climb Everest',\n"
                + "        leaf: true,\n"
                + "        checked: false\n"
                + "    }]\n"
                + "},{\n"
                + "    text: 'Grocery List',\n"
                + "    iconCls: 'server', \n"
                + "    children: [{\n"
                + "        text: 'Bananas',\n"
                + "        leaf: true,\n"
                + "        checked: false\n"
                + "    },{\n"
                + "        text: 'Milk',\n"
                + "        leaf: true,\n"
                + "        checked: false\n"
                + "    },{\n"
                + "        text: 'Cereal',\n"
                + "        leaf: true,\n"
                + "        checked: false\n"
                + "    },{\n"
                + "        text: 'Energy foods',\n"
                + "        cls: 'folder',\n"
                + "        iconCls: 'update', \n"
                + "        children: [{\n"
                + "            text: 'Coffee',\n"
                + "            leaf: true,\n"
                + "            checked: false\n"
                + "        },{\n"
                + "            text: 'Red Bull',\n"
                + "            leaf: true,\n"
                + "            checked: false\n"
                + "        }]\n"
                + "    }]\n"
                + "},{\n"
                + "    text: 'Remodel Project', \n"
                + "    cls: 'folder',\n"
                + "    children: [{\n"
                + "        text: 'Finish the budget',\n"
                + "        leaf: true,\n"
                + "        checked: false\n"
                + "    },{\n"
                + "        text: 'Call contractors',\n"
                + "        leaf: true,\n"
                + "        checked: false\n"
                + "    },{\n"
                + "        text: 'Choose design',\n"
                + "        leaf: true,\n"
                + "        checked: false\n"
                + "    }]\n"
                + "}]";
    }

    private List<Node> nodesFromJSONTEXT(String json) {
        Type listType = new TypeToken<ArrayList<Node>>() {
        }.getType();
        List<Node> nodes = new Gson().fromJson(json, listType);
        return nodes;
    }

    private List<org.heyma.core.extjs.components.Node> parseWSDLServiceTree(String swdlurl) {
        List<org.heyma.core.extjs.components.Node> nodes = new ArrayList<org.heyma.core.extjs.components.Node>();
        WSDLParser parser = new WSDLParser();
        Definitions defs = parser.parse(swdlurl);

        for (Binding bdg : defs.getBindings()) {
            System.out.println(bdg.getName());
            Node nb = new Node();
            nb.setText(bdg.getName());
            nb.setIconCls("binding");
            nb.setChildren(new ArrayList<org.heyma.core.extjs.components.Node>());
            for (BindingOperation op : bdg.getOperations()) {
                System.out.println(" - " + op.getName());
                Node no = new Node();
                no.setText(op.getName());
                no.setIconCls("operation");
                no.setLeaf(Boolean.TRUE);
                nb.getChildren().add(no);
            }
            nodes.add(nb);
        }

        return nodes;
    }

    private List<org.heyma.core.extjs.components.Node> parseJsonStructServiceTree(String json) {
        List<org.heyma.core.extjs.components.Node> nodes = new ArrayList<org.heyma.core.extjs.components.Node>();

        Type listType = new TypeToken<ArrayList<Servicio>>() {
        }.getType();
        List<Servicio> servicios = new Gson().fromJson(json, listType);

        for (Servicio srv : servicios) {
            Node ns = new Node();
            ns.setText(srv.getNombre());
            ns.setIconCls("service");
            ns.setChildren(new ArrayList<org.heyma.core.extjs.components.Node>());
            for (Puerto prt : srv.getPuertos()) {
                Node nb = new Node();
                nb.setText(prt.getNombre());
                nb.setIconCls("binding");
                nb.setChildren(new ArrayList<org.heyma.core.extjs.components.Node>());
                for (Operacion op : prt.getOperaciones()) {
                    Node no = new Node();
                    no.setText(op.getNombre());
                    no.setIconCls("operation");
                    no.setLeaf(Boolean.TRUE);
                    nb.getChildren().add(no);
                }
                ns.getChildren().add(nb);
            }
            nodes.add(ns);
        }
        return nodes;
    }

    private List<Node> nodesFromServidores(List<Servidor> servidores) {
        List<Node> nodes = new ArrayList<Node>();

        for (Servidor s : servidores) {

            Node n = new Node();
            n.setText(s.getNombre());
            n.setIconCls("server");
            n.setChildren(this.parseJsonStructServiceTree(s.getJsonstruct()));
            nodes.add(n);
        }
        return nodes;
    }

    @RequestMapping(value = "/treeservices")
    public @ResponseBody
    List<Node> treeServices() {

        List<Servidor> servidores = dao.find(Servidor.class);

        List<Node> nodes = this.nodesFromServidores(servidores);

        return nodes;
    }
}
