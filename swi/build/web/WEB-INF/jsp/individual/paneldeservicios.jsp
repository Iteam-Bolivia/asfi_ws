<%--
    Document   : Panel de servicios
    Created on : 29-11-2013, 09:55:10 PM
    Author     : John Castillo Valencia
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>

<!DOCTYPE HTML>
<html lang="es">
    <head>
        <title>Panel de servicios</title>
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%> 
        <style type="text/css">
            #all-demos {

            }
            #all-demos dd {
                cursor:pointer;
                float:left;
                height:100px;
                margin:5px 5px 5px 10px;
                width:300px;
                zoom:1;
            }
            #all-demos dd img {
                border: 1px solid #ddd;
                float:left;
                height:90px;
                margin:5px 0 0 5px;
                width:120px;
            }

            #all-demos dd div {
                float:left;
                margin-left:10px;
                width:160px;
            }

            #all-demos dd h4 {
                color:#555;
                font-size:11px;
                font-weight:bold;
            }
            #all-demos dd p {
                color:#777;
            }
            #all-demos dd.over {
                background: #F5FDE3 url(shared/extjs/images/sample-over.gif) no-repeat;
            }
            #loading-mask{
                background-color:white;
                height:100%;
                position:absolute;
                left:0;
                top:0;
                width:100%;
                z-index:20000;
            }
            #loading{
                height:auto;
                position:absolute;
                left:45%;
                top:40%;
                padding:2px;
                z-index:20001;
            }
            #loading a {
                color:#225588;
            }
            #loading .loading-indicator{
                background:white;
                color:#444;
                font:bold 13px Helvetica, Arial, sans-serif;
                height:auto;
                margin:0;
                padding:10px;
            }
            #loading-msg {
                font-size: 10px;
                font-weight: normal;
            }

            #all-demos .x-panel-body {
                background-color:#fff;
                border:1px solid;
                border-color:#fafafa #fafafa #fafafa #fafafa;
            }
            #sample-ct {
                border:1px solid;
                border-color:#dadada #ebebeb #ebebeb #dadada;
                padding:2px;
            }

            #all-demos h2 {
                border-bottom: 2px solid #99bbe8;
                cursor:pointer;
                padding-top:6px;
            }
            #all-demos h2 div {
                background:transparent url(../resources/images/default/grid/group-expand-sprite.gif) no-repeat 3px -47px;
                color:#3764a0;
                font:bold 11px Helvetica, Arial, sans-serif;
                padding:4px 4px 4px 17px;
            }
            #all-demos .collapsed h2 div {
                background-position: 3px 3px;
            }
            #all-demos .collapsed dl {
                display:none;
            }
            .x-window {
                text-align:left;
            }
            #all-demos dd h4 span.new-sample{
                color: red;
            }

            #all-demos dd h4 span.updated-sample{
                color: blue;
            }
        </style>        
        
        <script type="text/javascript" src="js/servicios/serviceview-init.js"></script>
    </head>
    <body>

    </body>
</html>


