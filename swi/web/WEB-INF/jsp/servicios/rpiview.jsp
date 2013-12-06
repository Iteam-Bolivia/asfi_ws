<%--
    Document   : Vista de RPI
    Created on : 30-11-2013, 07:05:10 PM
    Author     : John Castillo Valencia
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<!DOCTYPE HTML>
<html lang="es">
    <head>
        <title>Vista de RPI</title>
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%>  

        <script type="text/javascript">
            Ext.namespace('domain');
            domain.Manager = {
                individual: function(options) {
                    var serviceResponse;
                    Ext.Ajax.request({
                        url: Ext.SROOT + 'paneldeservicios/formserviceitems',
                        method: 'POST',
                        params: {
                            id: options.id
                        },
                        success: function(result, request) {
                            var sfields = Ext.util.JSON.decode(result.responseText);
                            sfields.push({
                                xtype: 'hidden',
                                name: '_swi_userservice_id_',
                                value: options.id
                            });
                            var form = new Ext.FormPanel({
                                url: Ext.SROOT + 'wsrwquest',
                                border: false,
                                autoHeight: true,
                                region: 'center',
                                bodyStyle: 'padding:10px',
                                labelWidth: 130,
                                frame: true,
                                labelAlign: 'top',
                                defaults: {
                                    msgTarget: 'side'
                                },
                                items: sfields,
                                tbar: [{
                                        text: 'Ejecutar',
                                        iconCls: 'play',
                                        tooltip: 'Llamar la operaci&oacute;n del servicio',
                                        handler: function() {
                                            form.getForm().submit({
                                                waitMsg: 'Enviando...',
                                                success: function(form, action) {
                                                    serviceResponse = Ext.util.JSON.decode(action.response.responseText);
                                                    win.getEl().unmask();
                                                    win.remove(1);
                                                    win.add({
                                                        xtype: 'panel',
                                                        title: 'Resultado',
                                                        bodyStyle: 'padding:10px',
                                                        autoScroll: true,
                                                        height: 200,
                                                        html: '<pre>' + serviceResponse.result + '</pre>'
                                                    });
                                                    win.doLayout();
                                                },
                                                failure: function(form, action) {
                                                    //Ext.Msg.alert('Warning', action.result.errorMessage);
                                                    //options.error('Error interno',action.result.errorMessage);
                                                    //domain.errors.submitFailure('Error interno', action.result.errorMessage);
                                                }
                                            });
                                        }
                                    }]
                            });
                            
                            var win = new Ext.Window({
                                title: 'Registrar Usuario',
                                autoScroll: true,
                                layout:'anchor',
                                width: 600,
                                height: 300,
                                minHeight: 250,
                                minWidth: 550,
                                items: form,
                                maximizable: true,
                                modal: true,
                                buttons: [{
                                        text: 'Usar este resultado',
                                        handler: function() {                                            
                                            var resPanel = Ext.getCmp('responsepanel-' + serviceResponse.id);
                                            resPanel.body.update('<pre>' + serviceResponse.result + '</pre>');
                                            win.close();
                                        }
                                    }]
                            });
                            win.show();
                        },
                        failure: function(result, request) {

                        }
                    });
                }
            };

            domain.Panel = {
                init: function() {

                    var formParametro = new Ext.FormPanel({
                        url: Ext.SROOT + 'rpiwsrwquest',
                        border: false,
                        autoHeight: true,
                        bodyStyle: 'padding:10px',
                        labelWidth: 170,
                        frame: false,
                    });

                    var formServicio = new Ext.Panel({
                        border: false,
                        items: [formParametro],
                        tbar: [{
                                text: 'Ejecutar',
                                iconCls: 'play',
                                handler: function() {
                                    Ext.each(servicesdata, function(s) {                                        
                                        var params = new Object();
                                        Ext.each(s.parametros, function(p) {
                                            if(!p.rpifield) {
                                               params[p.nombre] = formParametro.getForm().findField(s.id + ':' + p.nombre).getValue();
                                            } else {
                                               params[p.nombre] = formParametro.getForm().findField('rpifield-' + p.rpifield).getValue(); 
                                            }
                                        });
                                        params['_swi_userservice_id_'] = s.id;                                        
                                        Ext.Ajax.request({
                                            url: Ext.SROOT + 'wsrwquest',
                                            method: 'POST',
                                            params: params,
                                            success: function(result, request) {
                                                var robj = Ext.util.JSON.decode(result.responseText);
                                                var resPanel = Ext.getCmp('responsepanel-' + robj.id);
                                                resPanel.body.update('<pre>' + robj.result + '</pre>');
                                            },
                                            failure: function(result, request) {

                                            }
                                        });
                                    });
                                }
                            }, '->', {
                                tooltip: 'Actualizar Formulario',
                                iconCls: 'refresh',
                                handler: function() {
                                    fsloadRpi();
                                }
                            }]
                    });

                    var centro = new Ext.Panel({
                        title: 'Servicios',
                        region: 'center',
                        items: [formServicio]
                    });

                    var derecha = new Ext.Panel({
                        title: 'Resultados',
                        region: 'east',
                        //collapsible: true,
                        split: true,
                        autoScroll: true,
                        width: 550,
                        minWidth: 500,
                        layout: 'anchor',
                        items: []
                    });

                    new Ext.Viewport({
                        layout: 'fit',
                        border: false,
                        items: [{
                                layout: 'border',
                                border: false,
                                items: [centro, derecha]
                            }
                        ]
                    });

                    //Lista de servicios del usuario
                    var servicesdata = null;
                    Ext.Ajax.request({
                        url: Ext.SROOT + 'individual/listaserviciosusuario',
                        method: 'GET',
                        success: function(result, request) {
                            servicesdata = Ext.util.JSON.decode(result.responseText);
                            //Each UserServices
                            Ext.each(servicesdata, function(s) {
                                derecha.add({
                                    xtype: 'panel',
                                    title: s.nombre,
                                    id: 'responsepanel-' + s.id,
                                    bodyStyle: 'padding:10px',
                                    autoScroll: true,
                                    collapsible: true,
                                    height: 150,
                                    tbar: ['->', {
                                            text: 'Abrir',
                                            tooltip: 'Abrir el servicio individual',
                                            iconCls: 'open',
                                            handler: function() {
                                                domain.Manager.individual({id: s.id});
                                            }
                                        }]
                                });
                            });
                            derecha.doLayout();
                        },
                        failure: function(result, request) {

                        }
                    });

                    var fsloadRpi = function() {
                        Ext.Ajax.request({
                            url: Ext.SROOT + 'rpiview/formrpiitems',
                            method: 'GET',
                            success: function(result, request) {
                                var sfields = Ext.util.JSON.decode(result.responseText);
                                formParametro.removeAll();
                                formParametro.add(sfields);
                                formServicio.doLayout();
                            },
                            failure: function(result, request) {

                            }
                        });
                    };

                    fsloadRpi()
                }

            };
            Ext.onReady(domain.Panel.init, domain.Panel);

        </script>    
    </head>
    <body>
    </body>
</html>
