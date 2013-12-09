/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

/**
 *
 * @author John
 */
import com.google.gson.Gson;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class SOAPProcessor {

    public static void main(String argv[]) throws FileNotFoundException, SAXException, IOException, XPathExpressionException {

        try {

            //String expression = "Envelope/Body/ListOfContinentsByNameResponse/ListOfContinentsByNameResult/tContinent";
            //String expression = "Envelope/Body/sumarResponse";
            //String expression = "/Envelope/Body/GetWeatherResponse";
            String expression = "/Envelope/Body/ListOfCountryNamesByNameResponse/ListOfCountryNamesByNameResult";

            SOAPProcessor xp = new SOAPProcessor();
            List<Map<String, String>> lst = xp.parseXML(new FileInputStream("D:/xml/input4.xml"), expression);
            Gson g = new Gson();
            System.out.println(g.toJson(lst));

        } catch (Exception e) {
            e.printStackTrace();
        }


    }
    //Document xmlDocument = builder.parse(new ByteArrayInputStream(xml.getBytes()));

    public List<Map<String, String>> parseXML(Document document, String expression) throws ParserConfigurationException, SAXException, IOException, XPathExpressionException {
        List<Map<String, String>> lst = new ArrayList<Map<String, String>>();
        //DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
        //DocumentBuilder builder = builderFactory.newDocumentBuilder();
        XPath xPath = XPathFactory.newInstance().newXPath();

        //read a nodelist using xpath
        NodeList nodeList = (NodeList) xPath.compile(expression).evaluate(document, XPathConstants.NODESET);
        System.out.println("Node Selected Length: " + nodeList.getLength());
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node n = nodeList.item(i);
            Map<String, String> map = new HashMap<String, String>();
            for (int j = 0; j < n.getChildNodes().getLength(); j++) {
                Node n2 = n.getChildNodes().item(j);
                if (n2.getNodeType() == Node.ELEMENT_NODE) {
                    map.put(n2.getNodeName(), n2.getTextContent());
                }
            }
            lst.add(map);
        }
        return lst;
    }

    public List<Map<String, String>> parseXML(FileInputStream file, String expression) throws ParserConfigurationException, SAXException, IOException, XPathExpressionException {
        DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = builderFactory.newDocumentBuilder();
        
        //Reader reader = new InputStreamReader(file,"UTF-8");
 
        //InputSource is = new InputSource(reader);
        
        return parseXML(builder.parse(file), expression);
    }

    public List<Map<String, String>> parseXML(String xml, String expression) throws ParserConfigurationException, SAXException, IOException, XPathExpressionException {
        DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();        
        DocumentBuilder builder = builderFactory.newDocumentBuilder();        
        return parseXML(builder.parse(new ByteArrayInputStream(xml.getBytes())), expression);
    }
}
