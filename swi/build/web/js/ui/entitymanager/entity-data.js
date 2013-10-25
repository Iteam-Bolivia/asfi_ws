/*!
 * ICG - International Consulting Group, 2011
 * 
 */



com.icg.formBuilder =  function(type) {
    return com.icg.formBuilderX[type];
}

com.icg.Entityform = function(options) {
    var onSelectType = function(combo,record,index){             
        switch(record.data.type) {
            case 'string':
                form.remove(1);
                form.add(com.icg.formBuilder('string'));
                break;
            case 'integer':
                form.remove(1);
                form.add(com.icg.formBuilder('integer'));
                break;    
            case 'float':
                form.remove(1);
                form.add(com.icg.formBuilder('float'));
                break;    
            case 'date':
                form.remove(1);
                form.add(com.icg.formBuilder('date'));
                break;       
            case 'boolean':
                form.remove(1);
                form.add(com.icg.formBuilder('sino'));
                break;     
            case 'entity':
                form.remove(1);
                form.add(com.icg.formBuilderX.entity(form));
                break;          
            default:
                form.remove(1);               
        }                            
        form.doLayout();        
    };
    
    var form = new Ext.FormPanel({
        autoHeight: true,
        border: false,
        labelWidth: 150,
        waitMsgTarget:true,
        url:'load/add/'+options.id,
        bodyStyle:'padding: 10px',
        layout:'form',
        autoScroll: true,
        items: [{
                xtype:'fieldset',
                title: 'Informaci&oacute;n del atributo',            
                autoHeight: true,
                defaultType: 'textfield',            
                defaults: {
                    width:210, 
                    allowBlank: false,
                    msgTarget:'side'
                },
                items: [{
                        fieldLabel: 'Nombre ID',                
                        name: 'name',                
                        maxLength: 64,
                        vtype:'alpha',
                        regex: /^[a-z,_]{0,}$/ 
                    },{
                        xtype:'displayfield',
                        value:'<i>El ID es un nombre &uacute;nico en el esquema de datos. (nombre de columna)</i>',
                        width:300
                    },{
                        fieldLabel: 'Etiqueta',                
                        name: 'label',
                        maxLength: 128                
                    },{
                        xtype: 'combo',
                        fieldLabel: 'Tipo',
                        hiddenName:'type',
                        forceSelection:true,                
                        store: new Ext.data.ArrayStore({
                            fields: ['type','objeto'],
                            data : [/*['blob','Binario'],*/['string','Cadena'],['text','Texto'],['integer','Entero'],['float','Real'],['boolean','Si o No'],['date','Fecha'],['time','Hora'],/*['timestamp','Fecha y Hora'],*/['entity','Entidad']/*,['subentity','Entidad propia'],['entity','Entidad agregada (1/n)'],['centity','Entidad compuesta (n)'],['class','Entidad compuesta (1)']*/]
                        }),  
                        valueField:'type',
                        displayField:'objeto',                
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        emptyText:'Selecione el tipo...',
                        selectOnFocus:true,                                
                        listeners: {
                            select: onSelectType
                        }
                    },{
                        xtype: 'checkbox',
                        fieldLabel:'Aceptar nulo',
                        name:'nullable',
                        checked:true
                    },{
                        xtype: 'textarea',
                        fieldLabel:'Documentaci&oacute;n',
                        name:'description',
                        allowBlank: true                
                    }]
            }]        
    });
        
    if(options.record) {
        onSelectType(null,options.record,null);
        form.getForm().loadRecord(options.record);
    }
    return form;
}

com.icg.updateEntityform = function(options) {
    
    var form = new Ext.FormPanel({
        autoHeight: true,
        border: false,
        labelWidth: 150,
        waitMsgTarget:true,
        url:'load/update/'+options.id,
        bodyStyle:'padding: 10px',
        layout:'form',
        autoScroll: true,
        items: [{
                xtype:'fieldset',
                title: 'Informaci&oacute;n del atributo',            
                autoHeight: true,
                defaultType: 'textfield',            
                defaults: {
                    width:210, 
                    allowBlank: false,
                    msgTarget:'side'
                },
                items: [{                                   
                        xtype: 'hidden',                
                        name: 'name'                        
                    },{
                        fieldLabel: 'Etiqueta',                
                        name: 'label',
                        maxLength: 128                
                    },{
                        xtype: 'textarea',
                        fieldLabel:'Documentaci&oacute;n',
                        name:'description',
                        allowBlank: true                
                    }]
            }]        
    });
        
//    if(options.record) {        
//        form.getForm().loadRecord(options.record);
//    }
    return form;
}

