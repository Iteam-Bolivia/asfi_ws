/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package xmlparser;

/**
 *
 * @author John
 */
import com.google.gson.Gson;
import com.predic8.membrane.client.core.util.FormParamsExtractor;
import com.predic8.schema.Element;
import groovy.xml.MarkupBuilder;
import java.io.StringWriter;
import com.predic8.wsdl.Definitions;
import com.predic8.wsdl.WSDLParser;
import com.predic8.wstool.creator.RequestTemplateCreator;
import com.predic8.wstool.creator.RequestTemplateCreatorContext;
import com.predic8.wstool.creator.SOARequestCreator;

public class CreateSOAPRequestTemplate {

    private static void printTemplate(Element e) {

        StringWriter writer = new StringWriter();
        RequestTemplateCreator creator = new RequestTemplateCreator();
        creator.setBuilder(new MarkupBuilder(writer));
        e.create(creator, new RequestTemplateCreatorContext());
        System.out.println(writer);

    }

    public static void main(String[] args) throws Exception {

        WSDLParser parser = new WSDLParser();

        //Definitions wsdl = parser.parse("http://localhost:8080/WebApplication1/NewWebService?WSDL");
        Definitions wsdl = parser.parse("http://localhost:8080/WebApplication1/NewWebService?WSDL");

        StringWriter writer = new StringWriter();

        //SOAPRequestCreator constructor: SOARequestCreator(Definitions, Creator, MarkupBuilder)
        SOARequestCreator creator = new SOARequestCreator(wsdl, new RequestTemplateCreator(), new MarkupBuilder(writer));

        Object o = creator.createRequest("NewWebServicePort", "sumar", "NewWebServicePortBinding");
        System.out.println(o);
        FormParamsExtractor sp = new FormParamsExtractor();
        System.out.println(sp.extract(writer.toString()));


        creator.setFormParams(sp.extract(writer.toString()));

        //creator.createRequest(PortType name, Operation name, Binding name);


        System.out.println(writer.toString());


        Gson g = new Gson();
        //System.out.println(g.toJson(sp.extract(writer.toString())));


    }
}
