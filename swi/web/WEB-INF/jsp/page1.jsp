<%-- 
    Document   : John
    Created on : 26-04-2011, 02:30:51 PM
    Author     : John
--%>
<html>
    <head>
        <title>Nuevo atrributo</title>
        <!-- ExtJS UI Framework -->
        <link rel="stylesheet" type="text/css" href="/ext-3.3.1/resources/css/ext-all.css" />
        <script type="text/javascript" src="/ext-3.3.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="/ext-3.3.1/ext-all.js"></script>

        <script type="text/javascript">
            Ext.BLANK_IMAGE_URL = '/ext-3.3.1/resources/images/default/s.gif';
                        
            Ext.ns('domain');
            domain.Main = {
                init: function(){                    
                    
                    
                    var form = new Ext.form.FormPanel({                        
                        title:'Form load from JSON',
                        width:400,
                        //height:190,              
                        bodyStyle:'padding:10px',
                        items:[{
                                xtype:'textfield',                                
                                fieldLabel:'Cadena',
                                name:'cadena'                                
                            },{
                                xtype:'numberfield',                                
                                fieldLabel:'Numero',                                
                                name:'numero'                                
                            },{
                                xtype:'textarea',                                
                                fieldLabel:'Texto',
                                name:'texto'                                
                            },{
                                xtype:'datefield',                                
                                fieldLabel:'Fecha',
                                name:'fecha'                                
                            },{
                                "xtype":"combo",
                                "fieldLabel":"Parroquia",
                                "hiddenName":"tipoparroquia_id",
                                "forceSelection":true,
                                "triggerAction":"all",
                                "displayField":"descripcion",
                                "valueField":"tipoparroquia_id",
                                //selectOnFocus:true,
                                //mode:'remote',
                                "store":new Ext.data.ArrayStore({
                                    "url":"entity/list/tipoparroquia",
                                    "fields":[{
                                            "name":"tipoparroquia_id", 
                                            type: 'long'
                                        },{
                                            "name":"descripcion", 
                                            type: 'string'
                                        }],    
                                    autoLoad:true
                                })
                            },{
                                xtype:'radiogroup',
                                fieldLabel: 'Documento de Propiedad',
                                columns:2,
                                name:'opcion',                                
                                items:[{
                                        name:'opcion',
                                        inputValue:'true',
                                        boxLabel: 'Si'                                        
                                    },{
                                        name:'opcion',
                                        inputValue:'false',
                                        boxLabel: 'No',
                                        checked:true                                        
                                    }]
                            },{
                                xtype: 'checkboxgroup',
                                fieldLabel: 'Auto Layout',
                                columns:[100,100],
                                vertical: true,
                                name:'auto',
                                items: [
                                    {boxLabel: 'Item 1', name: 'auto', inputValue: 'a'},
                                    {boxLabel: 'Item 2', name: 'auto', inputValue: 'b'},
                                    {boxLabel: 'Item 3', name: 'auto', inputValue: 'c'},
                                    {boxLabel: 'Item 4', name: 'auto', inputValue: 'd'},
                                    {boxLabel: 'Item 5', name: 'auto', inputValue: 'e'}
                                ]
                            }],
                        buttons:[{
                                text:'load',
                                handler:function() {
                                    var vals = {
                                        success:true,
                                        data:[{
                                                cadena:'cadenita',
                                                numero:1234,
                                                texto:'testo sin tamaño',
                                                fecha:'2011-11-12',
                                                tipoparroquia_id:'3',
                                                opcion:true,
                                                auto:[true,true]
                                            }]
                                    };
                                    console.log(vals);
                                    var store = new Ext.data.JsonStore({                                              
                                        data:vals.data,
                                        fields:[
                                            'cadena',
                                            {name:'numero'},
                                            'texto',
                                            {name:'fecha'},
                                            {name:'tipoparroquia_id'},
                                            {name:'opcion'},
                                            {name:'auto'}
                                        ],
                                        autoLoad:true
                                    });
                                    //form.clearInvalid();
                                    form.getForm().loadRecord(store.getAt(0));                                    
                                }
                            }]
                    });
                    
                    form.render('form');
                    
                }     
            }
            
            
            Ext.onReady(domain.Main.init,domain.Mainr);
        </script>

    </head>
    <body>
        <div id="form"></div>
        <div id="grid"></div>
    </body>
</html>

