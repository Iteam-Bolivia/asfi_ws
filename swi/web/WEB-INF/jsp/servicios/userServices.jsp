<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html lang="es">
    <head>
        <title>User services</title>    
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%>   
        <script type="text/javascript">

            Ext.ns('domain');

            domain.View = {
                init: function() {

                    //form
                    var form = new Ext.FormPanel({
                        title: 'Registrar servicio',
                        url: Ext.SROOT + 'saveuserservice',
                        border: true,
                        width: 400,
                        renderTo: 'form-services',
                        bodyStyle: 'padding:10px',
                        labelWidth: 130,
                        items: [{
                                xtype: 'fieldset',
                                defaults: {
                                    msgTarget: 'side'
                                },
                                items: [{
                                        xtype: 'textfield',
                                        fieldLabel: 'Nombre',
                                        width: 200,
                                        allowBlank: false,
                                        name: 'nombre'
                                    }]
                            }],
                        buttons: [{
                                text: 'Guardar',
                                handler: function() {
                                    form.getForm().submit({
                                        success: function(form, action) {
                                            form.reset();
                                            grid.store.reload();
                                        },
                                        failure: function(form, action) {

                                        }
                                    });
                                }
                            }]
                    });

                    //grid
                    var store = new Ext.data.JsonStore({
                        url: Ext.SROOT + 'listuserservice',
                        fields: ['id', 'nombre'],
                        autoLoad: true
                    });
                    var grid = new Ext.grid.GridPanel({
                        title: 'Servicios',
                        renderTo: 'grid-services',
                        border: true,
                        width: 400,
                        height: 150,
                        store: store,
                        loadMask: true,
                        selModel: new Ext.grid.RowSelectionModel({
                            singleSelect: true
                        }),
                        columns: [new Ext.grid.RowNumberer({
                                width: 27
                            }),{
                                header: "Nombre",
                                sortable: true,
                                dataIndex: 'nombre'
                            },{
                                header: "ID",
                                sortable: true,
                                dataIndex: 'id'
                            }]
                    });

                    grid.getSelectionModel().on('rowselect', function(sm, rowindex, record) {
                        store2.load({
                            method: 'GET',
                            params: {servicio_id: record.data.id}
                        });
                    });


                    var store2 = new Ext.data.JsonStore({
                        url: Ext.SROOT + 'listaparametros',
                        fields: ['id', 'nombre', 'etiqueta'],
                        baseParams: {servicio_id: 0}
                    });
                    var grid2 = new Ext.grid.GridPanel({
                        title: 'Parametros',
                        renderTo: 'grid-params',
                        border: true,
                        width: 400,
                        height: 150,
                        store: store2,
                        loadMask: true,
                        columns: [new Ext.grid.RowNumberer({
                                width: 27
                            }), {
                                header: "Nombre",
                                sortable: true,
                                dataIndex: 'nombre'
                            }, {
                                header: "Etiqueta",
                                sortable: true,
                                dataIndex: 'etiqueta'
                            }],
                        tbar: [{
                                text: 'Nuevo parametro',
                                iconCls: 'create',
                                handler: function() {
                                    var record = grid.getSelectionModel().getSelected();
                                    if (record) {
                                        var form = new Ext.FormPanel({
                                            url: Ext.SROOT + 'registrarparametro',
                                            border: false,
                                            autoHeight: true,
                                            bodyStyle: 'padding:10px',
                                            labelWidth: 100,
                                            waitMsgTarget: true,
                                            items: [{
                                                    xtype: 'fieldset',
                                                    title: 'Datos',
                                                    defaults: {
                                                        msgTarget: 'side'                                                        
                                                    },
                                                    items: [{
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Nombre',
                                                            allowBlank: false,
                                                            name: 'nombre'
                                                        },{
                                                            xtype: 'textfield',
                                                            fieldLabel: 'Etiqueta',
                                                            allowBlank: false,
                                                            name: 'etiqueta'
                                                        },{
                                                            xtype: 'textfield',
                                                            fieldLabel: 'ref',
                                                            allowBlank: false,
                                                            name: 'servicio.id',
                                                            value: record.data.id
                                                        }]
                                                }]
                                        });

                                        var win = new Ext.Window({
                                            iconCls: 'server',
                                            title: 'Registrar Parametro',
                                            autoScroll: true,
                                            width: 400,
                                            autoHeight: true,                                            
                                            items: form,
                                            modal: true,                                            
                                            buttons: [{
                                                    text: 'Guardar',
                                                    handler: function() {
                                                        this.disabled = true;
                                                        form.getForm().submit({
                                                            waitMsg: 'Leyendo WSDL...',
                                                            success: function(form, action) {
                                                                grid2.store.reload();                               
                                                                win.close();
                                                            },
                                                            failure: function(form, action) {

                                                            }
                                                        });
                                                    }
                                                }]
                                        });
                                        win.show();
                                    } else {
                                        Ext.MessageBox.show({
                                            title: 'Aviso',
                                            msg: 'Debe seleccionar un <b>Servicio</b>.',
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.Msg.INFO
                                        });
                                    }
                                }
                            }]
                    });
                }
            }

            Ext.onReady(domain.View.init, domain.View);

        </script>
    </head>
    <body>     
        <h2>Form Services</h2>
        <div id="form-services"></div>
        <h2>Grid Services</h2>
        <div id="grid-services"></div>
        <h2>Grid Services</h2>
        <div id="grid-params"></div>
    </body>
</html>
