<%--
    Document   : menu
    Created on : 28-06-2011, 09:55:10 PM
    Author     : marcelo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Bitacora Transaccional</title>
 
<link rel="stylesheet" type="text/css" href="/ext-3.3.1/resources/css/ext-all.css" />
 
 <script type="text/javascript" src="/ext-3.3.1/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="/ext-3.3.1/ext-all-debug.js"></script>
    <script type="text/javascript" src="../js/expo//Exporter-all.js"></script>

<script type="text/javascript">
Ext.namespace('geonetica.sigac');
geonetica.sigac.Panel =  {
init: function() {
var storeBitacora = new Ext.data.JsonStore({
    url: 'busqueda1', 
    root:'data',
    fields: [   {name:'id'},
                {name:'usuario'},
                {name: 'servicio'},
                {name:'fecha'},
                {name:'request'},
                {name:'response'}
            ],
     autoLoad: true       
            
}); 
var gridPanelResultados = new Ext.grid.GridPanel({
    //width: 330,
    title:'Resultados de la búsqueda',
    height:	300,                        
    columns: [
        {header: "Usuario", width: 100, sortable: true, dataIndex: 'usuario'},
        {header: "Servicio", width: 100, sortable: true, dataIndex: 'servicio'},
        {header: "Fecha", width: 100, sortable: true, dataIndex: 'fecha'},
        {header: "Solicitud", width: 100, sortable: true, dataIndex: 'request'},
        {header: "Respuesta", width: 100, sortable: true, dataIndex: 'response'}
        
    ],                       
    store: storeBitacora                                           
});
var fila;
var bitacora_id;
var  registro;
function rowselected(sm, rowindex, record) {                         
                    fila=record;
                    registro=record;
                    /*txtNombreParametro,cboTipoDato,
                                     {
                                        xtype: 'checkbox',
                                        fieldLabel: 'Requerido',
                                        columns:3, 
                                        name: 'chkrequerido',
                                        id:'chkrequerido'
                                     },txtNombreLabel*/
                    bitacora_id = record.get('id');  
                    txtUsuario.setValue(record.get('usuario'));
                    txtServicio.setValue(record.get('servicio'));
                    txtFecha.setValue(record.get('fecha'));
                    txtRequest.setValue(record.get('request'));
                    txtResponse.setValue(record.get('response'));
                    
                    };
gridPanelResultados.getSelectionModel().on('rowselect', rowselected);

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
        sortInfo: {field:'nombreg', direction:'ASC'}
    });
var storeww = [
        ['Ap. Paterno',''],
        ['Ap. Materno',''],
        ['Nombre',''],
        ['CI',''],
        ['Departamento','']]

   // simple array store
var storewww = new Ext.data.SimpleStore({
    fields: ['nombreg','datog'],
    data :storeww
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
        buttons:[{text:'Buscar',handler: function() {                                        
                                       fun_buscar();      
                                    }},{text:'Limpiar',handler: function() {
                                       verUsuario.getForm().reset();
                                       //storeBusUsuario.load({params:{nombre:0}});
                                       //verNuevoUsuario.getForm().reset();
                                    }}
                            ]
    });

  

function fun_buscar()
{
        //alert(cboBusUsuario.getRawValue());
        //alert(cboBusServicio.getRawValue());
      if(cboBusUsuario.getRawValue()!=''&& cboBusServicio.getRawValue()!='')
      {
         var date1 = new Date(dateField1.getValue());
        var date2 = new Date(dateField2.getValue());
        var date3;
       // alert(dateField1.getValue());
        if(dateField1.getValue()==="")
            {
                date1=new Date("01/01/1975").format('Y/m/d');
               // alert('hola');
                
            }
        else{
            date1=date1.format('Y/m/d');
           // alert(date1);
        }    
        if(dateField2.getValue()==="")
            {
                date2=new Date("01/01/1975").format('Y/m/d');
            }
        else{
            date2=date2.format('Y/m/d')
        }  
        //alert(date1);
        
        //alert(date2);
        
        storeBitacora.reload({url:'busqueda1',
        params:{
            usuario: cboBusUsuario.getRawValue(),
            servicio:cboBusServicio.getRawValue(),
            
            fechai:date1,
            fechaf:date2
        }}) ;
      } 
            /* Ext.Ajax.request({
                                url: 'busqueda1',
                                root:'data',
                                method: 'POST',
                                params: {
                                    usuario: cboBusUsuario.getRawValue(),
                                    servicio:cboBusServicio.getRawValue(),
                                    fechai:dateField1.getValue().toString(),
                                    fechaf:dateField2.getValue().toString()
                                },
                                success: function(result, request) {
                                    var data=Ext.util.JSON.decode(result.responseText);
                                    storeBitacora.load(data);
                                    gridPanelResultados.getStore().reload();                                    
                                    //box.hide();
                                },
                                failure: function(result, request) {
                                    Ext.Msg.alert('Error', 'Fallo.');
                                    //box.hide();
                                }
                            });   
   */
       // storeParametros.load({params:{servicio_id:cboBusServicio.getValue()}});
};                
var storeServicio = new Ext.data.JsonStore({
    url: 'individual/listaservicios', 
    fields: [   {name:'id'},
                {name: 'nombre'}
            ],
    //autoLoad: true
});

 
var cboBusServicio =new Ext.form.ComboBox({
    fieldLabel:'Servicio',
    name:'cboBusServicio',
    forceSelection:true,
    store:storeServicio,
    //emptyText:'servicio..',
    triggerAction: 'all',
    lastQuery:'',//hideTrigger:true,
    editable:false,
    displayField:'nombre',
    valueField: 'id',
    typeAhead: true,
    selectOnFocus:true
});
var storeUsuario = new Ext.data.JsonStore({
    url: 'listar_usuarios',
    root: 'data',
    fields: [   {name:'id'},
                {name: 'usuario'}
            ],
    autoLoad: true
});
    // simple array store

 var tmp;
