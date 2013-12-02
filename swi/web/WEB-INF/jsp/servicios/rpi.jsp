<%--
    Document   : Configucacion de RPI
    Created on : 30-11-2013, 07:05:10 PM
    Author     : John Castillo Valencia
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<!DOCTYPE HTML>
<html lang="es">
    <head>
        <title>Configucacion de RPI</title>
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%>  

        <script type="text/javascript">
            Ext.namespace('domain');
            domain.Manager = {
                mustBeSelect: function() {
                    Ext.MessageBox.show({
                        title: 'Aviso',
                        msg: 'Debe seleccionar los <b>Campos en los servicios</b>.',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                addField: function(options) {

                    var form = new Ext.FormPanel({
                        url: Ext.SROOT + 'rpi/definirservicio',
                        border: false,
                        title: 'Nuevo Campo',
                        frame: true,
                        bodyStyle: 'padding:10px',
                        labelWidth: 150,
                        autoHeight: true,
                        region: 'center',
                        defaults: {
                            msgTarget: 'side',
                            width: 200
                        },
                        items: [{
                                xtype: 'combo',
                                fieldLabel: 'Tipo de dato',
                                hiddenName: 'tipo',
                                forceSelection: true,
                                allowBlank: false,
                                store: new Ext.data.ArrayStore({
                                    fields: ['type', 'objeto'],
                                    data: [['textfield', 'Cadena'], ['textarea', 'Texto'], ['numberfield', 'Entero'], ['numberfield', 'Real'], ['checkbox', 'Falso/Verdadero'], ['datefield', 'Fecha'] /*['timestamp','Fecha y Hora'],['entity', 'Entidad'],['subentity','Entidad propia'],['entity','Entidad agregada (1/n)'],['centity','Entidad compuesta (n)'],['class','Entidad compuesta (1)']*/]
                                }),
                                valueField: 'type',
                                displayField: 'objeto',
                                typeAhead: true,
                                mode: 'local',
                                triggerAction: 'all',
                                emptyText: 'Selecione el tipo...',
                                selectOnFocus: true
                            }, {
                                xtype: 'checkbox',
                                fieldLabel: 'Requerido',
                                name: 'requerido'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Nombre a Desplegar',
                                allowBlank: false,
                                name: 'etiqueta'
                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Valor por Defecto',
                                name: 'valordefecto'
                            }, ]
                    });
                    var tree = new Ext.tree.TreePanel({
                        title: 'Servicios disponibles',
                        region: 'east',
                        //height: 300,
                        width: 300,
                        minWidth: 250,
                        maxWidth: 400,
                        useArrows: true,
                        autoScroll: true,
                        animate: true,
                        enableDD: true,
                        containerScroll: true,
                        rootVisible: false,
                        split: true,
                        collapsible: true,
                        //frame: true,
                        root: {
                            nodeType: 'async'
                        },
                        dataUrl: 'treeuserservices',
                        listeners: {
                            'checkchange': function(node, checked) {
                                if (checked) {
                                    node.getUI().addClass('complete');
                                } else {
                                    node.getUI().removeClass('complete');
                                }
                            }
                        }//,
//                        buttons: [{
//                                text: 'Get Completed Tasks',
//                                handler: function() {
//                                    var msg = '', selNodes = tree.getChecked();
//                                    Ext.each(selNodes, function(node) {
//                                        if (msg.length > 0) {
//                                            msg += ', ';
//                                        }
//                                        msg += node.text;
//                                    });
//                                    Ext.Msg.show({
//                                        title: 'Completed Tasks',
//                                        msg: msg.length > 0 ? msg : 'None',
//                                        icon: Ext.Msg.INFO,
//                                        minWidth: 200,
//                                        buttons: Ext.Msg.OK
//                                    });
//                                }
//                            }]
                    });

                    var win = new Ext.Window({
                        title: 'Agregar campo',
                        autoScroll: true,
                        //autoHeight: true,
                        width: 800,
                        height: 300,
                        maximizable: true,
                        layout: 'border',
                        items: [form, tree],
                        modal: true,
                        buttonAlign: 'center',
                        buttons: [{
                                text: 'Guardar',
                                handler: function() {
                                    var selNodes = tree.getChecked();
                                    var nodessel = '';
                                    Ext.each(selNodes, function(node) {
                                        if (nodessel.length === 0) {
                                            nodessel += node.id;
                                        } else {
                                            nodessel += ":" + node.id;
                                        }
                                    });
                                    if (form.getForm().isValid()) {
                                        if (selNodes.length > 0) {
                                            var fdata = form.getForm().getValues();
                                            fdata.srvfields = nodessel;
                                            console.log(fdata);
                                            Ext.Ajax.request({
                                                url: Ext.SROOT + 'rpi/guardarcampo',
                                                method: 'POST',
                                                params: fdata,
                                                success: function(result, request) {
                                                    var sfields = Ext.util.JSON.decode(result.responseText);                                                    
                                                },
                                                failure: function(result, request) {

                                                }
                                            });

//                                        var nfield = {
//                                            xtype: fdata.tipo,
//                                            fieldLabel: fdata.etiqueta,
//                                            allowBlank: fdata.requerido,  
//                                            value: fdata.valordefecto,
//                                            width: 300                                            
//                                        };


                                            var nfield = {
                                                xtype: 'compositefield',
                                                fieldLabel: fdata.etiqueta,
                                                items: [{
                                                        xtype: fdata.tipo,
                                                        fieldLabel: fdata.etiqueta,
                                                        width: 200,
                                                        allowBlank: fdata.requerido ? false : true,
                                                        value: fdata.valordefecto
                                                    }, {
                                                        xtype: 'displayfield',
                                                        width: 50,
                                                        value: '      '
                                                    }, {
                                                        xtype: 'button',
                                                        iconCls: 'delete',
                                                        tooltip: 'eliminar campo',
                                                        name: 'ss',
                                                        handler: function() {
                                                            alert(this.id);
                                                        }
                                                    }/*, {
                                                     xtype: 'button',
                                                     iconCls: 'arrow-up',
                                                     tooltip: 'eliminar campo',
                                                     handler: function() {
                                                     alert('up');
                                                     }
                                                     }, {
                                                     xtype: 'button',
                                                     iconCls: 'arrow-down',
                                                     tooltip: 'eliminar campo',
                                                     handler: function() {
                                                     alert('down');
                                                     }
                                                     }*/]
                                            };
                                            options.form.add(nfield);
                                            options.form.doLayout();
                                            win.close();
                                        } else {
                                            domain.Manager.mustBeSelect();
                                        }
                                    }

//                                    form.getForm().submit({
//                                        success: function(form, action) {
//                                            win.close();
//                                        },
//                                        failure: function(form, action) {
//                                            if (action.failureType === 'server') {
//                                                var r = Ext.util.JSON.decode(action.response.responseText);
//                                                com.icg.errors.submitFailure('Error', r.errorMessage);
//                                            }
//                                        }
//                                    });
                                }
                            }]
                    });
                    win.show();
                }
            }

            domain.Panel = {
                init: function() {
                    var storeParametros = new Ext.data.JsonStore({
                        url: Ext.SROOT + 'individual/listaparametros',
                        fields: [{name: 'id'},
                            {name: 'servicio_id'},
                            {name: 'nombre'},
                            {name: 'etiqueta'},
                            {name: 'tipo'},
                            {name: 'requerido'},
                            {name: 'valordefecto'},
                            {name: 'oculto'}
                        ]
                    });
                    var gridPanelParametros = new Ext.grid.GridPanel({
                        title: 'Parametros',
                        height: 300,
                        columns: [
                            {header: "Nombre", width: 100, sortable: true, dataIndex: 'nombre'},
                            {header: "Etiqueta", width: 100, sortable: true, dataIndex: 'etiqueta'},
                            {header: "Tipo", width: 100, sortable: true, dataIndex: 'tipo'},
                            {header: "Requerido", width: 100, sortable: true, dataIndex: 'requerido'},
                            {header: "Valor por Defecto", width: 100, sortable: true, dataIndex: 'valordefecto'},
                            {header: "Oculto", width: 100, sortable: true, dataIndex: 'oculto'}
                        ],
                        store: storeParametros
                    });

                    gridPanelParametros.getSelectionModel().on('rowselect', function rowselected(sm, rowindex, record) {
                        record.data['servicio.id'] = cboBusServicio.getValue();
                        formParametro.getForm().loadRecord(record);
                    });

                    function fun_buscar() {
                        storeParametros.load({params: {servicio_id: cboBusServicio.getValue()}});
                    }
                    ;

                    var storeServicio = new Ext.data.JsonStore({
                        url: Ext.SROOT + 'individual/listaservicios',
                        fields: [{name: 'id'},
                            {name: 'nombre'}
                        ]
                    });

                    var cboBusServicio = new Ext.form.ComboBox({
                        fieldLabel: 'Servicio',
                        name: 'cboBusServicio',
                        forceSelection: true,
                        store: storeServicio,
                        //emptyText:'servicio..',
                        triggerAction: 'all',
                        lastQuery: '', //hideTrigger:true,
                        editable: false,
                        displayField: 'nombre',
                        valueField: 'id',
                        typeAhead: true,
                        selectOnFocus: true
                    });

                    var formParametro = new Ext.FormPanel({
                        url: 'individual/guardarparametros',
                        border: true,
                        bodyStyle: 'padding:10px',
                        labelWidth: 150,
                        items: []
                    });

                    var formServicio = new Ext.Panel({
                        border: false,
                        //frame: true,
                        items: [formParametro
                        ],
                        tbar: [{
                                text: 'Agragar campo',
                                iconCls: 'create',
                                handler: function() {
                                    domain.Manager.addField({form: formParametro})
                                }
                            }]
                    });






                    /*************PANELES*********************/
                    /****/
                    var centro = new Ext.Panel({
                        title: 'Servicios',
                        region: 'center',
                        items: [formServicio]
                    });

                    var derecha = new Ext.Panel({
                        title: 'Servicios Disponibles',
                        region: 'east',
                        collapsible: true,
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

                    //storeServicio.load();
                    var setServiceEnabled = function(e) {
                        Ext.Ajax.request({
                            url: Ext.SROOT + 'rpi/setserviceenabled',
                            method: 'POST',
                            params: {id: e},
                            success: function(result, request) {
                                fsload();
                            },
                            failure: function(result, request) {

                            }
                        });
                    };

                    var fsload = function() {
                        Ext.Ajax.request({
                            url: Ext.SROOT + 'rpi/formserviceitems',
                            method: 'GET',
                            success: function(result, request) {
                                var sfields = Ext.util.JSON.decode(result.responseText);
                                //console.log(sfields)
                                Ext.each(sfields, function(field, index) {
                                    console.log(field.buttons[0])
                                    field.buttons[0].handler = function(e) {
                                        setServiceEnabled(field.id);
                                    }
//                                field.listeners = {collapse: function(a) {
//                                        console.log('collapse')
//                                        //setServiceEnabled(a.id);
//                                    }, expand: function(a) {
//                                        console.log('expand')
//                                        setServiceEnabled(a.id);
//                                    }};
                                });
                                var form = new Ext.FormPanel({
                                    url: Ext.SROOT + 'submitservice',
                                    border: false,
                                    autoHeight: true,
                                    bodyStyle: 'padding:10px',
                                    labelWidth: 170,
                                    frame: true,
                                    //labelAlign: 'top',
                                    items: sfields
                                });
                                derecha.removeAll();
                                derecha.add(form);
                                derecha.doLayout();
                            },
                            failure: function(result, request) {

                            }
                        });
                    };

                    fsload();
                }

            };
            Ext.onReady(domain.Panel.init, domain.Panel);

        </script>    
    </head>
    <body>
    </body>
</html>
