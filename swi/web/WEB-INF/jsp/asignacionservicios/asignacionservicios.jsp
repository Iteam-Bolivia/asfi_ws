<%--
    Document   : Configucacion de Parametros
    Created on : 28-11-2013, 09:55:10 PM
    Author     : Marcelo Cardenas
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<!DOCTYPE HTML>
<html lang="es">
    <head>
        <title>Configucacion de Parametros</title>
        <!-- ALL ExtJS Framework resources -->
        <%@include file="../ExtJSScripts-ES.jsp"%>  

        <script type="text/javascript">
            Ext.namespace('domain');
            domain.Panel = {
                init: function() {
                    var storeUsuario = new Ext.data.JsonStore({
                        url: Ext.SROOT + 'listarusuarios',
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
                        autoLoad:true,
                    });
                    
                    var gridPanelUsuario = new Ext.grid.GridPanel({
                        //title: 'Usuarios',
                        //height: 300,
                        columns: [
                            //{header: "id", width: 50, sortable: true, dataIndex: 'id'},
                            {header: "Usuario", width: 100, sortable: true, dataIndex: 'usuario'},
                            {header: "Nombres", width: 100, sortable: true, dataIndex: 'nombres'},
                            {header: "Ap.Paterno", width: 100, sortable: true, dataIndex: 'paterno'},
                            {header: "Ap. Materno", width: 100, sortable: true, dataIndex: 'materno'},
                            {header: "Rol",width: 70, sortable: true,dataIndex: 'rol'},
                            {header: "Activo",width: 40,sortable: true,dataIndex: 'activo',
                                renderer: function(val) {  if (val) {
                                return '<img src="' + Ext.IMAGES_SILK + 'accept.png">';
                                } else {
                                return '<img src="' + Ext.IMAGES_SILK + 'cancel.png">';
                                }
                                }
                            },
                            {header: "Caduca en",sortable: true,dataIndex: 'caducaEn',
                                renderer: function(val) {
                                    var date = new Date(val);
                                    return date.format('d/m/Y');
                                    }
                            }                          
                        ],
                        store: storeUsuario
                    });
/*OJO*/
var idUsuario;
                    gridPanelUsuario.getSelectionModel().on('rowselect', function rowselected(sm, rowindex, record) {
                        //record.data['usuario.id'] = cboBusServicio.getValue();
        //alert(record);                
        //alert(record.data['id']);
                        secondGridStore.load({params:{id:record.data['id']}});
        idUsuario=record.data['id'];                
        firstGridStore.load();
                        //formParametro.getForm().loadRecord(record);
                    });

                    function fun_buscar() {
                        storeUsuario.load({params: {usuario_id: cboBusServicio.getValue()}});
                    };

//                    var storeServicio = new Ext.data.JsonStore({
//                        url: Ext.SROOT + 'individual/listar_servicios',
//                        fields: [{name: 'id'},
//                            {name: 'nombre'}
//                        ]
//                    });
//
//                    var cboBusServicio = new Ext.form.ComboBox({
//                        fieldLabel: 'Servicio',
//                        name: 'cboBusServicio',
//                        forceSelection: true,
//                        store: storeUsuario,
//                        //emptyText:'servicio..',
//                        triggerAction: 'all',
//                        lastQuery: '', //hideTrigger:true,
//                        editable: false,
//                        displayField: 'nombres',
//                        valueField: 'id',
//                        typeAhead: true,
//                        selectOnFocus: true
//                    });
                    
//                    var verUsuario = new Ext.FormPanel({
//                        border: false,
//                        width: 650,
//                        defaults: {xtype: 'textfield'},
//                        bodyStyle: 'padding:10px',
//                        autoScroll: false,
//                                
//                        items: [
//                            /*new Ext.form.FieldSet({
//                                title: 'Seleccionar Servicio',
//                                autoHeight: true,
//                                defaultType: 'textfield',
//                                items: [cboBusServicio],
//                                buttons: [{
//                                        text: 'Cargar',
//                                        handler: function() {
//                                            fun_buscar();
//                                        }}
//                                ]
//                            }),*/
//                            gridPanelUsuario
//                        ]
//                    });
/////////////////////////



	// Generic fields array to use in both store defs.
	var fields = [
		{name: 'id', mapping : 'id'},
		{name: 'nombre', mapping : 'nombre'}
		
	];

    // create the data store
    var firstGridStore = new Ext.data.JsonStore({
        url: Ext.SROOT + 'individual/listaservicios',
                        fields: [{name: 'id'},
                            {name: 'nombre'}],	
		//root   : 'records'
    });


	// Column Model shortcut array
	var cols = [
		//{ id : 'name', header: "Record Name", width: 160, sortable: true, dataIndex: 'name'},
		{header: "nombre", width: 150, autoExpandColumn:true,sortable: true, dataIndex: 'nombre'}
		//{header: "column2", width: 150, sortable: true, dataIndex: 'column2'}
	];

	// declare the source Grid
    var firstGrid = new Ext.grid.GridPanel({
	ddGroup          : 'secondGridDDGroup',
        store            : firstGridStore,
        columns          : cols,
	enableDragDrop   : true,
        stripeRows       : true,
        //autoExpandColumn : 'nombre',
        title            : 'Servicios disponibles (arrastre el servicio para asignar)',
        //height:400,
        //autoHeight:true,
         listeners : {
       afterrender : function(comp) {
        var firstGridDropTargetEl =  firstGrid.getView().scroller.dom;
        var firstGridDropTarget = new Ext.dd.DropTarget(firstGridDropTargetEl, {
                ddGroup    : 'firstGridDDGroup',
                notifyDrop : function(ddSource, e, data){
                        var records =  ddSource.dragData.selections;
                        Ext.each(records, ddSource.grid.store.remove, ddSource.grid.store);
                        firstGrid.store.add(records);
                        //firstGrid.store.sort('nombre', 'ASC');
                        return true
                }
        });
       }}
    });

    var secondGridStore = new Ext.data.JsonStore({
        url: Ext.SROOT + 'asignacionservicios/listar_serviciosporusuario',
                        fields: [{name: 'id'},
                            {name: 'nombre'}],	
    });

    // create the destination Grid
    var secondGrid = new Ext.grid.GridPanel({
	ddGroup          : 'firstGridDDGroup',
        store            : secondGridStore,
        columns          : cols,
	enableDragDrop   : true,
        stripeRows       : true,
        //autoExpandColumn : 'name',
        title            : 'Servicios asignados al usuario',
        //height:400,
        // autoHeight:true,
        listeners : {
       afterrender : function(comp) {
        //  ..................;
        var secondGridDropTargetEl = secondGrid.getView().scroller.dom;
        var secondGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
                ddGroup    : 'secondGridDDGroup',
                notifyDrop : function(ddSource, e, data){
                        var records =  ddSource.dragData.selections;
                        Ext.each(records, ddSource.grid.store.remove, ddSource.grid.store);
                        secondGrid.store.add(records);
                        //secondGrid.store.sort('name', 'ASC');
                        return true
                }
        });
       }
}
    });




	// used to add records to the destination stores
	var blankRecord =  Ext.data.Record.create(fields);

        /****
        * Setup Drop Targets
        ***/
        // This will make sure we only drop to the  view scroller element
        



