/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.ElementParam;
import bo.gob.asfi.uif.swi.model.FormField;
import bo.gob.asfi.uif.swi.model.Node;
import bo.gob.asfi.uif.swi.model.ORequest;
import bo.gob.asfi.uif.swi.model.OResponse;
import bo.gob.asfi.uif.swi.model.Operacion;
import bo.gob.asfi.uif.swi.model.Parametro;
import bo.gob.asfi.uif.swi.model.Puerto;
import bo.gob.asfi.uif.swi.model.Servicio;
import bo.gob.asfi.uif.swi.model.Servidor;
import bo.gob.asfi.uif.swi.model.UserService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.predic8.schema.ComplexType;
import com.predic8.schema.Element;
import com.predic8.wsdl.Binding;
import com.predic8.wsdl.BindingOperation;
import com.predic8.wsdl.Definitions;
import com.predic8.wsdl.Operation;
import com.predic8.wsdl.Port;
import com.predic8.wsdl.Service;
import com.predic8.wsdl.WSDLParser;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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

    @RequestMapping(value = "/administrarservicios")
    public String administrarServicios() {
        return "servicios/administrarServicios";
    }

    @RequestMapping(value = "/servicios")
    public @ResponseBody
    List<Servidor> servicios() {

        List<Servidor> servicios = dao.findAll(Servidor.class);
        return servicios;
    }

    @RequestMapping(value = "/crearservicio", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> crearServicio(Servidor servidor) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            WSDLParser parser = new WSDLParser();
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
                p.setDireccion(port.getAddress().getLocation());
                p.setOperaciones(new ArrayList<Operacion>());
                for (BindingOperation op : port.getBinding().getOperations()) {
                    Operacion o = new Operacion();
                    o.setNombre(op.getName());
                    o.setBindingName(port.getBinding().getName());
                    Operation operation = definitions.getOperation(op.getName(), op.getBinding().getPortType().getName());
                    Element elreq = operation.getInput().getMessage().getParts().get(0).getElement();
                    if (elreq != null) {
                        o.setRequest(new ORequest());
                        o.getRequest().setElements(this.listParameters(elreq));

                        Element elres = operation.getOutput().getMessage().getParts().get(0).getElement();

                        o.setResponse(new OResponse());
                        o.getResponse().setElements(this.listParameters(elres));
                    }

                    p.getOperaciones().add(o);
                }
                s.getPuertos().add(p);
            }
            servicios.add(s);
        }
        return new Gson().toJson(servicios);
    }

    @RequestMapping(value = "/eliminarservidor", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> eliminarServidor(@RequestParam Long id) {
        Map<String, Object> body = new HashMap<String, Object>();

        Servidor s = dao.get(Servidor.class, id);
        dao.remove(s);

        body.put("success", true);
        return body;
    }

    @RequestMapping(value = "/reloadservidor", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> reloadServidor(@RequestParam Long id) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            Servidor servidor = dao.get(Servidor.class, id);
            WSDLParser parser = new WSDLParser();
            Definitions defs = parser.parse(servidor.getWsdlurl());
            servidor.setJsonstruct(this.jsonStruct(defs));
            dao.update(servidor);
            body.put("success", true);
        } catch (Exception e) {
        }
        body.put("success", false);
        return body;
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
                //System.out.println(" - " + op.getName());
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

    private List<org.heyma.core.extjs.components.Node> parseJsonStructServiceTree(String rootId, List<Servicio> servicios) {
        List<org.heyma.core.extjs.components.Node> nodes = new ArrayList<org.heyma.core.extjs.components.Node>();

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
                    no.setId(rootId + ":" + srv.getNombre() + ":" + prt.getNombre() + ":" + op.getNombre() + ":" + op.getBindingName());
                    no.setUrl(prt.getDireccion());
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
            n.setId(s.getId().toString());
            n.setChildren(this.parseJsonStructServiceTree(s.getId().toString(), s.getServicios()));
            nodes.add(n);
        }
        return nodes;
    }

    private List<Node> nodesFromUserServices(List<UserService> services) {
        List<Node> nodes = new ArrayList<Node>();

        for (UserService us : services) {
            if (us.getRpiEnable()) {
                Node n = new Node();
                n.setText(us.getNombre());
                n.setIconCls("service");
                n.setId(us.getId().toString());
                //n.setChildren(this.parseJsonStructServiceTree(s.getId().toString(), s.getServicios()));
                List<org.heyma.core.extjs.components.Node> pms = new ArrayList<org.heyma.core.extjs.components.Node>();
                for (Parametro pm : us.getParametros()) {
                    // para verificar q el parametro no haya sido asignado
                    if (pm.getRpifield() == null) {
                        Node np = new Node();
                        np.setText(pm.getEtiqueta());
                        np.setIconCls("param");
                        np.setChecked(Boolean.FALSE);
                        np.setId(pm.getId().toString());
                        np.setLeaf(Boolean.TRUE);
                        pms.add(np);
                    }
                }
                n.setChildren(pms);
                nodes.add(n);
            }
        }
        return nodes;
    }

    @RequestMapping(value = "/treeservices")
    public @ResponseBody
    List<Node> treeServices() {
        List<Servidor> servidores = dao.findAll(Servidor.class);
        List<Node> nodes = this.nodesFromServidores(servidores);
        return nodes;
    }

    @RequestMapping(value = "/treeuserservices")
    public @ResponseBody
    List<Node> treeUserServices() {
        List<UserService> services = dao.findAll(UserService.class);
        List<Node> nodes = this.nodesFromUserServices(services);
        return nodes;
    }

    private List<ElementParam> listParameters(Element element) {

        ArrayList<ElementParam> listElement = new ArrayList<ElementParam>();
        ComplexType ct = (ComplexType) element.getEmbeddedType();

        if (ct == null) {
            ct = element.getSchema().getComplexType(element.getType().getLocalPart());
        }

        if (ct.getSequence() != null) {
            for (Element e : ct.getSequence().getElements()) {
                ElementParam ne = new ElementParam();
                ne.setName(e.getName());
                ne.setType(e.getType().getLocalPart());
                listElement.add(ne);
            }
        }
        return listElement;
    }

    @RequestMapping(value = "/formserviceitems")
    public @ResponseBody
    List<FormField> formServiceItems(@RequestParam(value = "id") String opId) {
        //parts = ["Root-Rervidor_id","ServiceName","PortName","OperationName"]
        String[] parts = opId.split(":");
        Servidor servidor = dao.get(Servidor.class, new Long(parts[0]));
        List<Servicio> servicios = servidor.getServicios();

        Operacion op = ClienteDeServiciosController.getOperacion(parts[1], parts[2], parts[3], servicios);
        //System.out.println(op);
        if (op != null) {
            if (op.getRequest() != null) {
                return requestFormFiends(op.getRequest());
            }
        }
        return null;
    }

    private List<FormField> requestFormFiends(ORequest request) {
        List<FormField> list = new ArrayList<FormField>();
        for (ElementParam ep : request.getElements()) {
            FormField ff = new FormField();
            ff.setFieldLabel(ep.getName() + "  (" + ep.getType() + ")");
            ff.setXtype(FormField.TEXT_FIELD);
            ff.setName(ep.getName());
            list.add(ff);
        }
        return list;
    }

    public static Operacion getOperacion(String serviceName, String portName, String operationName, List<Servicio> servicios) {
        for (Servicio s : servicios) {
            if (s.getNombre().equals(serviceName)) {
                for (Puerto p : s.getPuertos()) {
                    if (p.getNombre().equals(portName)) {
                        for (Operacion o : p.getOperaciones()) {
                            if (o.getNombre().equals(operationName)) {
                                return o;
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    @RequestMapping(value = "/definirservicio", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> crearServicio(UserService serv) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            dao.persist(serv);
            String[] parts = serv.getRouter().split(":");
            Servidor servidor = dao.get(Servidor.class, new Long(parts[0]));
            List<Servicio> servicios = servidor.getServicios();

            Operacion op = ClienteDeServiciosController.getOperacion(parts[1], parts[2], parts[3], servicios);
            if (op != null) {
                if (op.getRequest() != null) {
                    for (ElementParam ep : op.getRequest().getElements()) {
                        Parametro param = new Parametro();
                        param.setNombre(ep.getName());
                        param.setEtiqueta(ep.getName());
                        param.setTipo(ep.getType());
                        param.setServicio(serv);
                        dao.persist(param);
                    }
                }
            }

            body.put("success", true);
            return body;
        } catch (Exception e) {
        }
        body.put("success", false);
        return body;
    }
}
