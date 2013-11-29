/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package xmlparser;

/**
 *
 * @author John
 */
import java.util.List;
import com.predic8.schema.*;
import static com.predic8.schema.Schema.*;
import com.predic8.soamodel.Consts;
import com.predic8.wsdl.Definitions;
import com.predic8.wsdl.WSDLParser;

public class ListSchemaElements {

    Schema schema;

    private static void out(String str) {
        System.out.println(str);
    }

    public static void main(String[] args) {

        WSDLParser parser = new WSDLParser();
        //http://www.webservicex.com/globalweather.samx?WSDL
        //Definitions wsdl = parser.parse("http://localhost:8080/WebApplication1/NewWebService?WSDL");
        //http://www.bccs.uni.no/~pve002/wsdls/ebi-mafft.wsdl
        //Definitions wsdl = parser.parse("http://www.bccs.uni.no/~pve002/wsdls/ebi-mafft.wsdl");
        //http://www.webservicex.com/globalweather.asmx?WSDL
        Definitions wsdl = parser.parse("http://www.webservicex.com/globalweather.asmx?WSDL");
        //for (Schema schema : wsdl.getSchemas()) {

        Schema schema = wsdl.getSchemas().get(0);
            out("-------------- Schema Information --------------");
            out("  Schema TargetNamespace: " + schema.getTargetNamespace());
            out("  AttributeFormDefault: " + schema.getAttributeFormDefault());
            out("  ElementFormDefault: " + schema.getElementFormDefault());
            out("");
            (new ListSchemaElements()).dump(schema);
        //}
        //(new ListSchemaElements()).dump();
    }

    private void dump(Schema schema) {
        //SchemaParser parser = new SchemaParser();
        //schema = parser.parse("samples/xsd/human-resources.xsd");
        System.out.println(schema.getTargetNamespace());
        for (Element element : schema.getElements()) {
            dump(element);
        }
        for (ComplexType ct : schema.getComplexTypes()) {
            dump(ct);
        }

//        Element ssize = schema.newElement("shoesize", INT);
//        ComplexType ct = schema.getComplexType("PersonType");
//        Sequence seq = ct.getSequence();
//        if (seq == null) {
//            throw new RuntimeException("No Sequence in ComplexType PersonType!");
//        }
//        seq.getParticles().add(ssize);
        
//        dump(ct);
    }

    private void dump(ComplexType ct) {
        System.out.println(ct.getName());
        System.out.println("Attributes: -----------------------------");
        for (Attribute attr : ct.getAttributes()) {
            System.out.println(attr.getName());
        }
        if (ct.getModel() instanceof Sequence) {
            Sequence seq = (Sequence) ct.getModel();

            for (Element em : (List<Element>) seq.getElements()) {
                dump(em);
            }
        }
    }

    void dump(TypeDefinition td) {
        System.out.println(td.getName());
    }

    private void dump(Element em) {
        System.out.print(em.getName());
        if (em.getEmbeddedType() != null) {
            dump(em.getEmbeddedType());
        } else {
            if (em.getType().getNamespaceURI() == Consts.SCHEMA_NS) {
                System.out.println(", type= 'xsd:" + em.getType().getLocalPart() + "'");
            } else {
                System.out.println(", type= 'tns:" + em.getType().getLocalPart() + "'");
            }
        }
    }
}
