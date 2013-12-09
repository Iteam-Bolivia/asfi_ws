<%--
    Document   : Asignacion de servicios
    Created on : 28-11-2013, 09:55:10 PM
    Author     : Marcelo Cardenas
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<!DOCTYPE HTML>
<html lang="es">
    <head>
        <title>Asignacion de servicios</title>
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%>  

        <script type="text/javascript">
            Ext.namespace('domain');
            domain.Panel = {
                init: function() {
                    var storeUsuario = new Ext.data.JsonStore({
                        url: Ext.SROOT + 'asignacionservicios/listarusuarios',
                        root: 'data',
                        fields: [{name: 'id'},
                            {name: 'usuario'},
                            {name: 'nombres'},
                            {name: 'paterno'},
                            {name: 'materno'},
                            {name: 'rol'},
                            {name: 'activo'},
                            {name: 'caducaEn'}
                        ],
                        autoLoad: true,
                    });

                    var gridPanelUsuario = new Ext.grid.GridPanel({
                        title: 'Usuarios',
                        height: 300,
                        columns: [
                            {header: "Usuario", width: 100, sortable: true, dataIndex: 'usuario'},
                            {header: "Nombres", width: 100, sortable: true, dataIndex: 'nombres'},
                            {header: "Ap.Paterno", width: 100, sortable: true, dataIndex: 'paterno'},
                            {header: "Ap. Materno", width: 100, sortable: true, dataIndex: 'materno'},
                            {header: "Rol", width: 70, sortable: true, dataIndex: 'rol'},
                            {header: "Activo", width: 40, sortable: true, dataIndex: 'activo',
                                renderer: function(val) {
                                    if (val) {
                                        return '<img src="' + Ext.IMAGES_SILK + 'accept.png">';
                                    } else {
                                        return '<img src="' + Ext.IMAGES_SILK + 'cancel.png">';
                                    }
                                }
                            },
                            {header: "Caduca en", sortable: true, dataIndex: 'caducaEn',
                                renderer: function(val) {
                                    var date = new Date(val);
                                    return date.format('d/m/Y');
                                }
                            }
                        ],
                        store: storeUsuario
                    });
                    /*OJO*/
                    //var idUsuario;
                    gridPanelUsuario.getSelectionModel().on('rowselect', function rowselected(sm, rowindex, record) {
                        secondGridStore.load({params: {id: record.data['id']}});
                        //idUsuario = record.data['id'];
                        //firstGridStore.load();
                        //formParametro.getForm().loadRecord(record);
                    });

                    function fun_buscar() {
                        storeUsuario.load({params: {usuario_id: cboBusServicio.getValue()}});
                    }
                    ;

                    var verUsuario = new Ext.FormPanel({
                        border: false,
                        width: 650,
                        defaults: {xtype: 'textfield'},
                        bodyStyle: 'padding:10px',
                        autoScroll: false,
                        items: [
                            /*new Ext.form.FieldSet({
                             title: 'Seleccionar Servicio',
                             autoHeight: true,
                             defaultType: 'textfield',
                             items: [cboBusServicio],
                             buttons: [{
                             text: 'Cargar',
                             handler: function() {
                             fun_buscar();
                             }}
                             ]
                             }),*/
                            gridPanelUsuario
                        ]
                    });
/////////////////////////



                    // Generic fields array to use in both store defs.
                    var fields = [
                        {name: 'id', mapping: 'id'},
                        {name: 'nombre', mapping: 'nombre'}

                    ];

                    // create the data store
                    var firstGridStore = new Ext.data.JsonStore({
                        url: Ext.SROOT + 'individual/listaservicios',
                        fields: [{name: 'id'},
                            {name: 'nombre'}]
                    });


                    // Column Model shortcut array
                    var cols = [
                        //{ id : 'name', header: "Record Name", width: 160, sortable: true, dataIndex: 'name'},
                        {header: "nombre", width: 150, autoExpandColumn: true, sortable: true, dataIndex: 'nombre'}
                        //{header: "column2", width: 150, sortable: true, dataIndex: 'column2'}
                    ];

                    // declare the source Grid
                    var firstGrid = new Ext.grid.GridPanel({
                        ddGroup: 'secondGridDDGroup',
                        store: firstGridStore,
                        columns: cols,
                        enableDragDrop: true,
                        stripeRows: true,
                        selModel: new Ext.grid.RowSelectionModel({singleSelect: true}),
                        title: 'Servicios (arrastre el servicio para asignar)',
                        listeners: {
                            afterrender: function(comp) {
                                var firstGridDropTargetEl = firstGrid.getView().scroller.dom;
                                var firstGridDropTarget = new Ext.dd.DropTarget(firstGridDropTargetEl, {
                                    ddGroup: 'firstGridDDGroup',
                                    notifyDrop: function(ddSource, e, data) {
                                        var urecord = gridPanelUsuario.getSelectionModel().getSelected();
                                        var srecord = secondGrid.getSelectionModel().getSelected();
                                        Ext.Ajax.request({
                                            url: 'asignacionservicios/eliminarservicio',
                                            method: 'POST',
                                            params: {
                                                idUsuario: urecord.id,
                                                idServicio: srecord.id
                                            },
                                            success: function(result, request) {
                                                secondGrid.getStore().reload();
                                            },
                                            failure: function(result, request) {

                                            }
                                        });
                                    }
                                });
                            }}
                    });

                    var secondGridStore = new Ext.data.JsonStore({
                        url: Ext.SROOT + 'asignacionservicios/listarserviciosporusuario',
                        fields: [{name: 'id'},
                            {name: 'nombre'}]
                    });

                    // create the destination Grid
                    var secondGrid = new Ext.grid.GridPanel({
                        ddGroup: 'firstGridDDGroup',
                        store: secondGridStore,
                        columns: cols,
                        enableDragDrop: true,
                        stripeRows: true,
                        selModel: new Ext.grid.RowSelectionModel({singleSelect: true}),
                        title: 'Servicios asignados al usuario',
                        listeners: {
                            afterrender: function(comp) {
                                var secondGridDropTargetEl = secondGrid.getView().scroller.dom;
                                var secondGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
                                    ddGroup: 'secondGridDDGroup',
                                    notifyDrop: function(ddSource, e, data) {
                                        var urecord = gridPanelUsuario.getSelectionModel().getSelected();
                                        var srecord = firstGrid.getSelectionModel().getSelected();
                                        if (urecord) {
                                            Ext.Ajax.request({
                                                url: 'asignacionservicios/guardarservicios',
                                                method: 'POST',
                                                params: {
                                                    idUsuario: urecord.id,
                                                    idServicio: srecord.id
                                                },
                                                success: function(result, request) {
                                                    secondGrid.getStore().reload();
                                                },
                                                failure: function(result, request) {

                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });

                    var izquierda = new Ext.Panel({
                        title: 'Búsqueda',
                        region: 'west',
                        layout: 'fit',
                        collapsible: true,
                        split: true,
                        width: 700,
                        autoScroll: true,
                        minWidth: 600,
                        items: [gridPanelUsuario]
                    });

                    var centro = new Ext.Panel({
                        title: 'Asignación de servicios a usuarios',
                        region: 'center',
                        //layout: 'fit',
                        layout: 'hbox',
                        //renderTo     : 'panel',
                        defaults: {flex: 1}, //auto stretch
                        layoutConfig: {align: 'stretch'},
                        items: [firstGrid,
                            secondGrid]
                    });

                    new Ext.Viewport({
                        layout: 'fit',
                        border: false,
                        items: [{
                                layout: 'border',
                                border: false,
                                items: [izquierda, centro]
                            }
                        ]
                    });

                    //storeUsuario.load();
                    firstGridStore.load();

                }

            };
            Ext.onReady(domain.Panel.init, domain.Panel);

        </script>    
    </head>
    <body>
    </body>
</html>