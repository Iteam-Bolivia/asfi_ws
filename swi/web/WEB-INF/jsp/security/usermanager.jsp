<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
    <head>
        <title>User Maanager</title>    
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%>   
            
        <script type="text/javascript" src="<c:url value="/extjs/sitmax/public/persona"/>"></script>
        <script type="text/javascript" src="<c:url value="/extjs/sitmax/public/funcionario"/>"></script>        
        <script type="text/javascript" src="<c:url value="/js/personas/personas-tools.js"/>"></script> 
        <script type="text/javascript" src="<c:url value="/js/security/password-vtype.js"/>"></script> 
        <script type="text/javascript" src="<c:url value="/js/security/user-manager.js"/>"></script> 
    </head>
    <body>     
        
    </body>
</html>