var cboBusUsuario =new Ext.form.ComboBox({
    fieldLabel:'Usuario',
    name:'cboBusUsuario',
    forceSelection:true,
    store:storeUsuario,
    //emptyText:'servicio..',
    triggerAction: 'all',
    lastQuery:'',//hideTrigger:true,
    editable:false,
    displayField:'usuario',
    valueField: 'id',
    typeAhead: true,
    selectOnFocus:true,
     listeners: {
                    select: function(combo, record, index) {
                        /*OJO filtro para seguridad*/
                       /// tmp=record.data['id'];
                       /// alert(record.data['id']);
                       /// storeServicio.load({params:{id:record.data['id']}});
                       /* cboBusServicio.store.on('load',function(){
                        //alert(tmp);                                    
                        //if(tmp!==0)
                            {
                            var data = Ext.data.Record.create([
                                    {name: "id", type: "string"},
                                    {name: "nombre", type: "string"}
                                ]);
                                var record = new data({
                                    id: "0",
                                    nombre: "[TODOS]"
                                });
                            cboBusServicio.store.add(record);
                            cboBusServicio.store.commitChanges();
                            }
});*/
        
                 }
     }          
});

 var dateField1 = new Ext.form.DateField({
	fieldLabel: 'Periodo ',
	emptyText:'de...',
	format:'d-m-Y',
	width: 165
}); 
 var dateField2 = new Ext.form.DateField({
	//fieldLabel: 'a ',
	emptyText:'a...',
	format:'d-m-Y',
	width: 165,
        value: new Date()
});
var verUsuario = new Ext.FormPanel({		
                    border:false,
                    defaults:{xtype:'textfield'},
                    items:[
                        new Ext.form.FieldSet({		
                            //title: 'Seleccionar Servicio',
                            autoHeight: true,
                            defaultType: 'textfield',
                            items: [ cboBusUsuario,cboBusServicio,{xtype: 'compositefield',
                                                                    //labelWidth: 120,
                                                                    items: [dateField1,dateField2]
                                                                  }],
                            buttonAlign: 'center', //<--botones alineados a la derecha 
                            buttons:[{text:'Buscar',handler: function() {                                        
                                       fun_buscar();      
                                    }}
                            ]
                        }),
                        gridPanelResultados],
                    buttonAlign: 'center', 
                            buttons:[
                            {text:'Imprimir listado',handler: function() {
                            }}
                        
                            ]
                       
                        
                          
                                        
                });

