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
                    var storeParametros = new Ext.data.JsonStore({
                        url: Ext.SROOT + 'listaparametros',
                        fields: [{name: 'id'},
                            {name: 'servicio_id'},
                            {name: 'nombre'},
                            {name: 'etiqueta'},
                            {name: 'tipo'},
                            {name: 'requerido'},
                            {name: 'valordefecto'},
                            {name: 'oculto'},
                            {name: 'respuesta'}
                        ]
                    });
                    var gridPanelParametros = new Ext.grid.GridPanel({
                        //width: 330,
                        title: 'Usuarios encontrados',
                        height: 300,
                        columns: [
                            {header: "Nombre", width: 100, sortable: true, dataIndex: 'nombre'},
                            {header: "Etiqueta", width: 100, sortable: true, dataIndex: 'etiqueta'},
                            {header: "Tipo", width: 100, sortable: true, dataIndex: 'tipo'},
                            {header: "Requerido", width: 100, sortable: true, dataIndex: 'requerido'},
                            {header: "Valor por Defecto", width: 100, sortable: true, dataIndex: 'valordefecto'},
                            {header: "Oculto", width: 100, sortable: true, dataIndex: 'oculto'},
                            {header: "Respuesta", width: 150, sortable: true, dataIndex: 'respuesta'}

                        ],
                        store: storeParametros
                    });
                    var fila;
                    var parametro_id;
                    var registro;
                    function rowselected(sm, rowindex, record) {
                        fila = record;
                        registro = record;
                        /*txtNombreParametro,cboTipoDato,
                         {
                         xtype: 'checkbox',
                         fieldLabel: 'Requerido',
                         columns:3, 
                         name: 'chkrequerido',
                         id:'chkrequerido'
                         },txtNombreLabel*/
                        parametro_id = record.get('parametro_id');
                        txtNombreParametro.setValue(record.get('nombre'));
                        cboTipoDato.setValue(record.get('tipo'));
                        Ext.getCmp("chkrequerido").setValue(record.get('requerido'));
                        Ext.getCmp("chkoculto").setValue(record.get('oculto'));
                        txtNombreLabel.setValue(record.get('etiqueta'));
                        txtValorDefecto.setValue(record.get('valordefecto'));
                        Ext.getCmp("id").setValue(record.get('parametro_id'));
                    }
                    ;
                    gridPanelParametros.getSelectionModel().on('rowselect', rowselected);

                    var cmParametros = new Ext.grid.ColumnModel({
                        // specify any defaults for each column
                        defaults: {
                            sortable: true // columns are not sortable by default           
                        },
                        columns: [{
                                id: 'nombreg',
                                header: 'Nombre',
                                dataIndex: 'nombreg',
                                width: 220,
                                // use shorthand alias defined above
                                editor: new Ext.form.TextField({
                                    allowBlank: false,
                                    readOnly: true
                                })
                            }, {
                                id: 'datog',
                                header: 'Dato',
                                dataIndex: 'datog',
                                width: 230,
                                editor: new Ext.form.TextField({
                                    allowBlank: true
                                })
                            }]
                    });

                    // create the Data Store
                    var storew = new Ext.data.Store({
                        // destroy the store if the grid is destroyed

                        // use an Array of field definition objects to implicitly create a Record constructor
                        fields: [
                            // the 'name' below matches the tag name to read, except 'availDate'
                            // which is mapped to the tag 'availability'
                            {name: 'nombreg', type: 'string'},
                            {name: 'datog', type: 'string'}
                        ],
                        sortInfo: {field: 'nombreg', direction: 'ASC'}
                    });
                    var storeww = [
                        ['Ap. Paterno', ''],
                        ['Ap. Materno', ''],
                        ['Nombre', ''],
                        ['CI', ''],
                        ['Departamento', '']]

                    // simple array store
                    var storewww = new Ext.data.SimpleStore({
                        fields: ['nombreg', 'datog'],
                        data: storeww
                    });
                    // create the editor grid
                    var grid = new Ext.grid.EditorGridPanel({
                        store: storewww,
                        cm: cmParametros,
                        //width: 600,
                        height: 300,
                        autoExpandColumn: 'datog', // column with this id will be expanded
                        title: 'Parametros del servicio',
                        clicksToEdit: 1,
                        /*tbar: [{
                         text: 'Agregar',
                         handler : function(){
                         var Rec = grid.getStore().recordType;
                         var p = new grid.getStore().recordType({
                         col1: 'value1',
                         col2: '1.01'
                         });
                         grid.stopEditing();
                         var newRow = storew.getCount();
                         p.data.isNew = true;
                         storew.insert(newRow, p);
                         grid.startEditing(newRow, 0);
                         }
                         }],*/
                        buttons: [{text: 'Buscar', handler: function() {
                                    fun_buscar();
                                }}, {text: 'Limpiar', handler: function() {
                                    verUsuario.getForm().reset();
                                    //storeBusUsuario.load({params:{nombre:0}});
                                    //verNuevoUsuario.getForm().reset();
                                }}
                        ]
                    });



                    function fun_buscar()
                    {
                        //alert(cboBusServicio.getValue());
                        storeParametros.load({params: {servicio_id: cboBusServicio.getValue()}});
                    }
                    ;
                    /*var sServicio = [
                     ['SEGIP'],
                     ['ADUANA'],
                     ['PTJ'],
                     ['MINEDU'],
                     ['OTRO']]
                     var storeServicio = new Ext.data.SimpleStore({
                     fields: ['nombre'],
                     data :sServicio
                     });
                     */
                    var storeServicio = new Ext.data.JsonStore({
                        url: Ext.SROOT + 'listuserservice',
                        fields: [{name: 'id'},
                            {name: 'nombre'}
                        ],
                        //autoLoad: true
                    });
                    // simple array store


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
                    var verUsuario = new Ext.FormPanel({
                        border: false,
                        defaults: {xtype: 'textfield'},
                        items: [
                            new Ext.form.FieldSet({
                                title: 'Seleccionar Servicio',
                                autoHeight: true,
                                defaultType: 'textfield',
                                items: [cboBusServicio],
                                buttonAlign: 'center', //<--botones alineados a la derecha 
                                buttons: [{text: 'Cargar', handler: function() {
                                            fun_buscar();
                                        }}
                                    /*,{text:'Limpiar',handler: function() {
                                     verUsuario.getForm().reset();
                                     storeBusUsuario.load({params:{nombre:0}});
                                     verNuevoUsuario.getForm().reset();
                                     }}*/
                                ]
                            }),
                            gridPanelParametros,
                        ]
                    });

                    var txtNombreParametro = new Ext.form.TextField({
                        fieldLabel: 'Nombre Parametro',
                        emptyText: 'nombre parametro...',
                        width: 200,
                        style: {textTransform: "lowercase"},
                        id: "idtxtNombreParametro"
                    });
                    var sTipoDato = [
                        ['String'],
                        ['Int'],
                        ['Long'],
                        ['Date'],
                        ['Char'],
                        ['Boolean']

                    ]
                    var storeTipoDato = new Ext.data.SimpleStore({
                        fields: ['nombre'],
                        data: sTipoDato
                    });

                    var cboTipoDato = new Ext.form.ComboBox({
                        width: 200,
                        fieldLabel: 'Tipo de Dato',
                        store: storeTipoDato,
                        displayField: 'nombre',
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        emptyText: 'Seleccione tipo de dato...',
                        selectOnFocus: true
                    });
                    var txtNombreLabel = new Ext.form.TextField({
                        fieldLabel: 'Nombre a Desplegar ',
                        emptyText: 'nombre desplegado...',
                        width: 200,
                        //style: {textTransform: "lowercase"},
                        id: "idtxtNombreLabel"
                    });
                    var txtValorDefecto = new Ext.form.TextField({
                        fieldLabel: 'Valor por Defecto',
                        emptyText: 'valor por defecto...',
                        width: 200,
                        style: {textTransform: "lowercase"},
                        id: "idtxtValorDefecto"
                    });
                    var formParametro = new Ext.FormPanel({
                        url: 'individual/guardar_parametros',
                        border: false,
                        defaults: {xtype: 'textfield'},
                        items: [
                            new Ext.form.FieldSet({
                                title: 'Datos',
                                autoHeight: true,
                                labelWidth: 100,
                                defaultType: 'textfield',
                                items: [txtNombreParametro,
                                    cboTipoDato,
                                    {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Requerido',
                                        columns: 3,
                                        name: 'chkrequerido',
                                        id: 'chkrequerido'
                                    },
                                    txtNombreLabel,
                                    txtValorDefecto,
                                    {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Oculto',
                                        columns: 3,
                                        name: 'chkoculto',
                                        id: 'chkoculto'
                                    },
                                    {
                                        xtype: 'hidden',
                                        //fieldLabel: 'id',
                                        //columns:3, 
                                        name: 'id',
                                        id: 'id'

                                    }

                                ]

                            })
                        ],
                        buttonAlign: 'center',
                        buttons: [
                            {text: 'Guardar', handler: function() {
                                    alert(registro.id);
                                    formParametro.getForm().submit({
                                        success: function(form, action) {
                                            //win.close();
                                        },
                                        failure: function(form, action) {
                                            if (action.Failure == 'server') {
                                                var r = Ext.util.JSON.decode(action.response.responseText);
                                                alert(r.errorMessage);
                                            }
                                        }
                                    })
                                    // alert(verNuevoUsuario.getForm().findField('DIR_NUEVO').getValue());
                                    /*Ext.Ajax.request({
                                     waitMsg : 'Guardando...',
                                     url:'individual/guardar_parametros',
                                     method: 'POST',
                                     params:{
                                     parametro:registro
                             
                                     },
                             
                                     success: function(result, request) {
                                     var data = Ext.util.JSON.decode(result.responseText);
                                     var icono;
                                     if (data.success) {icono=Ext.Msg.INFO;}
                                     else{icono=Ext.Msg.ERROR;}
                                     Ext.MessageBox.show({
                                     title:'Información',
                                     msg:data.errorMessage,
                                     buttons: Ext.MessageBox.OK,
                                     icon:icono
                                     });
                                     },
                                     failure: function(result, request) {
                                     var data = request.result;
                                     Ext.MessageBox.show({
                                     title:'Error',
                                     msg:data.errorMessage,
                                     buttons: Ext.MessageBox.OK,
                                     icon:Ext.Msg.ERROR
                                     });
                                     }    
                                     });*/


                                }},
                            {text: 'Limpiar', handler: function() {
                                    alert('hola');
                                    formParametro.getForm().reset();
                                    rowselected(null, null, fila);
                                    //user_id = 0;
                                    /////fn_Buscar();

                                    //storeBusPersona.load({params:{primer_nombre:0}});
                                }}
                            ,
                            {text: 'Imprimir', handler: function() {
                                    //verNuevoUsuario.getForm().reset();
                                    rowselected(null, null, fila);
                                    //user_id = 0;
                                    /////fn_Buscar();

                                    //storeBusPersona.load({params:{primer_nombre:0}});
                                }}


                            /*{text:'Eliminar',handler: function() {
                             Ext.MessageBox.confirm("Confirmación","Esta seguro de eliminar el usuario?", function(btn){
                             if(btn == 'yes'){
                             Ext.Ajax.request({
                             waitMsg : 'Guardando...',
                             url:'usuario/eliminar',
                             method: 'POST',
                             params:{
                             //predio_id: codigoE.getValue(),//OJO//
                             usuario_id:user_id//,
                             //nombre:txtNombre.getValue(),
                             //rol:cmbRol.getValue()
                             },
                     
                             success: function(result, request) {
                             //verNuevoUsuario.getForm().reset();
                     
                             var data = request.result;
                             Ext.MessageBox.show({
                             title:'Información',
                             msg:'Eliminación correcta',
                             buttons: Ext.MessageBox.OK,
                             icon:Ext.Msg.INFO
                             });
                             fun_buscar();  
                             formParametro.getForm().reset();
                             /*  var dato_nombre = verUsuario.getForm().findField('bus_dato_nombre').getValue();
                             var dato_rol = verUsuario.getForm().findField('bus_dato_rol').getValue();
                     
                             if(dato_nombre!= null && dato_rol!= null){
                             //alert(DOS);
                             storeBusUsuario.load({params:{dato_nombre:dato_nombre,dato_rol:dato_rol}});
                             //storeBusPersona.load({params:{primer_apellido:primer_apellido}});
                             }else if(dato_nombre!= null && dato_rol==""){
                             //alert(primer_nombre);
                             storeBusUsuario.load({params:{dato_nombre:dato_nombre}});
                             }else if(dato_nombre == "" && dato_rol!= null){
                             //alert(primer_apellido);
                             storeBusUsuario.load({params:{dato_rol:dato_rol}});
                             }else if(dato_nombre == "" && dato_rol==""){
                             Ext.MessageBox.show({
                             title:'Aviso',
                             msg:'Introducir <b>Parametros de busqueda</b>.',
                             buttons: Ext.MessageBox.OK,
                             icon:Ext.Msg.INFO
                             });
                             }else{
                     
                             }                    
                             },
                             failure: function(result, request) {
                     
                             var data = request.result;
                             Ext.MessageBox.show({
                             title:'Error',
                             msg:data.errorMessage,
                             buttons: Ext.MessageBox.OK,
                             icon:Ext.Msg.ERROR
                             });
                             }    
                             }); 
                             }});
                             }}*/
                        ]
                    });


                    /*************PANELES*********************/
                    /****/
                    var izquierda = new Ext.Panel({
                        title: 'Búsqueda',
                        region: 'west',
                        collapsible: true,
                        split: true,
                        autoScroll: true,
                        width: 800,
                        minWidth: 400,
                        //split:true,
                        //layout:'accordion',
                        height: 350,
                        items: [verUsuario]
                    });
                    /*FIN PANEL IZQUIERDA*/
                    /*PANEL CENTRO*/

                    var centro = new Ext.Panel({
                        title: 'Configuración de parámetros del servicio',
                        region: 'center',
                        layout: 'fit',
                        items: [formParametro]
                    });
                    /*FIN PANEL CENTRO*/

                    /*PANEL DERECHA*/


                    var derecha = new Ext.Panel({
                        title: 'Bu',
                        region: 'east',
                        collapsible: true,
                        collapsed: true,
                        split: true,
                        autoScroll: true,
                        width: 360,
                        items: []
                    });

                    var inferior = new Ext.Panel({
                        title: 'Resultados de la busqueda',
                        region: 'south',
                        collapsible: true,
                        collapsed: false,
                        layout: 'column',
                        split: true,
                        autoScroll: true,
                        height: 200,
                        items: []
                    });
                    /*FIN PANEL DERECHA*/


                    new Ext.Viewport({
                        layout: 'fit',
                        border: false,
                        items: [{
                                //titleCollapse: true,
                                //tyle: 'padding-bottom: 5px',
                                layout: 'border',
                                border: false,
                                //split:true,
//                                margins: '2 0 5 5',
//                                width: 400,
//                                minSize: 400,
//                                maxSize: 600,
                                items: [izquierda, centro]
                            }
                        ]
                    });

                    storeServicio.load();
        //Dpto.load({params:{pais_id:1}});
                    /*cmbBusRol.store.on('load',function(){
                     var dataChoco = Ext.data.Record.create([
                     {name: "rol_id", type: "string"},
                     {name: "descripcion", type: "string"}
                     ]);
                     var record = new dataChoco({
                     rol_id: "0",
                     descripcion: "[TODOS]"
                     });
                     cmbBusRol.store.add(record);
                     cmbBusRol.store.commitChanges();
             
                     });*/
                }

                /**********************************/
            };
            Ext.onReady(domain.Panel.init, domain.Panel);

        </script>    
    </head>
    <body>
    </body>
</html>
