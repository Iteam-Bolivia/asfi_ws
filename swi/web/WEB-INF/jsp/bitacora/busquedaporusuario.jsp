<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html lang="es">
    <head>
        <title>Page 1</title>    
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%>                       
        <script type="text/javascript">

            Ext.ns('domain');

            domain.View = {
                init: function() {

                    new Ext.Viewport({
                        layout: 'fit',
                        frame: true,
                        border: false,
                        items: new Ext.Panel({
                            title: 'Busqueda por usuario',
                            frame: true,
                            border: false,
                            layout: 'fit'
                        })
                    });
                }
            }

            Ext.onReady(domain.View.init, domain.View);

        </script>
    </head>
    <body>     

    </body>
</html>