////////////////////////
                    
                    var formParametro = new Ext.FormPanel({
                        url: 'asignarservicios/guardar_servicios',
                        width        : 650,
		height       : 400,
		layout       : 'hbox',
		//renderTo     : 'panel',
		defaults     : { flex : 1 }, //auto stretch
		layoutConfig : { align : 'stretch' },
                        items: [
                            firstGrid,
			    secondGrid
                        ],
                        //buttonAlign: 'center',
                        buttons: [
                            {text: 'Guardar', handler: function() {
                                    formParametro.getForm().submit({
                                        success: function(form, action) {
                                            gridPanelUsuario.store.reload();
                                        },
                                        failure: function(form, action) {
                                            if (action.Failure == 'server') {
                                                var r = Ext.util.JSON.decode(action.response.responseText);
                                                alert(r.errorMessage);
                                            }
                                        }
                                    })
                                }},
                           { text    : 'Restaurar',
				handler : function() {
					//refresh source grid
					 firstGridStore.load();
                                         //alert(idUsuario);
                                         if(idUsuario)
                                         { //alert('si');
                                            secondGridStore.load({params: {id: idUsuario}});
                                         }else{
                                         //alert('no');    
                                            secondGridStore.removeAll();  
                                         }   
					//purge destination grid
					//secondGridStore.removeAll();
                                }}
                        ]
                    });


                    /*************PANELES*********************/
                    /****/
          var izquierda=new Ext.Panel({
            title: 'Usuarios',
            region: 'west',
            collapsible: true,
            layout:'fit',
            split: true,
            autoScroll: true,
            autoWidth:600,
            minWidth: 600,
            //split:true,
            //layout:'accordion',
            //height: 350,
            items:[gridPanelUsuario]
        });
        /*FIN PANEL IZQUIERDA*/
        /*PANEL CENTRO*/

        var centro=new Ext.Panel({
            title: 'Asignación de servicios a usuarios',
            region: 'center',
            layout:'fit',
            items:[formParametro]
        });

                    new Ext.Viewport({
                        layout: 'fit',
                        border: false,
                        items: [{
                                layout: 'border',
                                border: false,
                                items: [izquierda,centro]
                            }
                        ]
                    });

                    storeUsuario.load();
                    firstGridStore.load();
                    //secondGridStore.load(1);
                }

            };
            Ext.onReady(domain.Panel.init, domain.Panel);

        </script>    
    </head>
    <body>
    </body>
</html>