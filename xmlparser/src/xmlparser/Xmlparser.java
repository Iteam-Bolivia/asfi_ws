/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package xmlparser;

import com.predic8.membrane.client.core.util.SOAModelUtil;
import com.predic8.schema.ComplexType;
import com.predic8.schema.Element;
import com.predic8.wsdl.AbstractSOAPBinding;
import com.predic8.wsdl.BindingOperation;
import com.predic8.wsdl.Definitions;
import com.predic8.wsdl.Operation;
import com.predic8.wsdl.Port;
import com.predic8.wsdl.Service;
import com.predic8.wsdl.WSDLParser;
import com.predic8.wstool.creator.RequestTemplateCreator;
import com.predic8.wstool.creator.RequestTemplateCreatorContext;
import groovy.xml.MarkupBuilder;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author John
 */
public class Xmlparser {

//    private static void listParameters(Element element) {
//        ComplexType ct = (ComplexType) element.getEmbeddedType();
//        for (Element e : ct.getSequence().getElements()) {
//            System.out.println(e.getName() + " " + e.getType());
//        }
//    }
    private static void printTemplate(Element e) {
        StringWriter writer = new StringWriter();
        RequestTemplateCreator creator = new RequestTemplateCreator();
        creator.setBuilder(new MarkupBuilder(writer));
        e.create(creator, new RequestTemplateCreatorContext());
        System.out.println(writer);
    }

    private static ArrayList<String> listParameters(Element element) {

        ArrayList<String> listElement = new ArrayList<>();
        ComplexType ct = (ComplexType) element.getEmbeddedType();

        if (ct == null) {
            ct = element.getSchema().getComplexType(element.getType().getLocalPart());
        }
        System.out.println("--------------------------");
        System.out.println(ct.getSequence());
        System.out.println("--------------------------");
//        for (Element e : ct.getSequence().getElements()) {
//            listElement.add(e.getName() + " " + e.getType().getLocalPart());
//
//        }

        return listElement;
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        WSDLParser parser = new WSDLParser();

        try {
            Definitions defs = parser
                    .parse("http://www.bccs.uni.no/~pve002/wsdls/ebi-mafft.wsdl");
                    //.parse("http://localhost:8080/WebApplication1/NewWebService?WSDL");
                    //.parse("http://www.esendex.com/secure/messenger/soap/SendService.asmx?wsdl");
                    //.parse("https://testservices.gatewayedi.com/PayerList/payerlist.asmx?wsdl");
                    //.parse("http://www.webservicex.com/globalweather.asmx?WSDL");

            System.out.println(defs.getAllWSDLs().size());
            System.out.println(defs.getMessages().size());

            for (Service pt : defs.getServices()) {
                System.out.println("==============================");
                System.out.println(pt.getName());

                for (Port port : pt.getPorts()) {
                    System.out.println("    " + port.getName());
                    System.out.println("    " + port.getDocumentation());
                    System.out.println("    " + port.getBinding().getName());
                    //System.out.println("    " + port.);
                    for (BindingOperation op : port.getBinding().getOperations()) {
                        System.out.println(" ---- " + op.getName());
                        System.out.println(" ---- " + (op.getBinding().getBinding() instanceof AbstractSOAPBinding));
                        System.out.println(" ---- " + SOAModelUtil.getPortTypeName(op));

                        //SoapCreatorUtil creator = new SoapCreatorUtil(op.getDefinitions());
                        //creator.buildComposite(SOAModelUtil.getPortTypeName(op), op.getName(), op.getBinding().getName());


                        Operation operation = defs.getOperation(op.getName(), SOAModelUtil.getPortTypeName(op));
                        System.out.println(" ---- Operation -- " + operation.getName());
                        System.out.println(" ---- Operation -- " + operation.getInput().getMessage());
                        System.out.println("Request Template");
                        //printTemplate(defs.getElement(operation.getInput().getMessage().getParts().get(0).getElement()));
                        //listParameters(defs.getElement(operation.getInput().getMessage().getParts().get(0).getElement()));
                        Element el = operation.getInput().getMessage().getParts().get(0).getElement();
                        System.out.println(el);
                        if (el != null) {
                            List<String> lstp = listParameters(el);
                            for (String sp : lstp) {
                                System.out.println("==== " + sp);
                            }
                            Element el3 = operation.getOutput().getMessage().getParts().get(0).getElement();
                            System.out.println(el3);

                            List<String> lstp3 = listParameters(el3);
                            for (String sp : lstp3) {
                                System.out.println("==== " + sp);
                            }

                        }

//                            System.out.println("Response Template");
//                            //printTemplate(defs.getElement(operation.getInput().getMessage().getParts().get(0).getElement()));
//                            //listParameters(defs.getElement(operation.getInput().getMessage().getParts().get(0).getElement()));
//                            Element rel = operation.getOutput().getMessage().getParts().get(0).getElement();
//                            System.out.println(rel);
//                            List<String> rlstp = listParameters(rel);
//                            for (String sp : rlstp) {
//                                System.out.println(sp);
//                            }
//                        } else {
//                            System.err.println("no operation implemented yet ");
//                        }
                    }
                }
            }

            //CompositeCreatorContext ccCtx = new CompositeCreatorContext();



//            for (PortType pt : defs.getPortTypes()) {
//                System.out.println(pt.getName());
//                
//                for (Operation op : pt.getOperations()) {
//                    System.out.println(" -" + op.getName());
//                    System.out.println(" -" + op.getInput().getMessage().getParts().size());
//                }
//                
//            }

//            for (Binding pt : defs.getBindings()) {
//                System.out.println(pt.getName());
//                for (BindingOperation op : pt.getOperations()) {
//                    System.out.println(" -" + op.getName());
//                    //System.out.println(" -" + op.getNamespaceUri());
//                }
//            }
//            Gson g = new Gson();
//            System.out.println(g.toJson(defs.getSchemas().size()));
//            for (Schema sch : defs.getSchemas()) {
//                
//                System.out.println(sch.getAsString());
//                System.out.println("----------------------");
//            }


        } catch (Exception e) {
            System.err.println("La fuente no es un WS valido");
            e.printStackTrace();
        }
//}















//
//        WADLParser pa =  new WADLParser();
//        Application app = pa.parse("http://localhost:8080/segip-ws/wadl.xml");
//        for(Resources rs : app.getRscss()) {
//            
//            System.out.println(rs.getBase());
//        }


    }
//    private static void createHeaders(BindingOperation bOp, Message msg, Definitions definitions) {
//		for (AbstractSOAPHeader header : bOp.getInput().getSOAPHeaders()) {
//			definitions.getElement(msg.getPart(header.getPart()).getElement())
//					.create(this, new CompositeCreatorContext());
//                    //definitions.getElement(null).
//		}
//	}
}