var txtUsuario = new Ext.form.TextField({
    fieldLabel:'Usuario',
    readOnly: true,
    width:200,
    id:"idtxtUsuario"
});
var txtServicio = new Ext.form.TextField({
    fieldLabel:'Servicio',
    readOnly: true,
    width:200,
    id:"idtxtServicio"
});
var txtFecha = new Ext.form.TextField({
    fieldLabel:'Fecha',
    readOnly: true,
    width:200,
    id:"idtxtFecha"
});
var txtRequest = new Ext.form.TextArea({
    fieldLabel:'Datos entrada',
    readOnly: true,
    width:600,
    id:"idtxtDatosEntrada"
});
var txtResponse = new Ext.form.TextArea({
    fieldLabel:'Respuesta del servicio',
    readOnly: true,
    width:600,
    id:"idtxtResponse"
});
var btnExport1  = new Ext.Button({
                       
                        text:'Exportar XML',
                        handler:function(){
                            Ext.Ajax.request({
                                 url: 'exportdatosentrada',
                                 method: 'POST',
                                 params: {
                                    xml:txtResponse.getValue()
                                },
                                success: function(result, request) {
                                   Ext.Msg.alert('Mensaje','<a href="C:\\datos\\datosentrada.xml">Descargar XML</a>');
                                },
                                failure: function(result, request) {
                                    Ext.Msg.alert('Error', 'Fallo.');
                                    //box.hide();
                                }
                       
                            });
                        }
                            
        
});             
var btnExport2  = new Ext.Button({
                        text:'Exportar XML',
                        handler:function() { Ext.Ajax.request({
                                 url: 'exportdatossalida',
                                 method: 'POST',
                                 params: {
                                    xml:txtResponse.getValue()
                                },
                                success: function(result, request) {
                                   Ext.Msg.alert('Mensaje','<a href="C:\\datos\\datossalida.xml">Descargar XML</a>');
                                },
                                failure: function(result, request) {
                                    Ext.Msg.alert('Error', 'Fallo.');
                                    //box.hide();
                                }
                        //alert(r
                            });
                        }
});
   var formResultado = new Ext.FormPanel({		
                    ///url: 'individual/guardar_parametros',
                    border:false,
                    defaults:{xtype:'textfield'},
                    items:[                            
                        new Ext.form.FieldSet({		
                            title: 'Datos bitacora',
                            autoHeight: true,
                            labelWidth: 100,
                            defaultType: 'textfield',
                            items: [ txtUsuario,
                                     txtServicio,
                                     txtFecha,
                                     {xtype: 'compositefield',items: [txtRequest,btnExport1]},
                                     {xtype: 'compositefield',items: [txtResponse,btnExport2]}
                                 ]
                        })
                    ],
                    buttonAlign: 'center', 
                            buttons:[
                            
                             {text:'Imprimir bitacora',handler: function() {
                            }}
                        
                            ]
                });


/*************PANELES*********************/
/****/
        var izquierda=new Ext.Panel({
            title: 'Búsqueda',
            region: 'west',
            collapsible: true,

            split: true,
            autoScroll: true,
            width:800,
            minWidth: 400,
            //split:true,
            //layout:'accordion',
            height: 350,
            items:[verUsuario]
        });
        /*FIN PANEL IZQUIERDA*/
        /*PANEL CENTRO*/

        var centro=new Ext.Panel({
            title: 'Información de bitacora',
            region: 'center',
            layout:'fit',
            items:[formResultado]
        });
        /*FIN PANEL CENTRO*/

        /*PANEL DERECHA*/


        var derecha=new Ext.Panel({
            title: 'Bu',
            region: 'east',
            collapsible: true,
            collapsed: true,
            split: true,
            autoScroll: true,
            width:360,
            items:[]
        });
        
        var inferior=new Ext.Panel({
            title: 'Resultados de la busqueda',
            region: 'south',
            collapsible: true,
            collapsed: false,
            layout: 'column',
            split: true,
            autoScroll: true,
            height: 200,
            items: [ ]
        });
        /*FIN PANEL DERECHA*/

    
new Ext.Viewport( {
        layout: 'border',
        title: 'Ext Layout Browser',
        items: [{

                 // collapsible:true,
                  titleCollapse: true,
                   tyle: 'padding-bottom: 5px',
                    layout: 'border',
                    id: 'layout-browser',
                    region:'center',
                    //title: 'HOLA',
                    border: false,
                    //split:true,
                    margins: '2 0 5 5',
                    width: 400,
                    minSize: 400,
                    maxSize: 600,
                    items: [izquierda,centro]
                }
        ]
    });

storeUsuario.load();
cboBusUsuario.store.on('load',function(){
var data = Ext.data.Record.create([
        {name: "id", type: "string"},
        {name: "usuario", type: "string"}
    ]);
    var record = new data({
        id: "0",
        usuario: "[TODOS]"
    });
cboBusUsuario.store.add(record);
cboBusUsuario.store.commitChanges();

});
storeServicio.load();
cboBusServicio.store.on('load',function(){
var data1 = Ext.data.Record.create([
        {name: "id", type: "string"},
        {name: "nombre", type: "string"}
    ]);
    var record1 = new data1({
        id: "0",
        nombre: "[TODOS]"
    });
cboBusServicio.store.add(record1);
cboBusServicio.store.commitChanges();
//dateField2.value=new Date();

});
//storeBitacora.load();

}

/**********************************/
   };
Ext.onReady(geonetica.sigac.Panel.init,geonetica.sigac.Panel);

</script>
<head>
    </head>
   <body>
<br><br> 
   <center> </center>
   
    </body>

</html>
--