com.icg.EntityGrid = function(options) {
    /**
     * Creamos el datastore donde se van a almacenar los datos de la tabla
     */
    var dataStore = new Ext.data.JsonStore({
        autoDestroy: true,
        url:'load/entity/view/'+options.url,
        idProperty:'name',
        fields: ['name','type','length','nullable','rel','mask','datePattern','numberPattern','hidden','defaultValue','label','yesValue','noValue','multiplicity','description','maxValue','minValue','allowNegative'],
        autoLoad: true
    });
    
    var grid = new Ext.grid.GridPanel({
        title: options.name,
        store: dataStore,
        region: 'center',
        height: 300,
        loadMask:true,
        ddGroup:'_blockEntityGroup',
        enableDragDrop:true,
        selModel:new Ext.grid.RowSelectionModel({
            singleSelect : true
        }),
        columns: [new Ext.grid.RowNumberer({
                widht:25
            }),{
                id: 'name',
                header: "ID",
                width: 100,
                sortable: true,
                dataIndex: 'name'
            },{
                header: "Tama&ntilde;o",
                width: 70,
                sortable: true,
                dataIndex: 'length'
            },{
                header: "Etiqueta",
                width: 120,
                sortable: true,
                dataIndex: 'label'
            },{
                header: "Tipo",
                width: 70,
                sortable: true,
                dataIndex: 'type'
            },{
                header: "Acepta nulo",
                width: 70,
                sortable: true,
                dataIndex: 'nullable'
            },{
                header: "REl",
                width: 80,
                sortable: true,
                dataIndex: 'rel'
            },{
                header: "Descripci&oacute;n",
                width: 70,
                sortable: true,
                dataIndex: 'descripcion'
            },{
                header: "Oculto",
                width: 50,
                sortable: true,
                dataIndex: 'hidden'
            },{
                header: "Valor por defecto",
                width: 100,
                sortable: true,
                dataIndex: 'defaultValue'
            },{
                header: "SI",
                width: 50,
                sortable: true,
                dataIndex: 'yesValue'
            },{
                header: "NO",
                width: 50,
                sortable: true,
                dataIndex: 'noValue'
            },{
                header: "Multi",
                width: 50,
                sortable: true,
                dataIndex: 'multiplicity'
            }],
        frame:true,
        border:false,
        tbar:[{                
                iconCls:'refresh',
                tooltip:'Actualizar',
                handler:function() {                
                    grid.store.reload();
                }
            },'-',{
                iconCls: 'create',
                tooltip: 'Nuevo Atributo',
                handler: function() {
                    if(options.record) {
                       delete options.record;
                    }                        
                    com.icg.entity.newAttribute(grid,options)
                }
            },{
                iconCls: 'update',
                tooltip: 'Modificar Atributo',
                handler: function() {
                   var record = grid.getSelectionModel().getSelected();                    
                    if(record) {                        
                        options.record = record;
                        com.icg.entity.updateAttribute(grid,options)
                    } else {
                        com.icg.entity.mustSelect()
                    } 
                }
            },{
                iconCls: 'delete',
                tooltip: 'Eliminar Atributo',
                handler: function(){
                    var record = grid.getSelectionModel().getSelected();                    
                    if(record) {
                        Ext.MessageBox.confirm('Confirmar', '¿Confirma eliminar el atributo? Se perder&aacute;n Datos.',eliminarRegistro);                  
                    } else {
                        com.icg.entity.mustSelect()
                    }                
                }
            },'-'/*,{
                iconCls: 'create_entity',
                tooltip: 'Nueva Entidad propia',
                handler: function() {
                    //com.icg.entity.newattribute(grid,options)
                }
            },'-'*/,{
                iconCls: 'entity-form',
                tooltip: 'Formulario',
                handler: function(){       
                    if(grid.store.getTotalCount() > 0) {
                        if(options.record) {
                           delete options.record;
                        }
                        if(options.entity_id) {
                           delete options.entity_id;
                        }
                        if(options.target) {
                           delete options.target;
                        }
                        com.icg.entity.viewform(options)
                    } else {                   
                        com.icg.entity.noStructError();
                    }                     
                }
            },'-',{
                iconCls: 'entity-grid',
                tooltip: 'Datos',
                handler: function(){
                    if(grid.store.getTotalCount() > 0) {
                        /*var griddata = new Ext.grid.GridPanel({
                            columns:com.icg.sitmax.struct.public_tipo_material_calzada.gridColumns(),
                            store:new Ext.data.JsonStore(com.icg.sitmax.struct.public_tipo_material_calzada.entityJsonStore()),                            
                            border:false,
                            loadMask:true,
                            tbar:com.icg.entity.buttons(options, true, true)
                        });
                        options.target = griddata;
                        griddata.store.load();
                        var win = new Ext.Window({
                            title:'Datos ' + options.name,
                            layout:'fit',                            
                            width:600,  
                            height:300,                                    
                            modal:true,
                            items:[griddata]                            
                        });
                        win.show();
                        */
                        Ext.Ajax.request({
                            url:'load/extjs/grid/'+options.id,
                            method: 'GET',                    
                            success: function(result, request) {                        
                                var sgrid = Ext.util.JSON.decode(result.responseText);  
                                var store = new Ext.data.JsonStore(sgrid.store);
                                sgrid.store = store;

                                var winTitle = sgrid.title;
                                delete sgrid.title;
                                sgrid.tbar = com.icg.entity.buttons(options, true, true);
                                var griden = new Ext.grid.GridPanel(sgrid);
                    
                                options.target = griden;
                            
                                var win = new Ext.Window({
                                    title:winTitle,
                                    layout:'fit',                            
                                    width:600,  
                                    height:300,                                      
                                    boxMaxHeight:300,
                                    boxMaxWidth:700,
                                    modal:true,
                                    items:[griden]                            
                                });
                                win.show();
                            },
                            failure: function(result, request) {                        
                                Ext.Msg.alert('Error','Error en la solicitud');
                            }
                        });
                    } else {                   
                        com.icg.entity.noStructError();
                    }                
                }
            },{
                iconCls: 'entity-grid-deleted',
                tooltip: 'Datos eliminados',
                handler: function(){
                    if(grid.store.getTotalCount() > 0) {                        
                        Ext.Ajax.request({
                            url:'load/extjs/grid/'+options.id,
                            method: 'GET',                    
                            success: function(result, request) {                        
                                var sgrid = Ext.util.JSON.decode(result.responseText);  
                                sgrid.store.url='history/deleted/'+options.name;
                                var store = new Ext.data.JsonStore(sgrid.store);
                                sgrid.store = store;

                                var winTitle = sgrid.title + ' (eliminados)';
                                delete sgrid.title;
                                sgrid.tbar = com.icg.entity.buttons(options, false, false);
                                
                                var griden = new Ext.grid.GridPanel(sgrid);                    
                                options.target = griden;
                            
                                var win = new Ext.Window({
                                    title:winTitle,
                                    layout:'fit',                            
                                    width:600,  
                                    height:300,                                      
                                    boxMaxHeight:300,
                                    boxMaxWidth:700,
                                    modal:true,
                                    items:[griden]                            
                                });
                                win.show();
                            },
                            failure: function(result, request) {                        
                                Ext.Msg.alert('Error','Error en la solicitud');
                            }
                        });
                    } else {                   
                        com.icg.entity.noStructError();
                    }                
                }
            },'-',{
                iconCls: 'settings',
                tooltip: 'Opciones',
                handler: function(){
                    //grid.getStore().reload();
                    //Ext.Msg.alert('URL\'s','<b>Form:</b> load/extjs/'+options.id+'<br>'+'<b>Grid:</b> load/extjs/grid/'+options.id+'<br>'+'<b>Store:</b> load/extjs/store/'+options.id)
                    var grid = new Ext.grid.GridPanel({                        
                        store:new Ext.data.JsonStore({
                            url:Ext.SROOT+'entity/database/'+options.id,
                            root:'data',
                            fields:['column_name','data_type','numeric_precision','character_maximum_length'],
                            autoLoad:true
                        }),
                        border:false,
                        frame:false,                        
                        columns:[new Ext.grid.RowNumberer({
                                widht:25
                            }),{
                                header: "Propiedad", 
                                width: 200, 
                                dataIndex: 'column_name'
                            },{
                                header: "Tipo", 
                                width: 100, 
                                dataIndex: 'data_type'
                            },{
                                header: "Tama&ntilde;o Cadena",                                 
                                width: 150, 
                                dataIndex: 'character_maximum_length'
                            },{
                                header: "Precisi&oacute;n",                                 
                                width: 100, 
                                dataIndex: 'numeric_precision'
                            }]//,
//                        tbar:[{
//                                text:'migrar',
//                                handler:function() {
//                                    
//                                }
//                        }]
                    });
                    var win = new Ext.Window({
                        title:'Base de Datos de '+options.name,
                        layout:'fit',
                        width:600,
                        height:300,
                        resizable:false,
                        items:grid
                        });
                    win.show();    
                }
            },'-',{
                iconCls: 'attr-visible',
                tooltip: 'Hacer visible',
                handler: function(){
                    var record = grid.getSelectionModel().getSelected();                
                    if(record) {
                        var box = Ext.MessageBox.wait('Por favor espere.', 'Haciendo visible el <b>Atributo</b>'); 
                        Ext.Ajax.request({                    
                            url:'load/visible/'+options.id,
                            method: 'POST',
                            params: {
                                name:record.data.name
                            },                    
                            success: function(result, request) {
                                grid.getStore().reload();
                                com.icg.formBuilderX.entityStore.reload();
                                box.hide();
                            },
                            failure: function(result, request) {
                                Ext.Msg.alert('Error','Fallo.');
                                box.hide();
                            }
                        });            
                    } else {
                        com.icg.entity.mustSelect()
                    }                
                }
            },'-',{
                iconCls: 'arrow-up',
                tooltip: 'Subir',
                handler: function(){
                    var record = grid.getSelectionModel().getSelected();                
                    if(record) {
                        var box = Ext.MessageBox.wait('Por favor espere.', 'Cargando...'); 
                        Ext.Ajax.request({                    
                            url:'load/move/'+options.id,
                            method: 'POST',
                            params: {
                                name:record.data.name,
                                direction:'up'
                            },                    
                            success: function(result, request) {
                                grid.getStore().reload();
                                box.hide();
                            },
                            failure: function(result, request) {
                                Ext.Msg.alert('Error','Fallo.');
                                box.hide();
                            }
                        });            
                    } else {
                        com.icg.entity.mustSelect()
                    }                
                }
            },'-',{
                iconCls: 'arrow-down',
                tooltip: 'Bajar',
                handler: function(){
                    var record = grid.getSelectionModel().getSelected();                
                    if(record) {
                        var box = Ext.MessageBox.wait('Por favor espere.', 'Cargando...'); 
                        Ext.Ajax.request({                    
                            url:'load/move/'+options.id,
                            method: 'POST',
                            params: {
                                name:record.data.name,
                                direction:'down'
                            },                    
                            success: function(result, request) {
                                grid.getStore().reload();
                                box.hide();
                            },
                            failure: function(result, request) {
                                Ext.Msg.alert('Error','Fallo.');
                                box.hide();
                            }
                        });            
                    } else {
                        com.icg.entity.mustSelect()
                    }                
                }
            }]
    });
   
    var eliminarRegistro = function(b) {        
        if(b == 'yes') {
            var record = grid.getSelectionModel().getSelected();
            var box = Ext.MessageBox.wait('Por favor espere.', 'Eliminando el <b>Atributo</b>'); 
            Ext.Ajax.request({                    
                url:'load/delete/'+options.id,
                method: 'POST',
                params: {
                    name:record.data.name
                },                    
                success: function(result, request) {
                    grid.getStore().reload();
                    box.hide();
                },
                failure: function(result, request) {
                    Ext.Msg.alert('Error','Fallo.');
                    box.hide();
                }
            });            
        }              
    }
    return grid;
}



