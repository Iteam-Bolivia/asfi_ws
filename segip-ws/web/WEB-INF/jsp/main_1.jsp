<%-- 
    Document   : main
    Created on : 15-nov-2013, 7:17:55
    Author     : John
--%>

<%@page contentType="text/xml" pageEncoding="UTF-8"%>

<!-- Segip Service WADL -->

<application xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
	     xsi:schemaLocation="http://research.sun.com/wadl/2006/10 
                    https://wadl.dev.java.net/wadl20061109.xsd"
	     xmlns="http://research.sun.com/wadl/2006/10"
             xmlns:zestimate="urn:zillow:zestimate"        
             xmlns:chart="urn:zillow:chart"  
             xmlns:regionchart="urn:zillow:regionchart"   
             xmlns:comps="urn:zillow:comps" 
             xmlns:demographics="urn:zillow:demographics" 
             xmlns:regionchildren="urn:zillow:regionchildren" 
             xmlns:searchresults="urn:zillow:searchresults" >
    <grammars/>
        
    <resources base="/service">
        <resource path="getform">
            <method name="GET" id="getform">
                <doc xml:lang="es">
                    Retorna los campos para realizar una consulta en el servicio
                </doc>
                <request>
                    <param name="nombres" type="xsd:string" style="query" required="true">
                        <doc xml:lang="es">
                            Nombres de la persona
                        </doc>
                    </param>
                    <param name="ci" type="xsd:string" style="query" required="true">
                        <doc xml:lang="es">
                            Numero de de la cedula de identidad
                        </doc>
                    </param>
                    <param name="paterno" type="xsd:string" style="query" required="true">
                        <doc xml:lang="es">
                            Apellido paterno de la persona
                        </doc>
                    </param>
                    <param name="materno" type="xsd:string" style="query" required="true">
                        <doc xml:lang="es">
                            Apellido materno de la persona
                        </doc>
                    </param>
                    <param name="height" type="xsd:string" style="query" required="false">
                        <doc xml:lang="en">
                            
                        </doc>
                    </param>
                    <param name="chartduration" type="xsd:string" style="query" required="false">
                        <doc xml:lang="en">
                            Optional. The period for which data is shown in the chart. Defaults to 1 year.
                            Values can be "1year", "5years", or "10years".
                        </doc>
                    </param>
                </request>
                <response>
                    <representation mediaType="text/json"/>
                </response>
            </method>
        </resource>       
    </resources>
</application>


