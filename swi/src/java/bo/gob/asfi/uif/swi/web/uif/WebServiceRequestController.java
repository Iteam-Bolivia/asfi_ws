/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Bitacora;
import bo.gob.asfi.uif.swi.model.Servidor;
import bo.gob.asfi.uif.swi.model.UserService;
import com.icg.entityclassutils.DynamicEntityMap;
import com.predic8.membrane.client.core.util.FormParamsExtractor;
import com.predic8.wsdl.Definitions;
import com.predic8.wsdl.WSDLParser;
import com.predic8.wstool.creator.RequestCreator;
import com.predic8.wstool.creator.RequestTemplateCreator;
import com.predic8.wstool.creator.SOARequestCreator;
import com.predic8.wstool.creator.TemplateUtil;
import groovy.xml.MarkupBuilder;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.soap.MessageFactory;
import javax.xml.soap.MimeHeaders;
import javax.xml.soap.SOAPConnection;
import javax.xml.soap.SOAPConnectionFactory;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPMessage;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author John Castillo V. john.gnu@gmail.com
 */
@Controller
public class WebServiceRequestController {
    
    @Autowired
    Dao dao;
    private Map<String, Definitions> serverDefinitions = new HashMap<String, Definitions>();
    
    private Definitions getDefinitios(String id) {
        Definitions defs = serverDefinitions.get(id);
        if (defs == null) {
            Servidor s = dao.get(Servidor.class, new Long(id));
            WSDLParser parser = new WSDLParser();
            defs = parser.parse(s.getWsdlurl());
            serverDefinitions.put(id, defs);
        }
        return defs;
    }

    /**
     * WebService System Request Invoca un servicio habilitado en el sistema Se
     * registra en Bitacora
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/webservicesystem", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> webServiceSystemRequest(HttpServletRequest request) {
        Map<String, Object> body = new HashMap<String, Object>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Bitacora bit = new Bitacora();
        bit.setUsuario(auth.getName());
        bit.setFecha(new Date());
        try {
            Map<String, Object> params = DynamicEntityMap.requestMapToEntityMap(request.getParameterMap());
            
            UserService us = dao.get(UserService.class, new Integer(params.get("_swi_userservice_id_").toString()));
            String[] routerparts = us.getRouter().split(":");
            String serverid = routerparts[0];
            bit.setServicio(us.getNombre());
            //reate body
            StringWriter writer = new StringWriter();
            //SOAPRequestCreator constructor: SOARequestCreator(Definitions, Creator, MarkupBuilder)
            SOARequestCreator creator = new SOARequestCreator(getDefinitios(serverid), new RequestTemplateCreator(), new MarkupBuilder(writer));
            creator.createRequest(routerparts[2], routerparts[3], routerparts[4]);
            
            FormParamsExtractor sp = new FormParamsExtractor();
            //System.out.println(sp.extract(writer.toString()));

            Map<String, String> map = sp.extract(writer.toString());
            
            for (Entry<String, Object> entry : params.entrySet()) {
                map.put("xpath:/" + routerparts[3] + "/" + entry.getKey(), entry.getValue().toString());
            }
            
            StringWriter writer2 = new StringWriter();
            SOARequestCreator creator2 = new SOARequestCreator(getDefinitios(serverid), new RequestCreator(), new MarkupBuilder(writer2));
            creator2.setFormParams(map);
            creator2.createRequest(routerparts[2], routerparts[3], routerparts[4]);

            //System.out.println(writer2.toString());
            bit.setRequest(writer2.toString());
            String url = us.getUrl(); //EndPoint url
            System.out.println("Operation EndPoint: " + url);
            // Create SOAP Connection
            SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
            SOAPConnection soapConnection = soapConnectionFactory.createConnection();
            SOAPMessage soapResponse = soapConnection.call(getSoapMessageFromString(writer2.toString()), url);
            
            String response = printSOAPResponse(soapResponse);
            bit.setResponse(response);
            System.out.println(response);
            //response = response.replaceAll("<", "&lt;");
            //response = response.replaceAll(">", "&gt;");
            
            List<Map<String, String>> lst = new SOAPProcessor().parseXML(response, us.getResponseXpath());
            
            body.put("result", lst);
            body.put("id", params.get("_swi_userservice_id_"));
            body.put("success", Boolean.TRUE);
            soapConnection.close();
        } catch (Exception e) {
            e.printStackTrace();
            body.put("success", Boolean.FALSE);
        }
        dao.persist(bit);
        return body;
    }
    
    private SOAPMessage getSoapMessageFromString(String xml) throws SOAPException, IOException {
        MessageFactory factory = MessageFactory.newInstance();
        SOAPMessage message = factory.createMessage(new MimeHeaders(), new ByteArrayInputStream(xml.getBytes(Charset.forName("UTF-8"))));
        return message;
    }
    
    private String printSOAPResponse(SOAPMessage soapResponse) throws Exception {
        StringWriter writer2 = new StringWriter();
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        Source sourceContent = soapResponse.getSOAPPart().getContent();
        System.out.print("\nResponse SOAP Message = ");
        StreamResult result = new StreamResult(writer2);
        transformer.transform(sourceContent, result);
        return writer2.toString();
    }

    /**
     * WebService World Request Invoca un servicio generico anonimamente
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/webserviceworld", method = RequestMethod.POST)
    public @ResponseBody
             Map<String, ? extends Object> /*String*/ webServiceWorldRequest(Model model, HttpServletRequest request) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            Map<String, Object> params = DynamicEntityMap.requestMapToEntityMap(request.getParameterMap());

