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
                fields: function(data) {
                    if (data.length > 0) {
                        var cols = new Array();
                        var fields = new Array();
                        for (var prop in data[0]) {
                            console.log("key:" + prop);
                            var col = {
                                header: prop,
                                dataIndex: prop
                            };
                            cols.push(col);
                            var field = {
                                name: prop
                            };
                            fields.push(field)
                        }

                        var grid = new Ext.grid.GridPanel({
                            //title: 'Resultados',                            
                            //height: 190,
                            store: new Ext.data.JsonStore({
                                fields: fields,
                                data: data,
                                autoLoad: true
                            }),
                            columns: cols
                        });
                        return grid;
                    }
                    return undefined;
                },
                individual: function(options) {
                    var serviceResponse;
                    var grid;
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
                                url: Ext.SROOT + 'webservicesystem',
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
                                                waitMsg: {tile:'Enviando...'},
                                                success: function(form, action) {
                                                    serviceResponse = Ext.util.JSON.decode(action.response.responseText);
                                                    win.getEl().unmask();
                                                    win.remove(1);
                                                    grid = domain.Manager.fields(serviceResponse.result);
                                                    win.add(grid);
//                                                    win.add({
//                                                        xtype: 'panel',
//                                                        title: 'Resultado',
//                                                        bodyStyle: 'padding:10px',
//                                                        autoScroll: true,
//                                                        height: 200,
//                                                        html: '<pre>' + serviceResponse.result + '</pre>'
//                                                    });                                                    
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
                                title: 'Servicio In',
                                autoScroll: true,
                                layout: 'anchor',
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
                                            //resPanel.body.update('<pre>' + serviceResponse.result + '</pre>');
                                            resPanel.removeAll();
                                            resPanel.add(grid);
                                            resPanel.doLayout();
                                            options.salida = serviceResponse.result;
                                            win.close();
                                        }
                                    }]
                            });
                            win.show();
                        },
                        failure: function(result, request) {

                        }
                    });
                },
                guardar: function(options) {
                    console.log(options.entrada);
                    console.log(options.salida);
                    var form = new Ext.FormPanel({
                        url: Ext.SROOT + 'rpiview/guardarrpi',
                        border: false,
                        autoHeight: true,
                        bodyStyle: 'padding:10px',
                        defaults: {
                            msgTarget: 'side',
                            width: 300
                        },
                        items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Nombre',
                                allowBlank: false,
                                name: 'nombre'
                            }, /*{
                             xtype: 'textarea',
                             fieldLabel: 'Descripci&oacute;n',
                             allowBlank: false,
                             name: 'descripcion'
                             },*/ {
                                xtype: "textarea",
                                name: "entrada",
                                value: Ext.util.JSON.encode(options.entrada),
                            }, {
                                xtype: "textarea",
                                name: "salida",
                                value: Ext.util.JSON.encode(options.salida),
                            }]
                    });

                    var win = new Ext.Window({
                        iconCls: 'entity-save',
                        title: 'Guardar RPI',
                        autoScroll: true,
                        autoHeight: true,
                        width: 500,
                        activeItem: 0,
                        layout: 'anchor',
                        items: form,
                        modal: true,
                        buttonAlign: 'center',
                        buttons: [{
                                text: 'Guardar',
                                handler: function() {
                                    form.getForm().submit({
                                        success: function(form, action) {
                                            win.close();
                                        },
                                        failure: function(form, action) {
                                            if (action.failureType === 'server') {
                                                var r = Ext.util.JSON.decode(action.response.responseText);
                                                com.icg.errors.submitFailure('Error', r.errorMessage);
                                            }
                                        }
                                    });
                                }
                            }]
                    });
                    win.show();
                },
                mustExecute: function() {
                    Ext.MessageBox.show({
                        title: 'Aviso',
                        msg: 'Debe ejecutar la <b>consulta</b>.',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.Msg.INFO
                    });
                },
            };

            domain.Panel = {
                init: function() {

                    var _rpidata = new Object();
                    _rpidata.salida = new Array();
                    var isEjecutado = false;

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
                                    _rpidata.entrada = formParametro.getForm().getValues();
                                    _rpidata.salida = new Array();
                                    isEjecutado = true;
                                    Ext.each(servicesdata, function(s) {
                                        var params = new Object();
                                        Ext.each(s.parametros, function(p) {
                                            if (!p.rpifield) {
                                                params[p.nombre] = formParametro.getForm().findField(s.id + ':' + p.nombre).getValue();
                                            } else {
                                                params[p.nombre] = formParametro.getForm().findField('rpifield-' + p.rpifield).getValue();
                                            }
                                        });
                                        params['_swi_userservice_id_'] = s.id;
                                        Ext.Ajax.request({
                                            url: Ext.SROOT + 'webservicesystem',
                                            method: 'POST',
                                            params: params,
                                            waitMsg: 'Espere...',
                                            success: function(result, request) {
                                                var robj = Ext.util.JSON.decode(result.responseText);
                                                _rpidata.salida.push(robj);
                                                var resPanel = Ext.getCmp('responsepanel-' + robj.id);
                                                //resPanel.body.update('<pre>' + robj.result + '</pre>');
                                                var grid = domain.Manager.fields(robj.result);
                                                resPanel.removeAll();
                                                resPanel.add(grid);
                                                resPanel.doLayout();
                                            },
                                            failure: function(result, request) {

                                            }
                                        });
                                    });
                                }
                            }, '-', {
                                text: 'Guardar',
                                iconCls: 'entity-save',
                                handler: function() {
                                    if (isEjecutado) {
                                        domain.Manager.guardar({
                                            entrada: _rpidata.entrada,
                                            salida: _rpidata.salida
                                        });
                                    } else {
                                        domain.Manager.mustExecute();
                                    }
                                }
                            }, {
                                text: 'Imprimir',
                                iconCls: 'printer',
                                handler: function() {

                                }
                            }, '->', {
                                tooltip: 'Actualizar Formulario',
                                iconCls: 'refresh',
                                handler: function() {
                                    fsloadRpi();
                                    isEjecutado = false;
                                }
                            }]
                    });

                    var centro = new Ext.Panel({
                        title: 'Formulario de Consulta',
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
                        url: Ext.SROOT + 'rpiview/listaserviciosusuario',
                        method: 'GET',
                        success: function(result, request) {
                            servicesdata = Ext.util.JSON.decode(result.responseText);
                            //Each UserServices
                            Ext.each(servicesdata, function(s) {
                                derecha.add({
                                    xtype: 'panel',
                                    title: s.nombre,
                                    layout:'fit',
                                    id: 'responsepanel-' + s.id,
                                    //bodyStyle: 'padding:10px',
                                    autoScroll: true,
                                    collapsible: true,
                                    height: 170,
                                    tbar: ['->', {
                                            text: 'Abrir',
                                            tooltip: 'Abrir el servicio individual',
                                            iconCls: 'open',
                                            handler: function() {
                                                domain.Manager.individual({
                                                    id: s.id,
                                                    salida: _rpidata
                                                });
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
