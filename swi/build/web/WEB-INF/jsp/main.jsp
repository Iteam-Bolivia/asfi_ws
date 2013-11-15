<%-- 
    Document   : Main Application View, Main Page
    Created on : 07-10-2013, 10:41:00
    Author     : Johns Castillo Valencia 
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<!DOCTYPE html>
<html>
    <head>
        <title>SWI</title>

        <%@include file="ExtJSScripts-ES.jsp"%>     
        
        <script type="text/javascript" src="menu"></script>
        <!-- TabsClose Menu  -->   
        <script type="text/javascript" src="js/ui/TabCloseMenu-ES.js"></script>
        <!-- Main Application CSS and JS -->        
        <link rel="stylesheet" type="text/css" href="css/swi-main.css" />        
        <script type="text/javascript" src="js/ui/swi-mainpanel.js"></script>
    </head>

    <body>
        <!-- Fields required for history management -->
        <form id="history-form" class="x-hidden">
            <input type="hidden" id="x-history-field" />
            <iframe id="x-history-frame"></iframe>
        </form>

        <div id="header">
            <div style="position: absolute; left: 10px">
                <h1>SWI</h1>            
                <p>Servicios de Informaci&oacute;n Institucional<p>             
            </div>                              
        </div>

        <div id="footer">                      
            <p><p> 
        </div>

        <div style="display:none;"></div>
            <!-- Start page content -->
            <div id="start-div">
                <div style="float:left;padding-right:10px"><img alt="" src="images/uif2.png" width="100"/></div>
            
            </div>
    </body>
</html>
