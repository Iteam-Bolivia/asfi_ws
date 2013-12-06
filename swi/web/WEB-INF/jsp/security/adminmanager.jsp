<%-- 
    Document   : Admin Manager View
    Created on : 18-03-2013, 02:30:51 PM
    Author     : Johns Castillo Valencia
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
    <head>
        <title>Admin Maanager</title>    
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES_.jsp"%>   
            
        <script type="text/javascript" src="<c:url value="/extjs/sitmax/public/persona"/>"></script>
        <script type="text/javascript" src="<c:url value="/extjs/sitmax/public/funcionario"/>"></script>        
        <script type="text/javascript" src="<c:url value="/js/personas/personas-tools.js"/>"></script> 
        <script type="text/javascript" src="<c:url value="/js/security/password-vtype.js"/>"></script> 
        <script type="text/javascript" src="<c:url value="/js/security/admin-manager.js"/>"></script> 
        <c:set var="now" value="<%=new java.util.Date()%>" />
        <script type="text/javascript">
            var _servertime = ${now.time};
        </script>
    </head>
    <body>     
        
    </body>
</html>