            //UserService us = dao.get(UserService.class, new Integer(params.get("_swi_userservice_id_").toString()));
            String[] routerparts = params.get("__router_swi_var").toString().split(":");//us.getRouter().split(":");
            String serverid = routerparts[0];
            //reate body
            StringWriter writer = new StringWriter();
            //SOAPRequestCreator constructor: SOARequestCreator(Definitions, Creator, MarkupBuilder)
            SOARequestCreator creator = new SOARequestCreator(getDefinitios(serverid), new RequestTemplateCreator(), new MarkupBuilder(writer));
            creator.createRequest(routerparts[2], routerparts[3], routerparts[4]);
            
            FormParamsExtractor sp = new FormParamsExtractor();
            //System.out.println(sp.extract(writer.toString()));

            Map<String, String> map = sp.extract(writer.toString());
            
            for (Entry<String, Object> entry : params.entrySet()) {
                map.put("xpath:/" + routerparts[3] + "/" + entry.getKey(), entry.getValue().toString());
            }
            
            StringWriter writer2 = new StringWriter();
            SOARequestCreator creator2 = new SOARequestCreator(getDefinitios(serverid), new RequestCreator(), new MarkupBuilder(writer2));
            creator2.setFormParams(map);
            creator2.createRequest(routerparts[2], routerparts[3], routerparts[4]);

            //System.out.println(writer2.toString());

            String url = params.get("__endpoint_swi_var").toString(); //EndPoint url
            System.out.println("Operation EndPoint: " + url);
            // Create SOAP Connection
            SOAPConnectionFactory soapConnectionFactory = SOAPConnectionFactory.newInstance();
            SOAPConnection soapConnection = soapConnectionFactory.createConnection();
            SOAPMessage soapResponse = soapConnection.call(getSoapMessageFromString(writer2.toString()), url);
            
            String response = printSOAPResponse(soapResponse);
            
            response = response.replaceAll("<", "&lt;");
            response = response.replaceAll(">", "&gt;");
                        
            body.put("result", response);
            model.addAttribute("result", response);
            //body.put("id", params.get("_swi_userservice_id_"));
            body.put("success", Boolean.TRUE);
            soapConnection.close();
        } catch (Exception e) {
            e.printStackTrace();
            body.put("success", Boolean.FALSE);
        }
        return body;
        //return "xml";
    }
}
