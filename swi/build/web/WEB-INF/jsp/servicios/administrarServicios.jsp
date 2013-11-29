<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html lang="es">
    <head>
        <title>Administrar servicios</title>    
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%>   
        <!-- overrides to base library -->
                <link rel="stylesheet" type="text/css" href="/ext-3.3.1/examples/ux/gridfilters/css/GridFilters.css" />
                <link rel="stylesheet" type="text/css" href="/ext-3.3.1/examples/ux/gridfilters/css/RangeMenu.css" />
        <!-- extensions -->
                <script type="text/javascript" src="/ext-3.3.1/examples/ux/gridfilters/menu/RangeMenu.js"></script>
                <script type="text/javascript" src="/ext-3.3.1/examples/ux/gridfilters/menu/ListMenu.js"></script>
        
                <script type="text/javascript" src="/ext-3.3.1/examples/ux/gridfilters/GridFilters.js"></script>
                <script type="text/javascript" src="/ext-3.3.1/examples/ux/gridfilters/filter/Filter.js"></script>
                <script type="text/javascript" src="/ext-3.3.1/examples/ux/gridfilters/filter/StringFilter.js"></script>
                <script type="text/javascript" src="/ext-3.3.1/examples/ux/gridfilters/filter/DateFilter.js"></script>
                <script type="text/javascript" src="/ext-3.3.1/examples/ux/gridfilters/filter/ListFilter.js"></script>
                <script type="text/javascript" src="/ext-3.3.1/examples/ux/gridfilters/filter/NumericFilter.js"></script>
                <script type="text/javascript" src="/ext-3.3.1/examples/ux/gridfilters/filter/BooleanFilter.js"></script>


<!--        <link rel="stylesheet" type="text/css" href="<c:url value="/js/gridsearch-1.1/css/Ext.ux.grid.RowActions.css"/>">
        <link rel="stylesheet" type="text/css" href="<c:url value="/js/gridsearch-1.1/css/gridsearch.css"/>">
        <script type="text/javascript" src="<c:url value="/js/gridsearch-1.1/js/Ext.ux.grid.Search.js"/>"></script>
        <script type="text/javascript" src="<c:url value="/js/gridsearch-1.1/js/Ext.ux.grid.RowActions.js"/>"></script>-->


<!--        <script type="text/javascript" src="<c:url value="/js/personas/personas-tools.js"/>"></script> -->
        <script type="text/javascript" src="<c:url value="/js/security/password-vtype.js"/>"></script> 
        <script type="text/javascript" src="<c:url value="/js/Ext-Buscador-Grid.js"/>"></script> 
        
        
        
        
        <script type="text/javascript" src="<c:url value="/js/servicios/service-manager.js"/>"></script> 
    </head>
    <body>     

    </body>
</html>

