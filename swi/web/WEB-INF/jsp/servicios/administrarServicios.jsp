<%--
    Document   : Administrar serviciosd
    Created on : 30-11-2013, 07:05:10 PM
    Author     : John Castillo Valencia
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html lang="es">
    <head>
        <title>Administrar servicios</title>    
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%>   
	<script type="text/javascript" src="libs/syntaxhighlighter_3.0.83/scripts/shCore.js"></script>
	<script type="text/javascript" src="libs/syntaxhighlighter_3.0.83/scripts/shBrushJScript.js"></script>
	<link type="text/css" rel="stylesheet" href="libs/syntaxhighlighter_3.0.83/styles/shCoreDefault.css"/>
	<script type="text/javascript">SyntaxHighlighter.all();</script>
        
        <script type="text/javascript" src="<c:url value="/js/servicios/service-manager.js"/>"></script> 
    </head>
    <body>     

    </body>
</html>

