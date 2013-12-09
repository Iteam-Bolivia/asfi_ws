/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import xmlparserjson.ConvertXMLtoJSON;

/**
 *
 * @author John
 */
public class ParserXml {

    public static void main(String args[]) {
        String xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
"  <soap:Body>\n" +
"    <m:ListOfContinentsByNameResponse xmlns:m=\"http://www.oorsprong.org/websamples.countryinfo\">\n" +
"      <m:ListOfContinentsByNameResult>\n" +
"        <m:tContinent>\n" +
"          <m:sCode>AF</m:sCode>\n" +
"          <m:sName>Africa</m:sName>\n" +
"        </m:tContinent>\n" +
"        <m:tContinent>\n" +
"          <m:sCode>AN</m:sCode>\n" +
"          <m:sName>Antarctica</m:sName>\n" +
"        </m:tContinent>\n" +
"        <m:tContinent>\n" +
"          <m:sCode>AS</m:sCode>\n" +
"          <m:sName>Asia</m:sName>\n" +
"        </m:tContinent>\n" +
"        <m:tContinent>\n" +
"          <m:sCode>EU</m:sCode>\n" +
"          <m:sName>Europe</m:sName>\n" +
"        </m:tContinent>\n" +
"        <m:tContinent>\n" +
"          <m:sCode>OC</m:sCode>\n" +
"          <m:sName>Ocenania</m:sName>\n" +
"        </m:tContinent>\n" +
"        <m:tContinent>\n" +
"          <m:sCode>AM</m:sCode>\n" +
"          <m:sName>The Americas</m:sName>\n" +
"        </m:tContinent>\n" +
"      </m:ListOfContinentsByNameResult>\n" +
"    </m:ListOfContinentsByNameResponse>\n" +
"  </soap:Body>\n" +
"</soap:Envelope>";
        ConvertXMLtoJSON convx = new ConvertXMLtoJSON();
        String jsonStr = convx.convert(xml);
        
        System.out.println(jsonStr);
    }
}
