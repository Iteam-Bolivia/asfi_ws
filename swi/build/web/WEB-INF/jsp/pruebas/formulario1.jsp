<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
    <head>
        <title>Formulario 1</title>    
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%>                       
    </head>
    <script type="text/javascript">

        Ext.ns('domain');
        domain.Main = {
            init: function() {
                var form = new Ext.form.FormPanel({
                    title: 'Guardar Persona',
                    width: 400,
                    url: Ext.SROOT + 'guardarpersona',
                    bodyStyle: 'padding:10px',
                    items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Nombre ',
                            name: 'nombre'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Apellido paterno',
                            name: 'paterno'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Apellido materno',
                            name: 'materno'
                        }],
                    buttons: [{
                            text: 'Guardar',
                            handler: function() {
                                form.getForm().submit({                                    
                                    success: function(form, action) {
                                        
                                    },
                                    failure: function(form, action) {
                                        
                                    }
                                });
                            }
                        }]
                });

                form.render('form');

            }
        }


        Ext.onReady(domain.Main.init, domain.Mainr);
    </script>
</script>
<body>     
    <div id="form"></div>
    <div id="grid"></div>
</body>
</html>

