/**
 * Sitmax ExtJS UI
 * Copyright(c) 2011-2012 ICG Inc.
 * @author Johns Castillo Valencia
 * @class Modules, Modulos del sistema
 */

com.icg.scripts = null;

com.icg.createEntity = function(grid,record) {
        
    var form = new Ext.FormPanel({
        autoHeight: true,
        border: false,
        labelWidth: 130,
        labelSeparator: ':',
        url : Ext.SROOT+'entity/create',
        //waitMsgTarget: true,
        bodyStyle:'padding: 10px',
        layout:'form',
        autoScroll: true,
        items: [{
            xtype:'fieldset',
            title: 'Información de la Entidad',            
            autoHeight: true,
            defaultType: 'textfield',            
            defaults: {
                width:210, 
                allowBlank: false,
                msgTarget: 'side'
            },
            items: [{
                fieldLabel: 'Nombre',                
                name: 'name',                
                maxLength: 64,
                readOnly:record ? true : false,
                vtype:'alpha',
                regex: /^[a-z,_]{0,}$/ 
            },{
                xtype:'displayfield',
                value:'<i>El "Nombre" es único en la base de datos (nombre de tabla)</i>',
                width:300
            },{
                fieldLabel: 'Etiqueta',                
                name: 'label',
                maxLength: 128
            },{  
                fieldLabel: 'Documentación',     
                xtype:'textarea',
                name: 'description',       
                allowBlank: true
            },{
                xtype: 'checkbox',
                fieldLabel:'Crear Base de Datos',
                name:'data',
                checked:true,
                disabled:record ? record.get('data') : false
            },{  
                xtype:'hidden',
                name: 'id'  
            }]
        }],
        buttonAlign:'center',
        buttons: [{
            text: 'Guardar',
            formBind: true,
            handler: function() {                
                form.getForm().submit({
                    //waitMsg : 'Guardando...',
                    success: function(form, action) {
                        grid.getStore().reload();                        
                        win.close();
                    },
                    failure: function(form, action) {                        
                        Ext.MessageBox.show({
                            title:'Error',
                            msg:action.result.errorMessage,
                            buttons: Ext.MessageBox.OK,
                            icon:Ext.Msg.ERROR
                        });
                    }
                });
            }
        },{
            text: 'Limpiar',            
            handler: function() {
                form.getForm().reset();
            }
        }]        
    });
    
    var win = new Ext.Window({
        iconCls:'entity-form',
        title:record ? 'Modificar Entidad' :'Nueva Entidad',
        layout:'fit',
        width:550,
        autoHeight:true,
        resizable:false,
        modal:true,
        items:[form]
    });
    win.show();
    if(record) {
        form.getForm().loadRecord(record);
    }
}

com.icg.destroyEntity = function(grid,record) {
    var form = new Ext.FormPanel({        
        autoHeight: true,
        border: false,
        labelWidth: 150,        
        url : Ext.SROOT+'entity/destroy',
        //waitMsgTarget: true,        
        bodyStyle:'padding: 10px',        
        items: [{
            xtype:'fieldset',
            title: 'Opciones de eliminación',                
            autoHeight: true,          
            defaults: {
                width:190
            },
            items: [{
                xtype: 'checkbox',
                fieldLabel:'Eliminar la Entidad',
                name:'entity'
            },{
                xtype: 'checkbox',
                fieldLabel:'Eliminar la Base de Datos',
                name:'data'
            },{  
                xtype:'hidden',
                name: 'id'  ,
                value:record.get('id')
            }]
        }],
        buttonAlign: 'center',
        buttons: [{
            text: 'Eliminar',            
            formBind: true,
            handler: function() {                
                form.getForm().submit({
                    //waitMsg : 'Eliminando...',
                    success: function(form, action) {
                        grid.getStore().reload();                        
                        win.close();
                    },
                    failure: function(form, action) {
                        console.log(action)
                        com.icg.errors.serverError(action);
                    }
                });
            }
        }]        
    });
    var win = new Ext.Window({
        title:'Eliminar Entidad',
        layout:'fit',
        width:550,
        autoHeight:true,
        resizable:false,
        closeAction:'hide',
        plain:true,
        modal:true,
        items:[form]
    });
    win.show();
}

com.icg.EntityManager = {
    renderIcon: function(val) {
        if(val) {
            return '<img src="'+Ext.IMAGES_SILK+'database_table.png">';
        } else {
            return ' <span style="color:RED">No tiene</span>';
        }
    },
    entityName: function(val) {
        return ' <span style="font-weight:bold">'+val+'</span>';
    },
    /**
     * Maim Entity Grid 
     * Version 2012
     * @author: Johns Castillo Valencia
     **/
    init: function() { 
        var store = new Ext.data.JsonStore({
            url:Ext.SROOT+'entity/list',            
            idProperty:'id',
            fields:['id','name','parent','label','description','data']            
        }); 
        
        store.load();
        var grid = new Ext.grid.GridPanel({
            title:'Entidades',
            region:'center',
            border:false,
            store: store,
            loadMask:true,
            selModel:new Ext.grid.RowSelectionModel({
                singleSelect : true
            }),
            columns: [new Ext.grid.RowNumberer({                
                width:27
            }),{             
                header: "Nombre",                
                sortable: true,
                dataIndex: 'name',
                renderer:this.entityName
            },{               
                header: "Etiqueta",                
                sortable: true,
                dataIndex: 'label'
            },{             
                header: "Documentaci&oacute;n",              
                sortable: true,
                width: 250,
                dataIndex: 'description'
            },{             
                header: "Base de Datos",              
                sortable: false,
                align: 'center',
                width: 100,
                dataIndex: 'data', 
                renderer:this.renderIcon
            }],
            tbar: [{                
                iconCls:'refresh',
                tooltip:'Actualizar',
                handler:function() {                
                    grid.store.reload();
                }
            },'-',{
                iconCls: 'create',
                tooltip: 'Nuevo',
                handler: function(){
                    com.icg.createEntity(grid);
                }
            },{
                iconCls: 'update',
                tooltip: 'Modificar',
                handler: function(){
                    var record = grid.getSelectionModel().getSelected();
                    if(record) {
                        com.icg.createEntity(grid,record);
                    } else {
                        com.icg.errors.mustSelect();
                    }
                }
            },{
                iconCls: 'delete',
                tooltip: 'Eliminar',
                handler: function(){
                    var record = grid.getSelectionModel().getSelected();
                    if(record) {
                        com.icg.destroyEntity(grid,record);
                    } else {
                        com.icg.errors.mustSelect();
                    }
                }
            },'-',{
                iconCls: 'open',
                tooltip: 'Abrir',
                handler: function(){
                    var record = grid.getSelectionModel().getSelected();
                    if(record) {
                        var options = {
                            id: record.get('id'),
                            url:'entity?entity='+record.get('name'),
                            title:record.get('label')                            
                        };
                        top.com.icg.openModule(options);
                    } else {
                        com.icg.errors.mustSelect();
                    }                    
                }
            }]      
        });
        grid.on('rowdblclick',function(grid, index, event){
            //var record = grid.getStore().getAt(index); 
        });
        var tables = new Ext.grid.GridPanel({
            title:'Base de Datos',
            region:'south',
            border: false,
            split:true,
            minSize: 100,
            maxSize: 250,
            collapsible:true,
            height:200,
            store: new Ext.data.JsonStore({
                url:Ext.SROOT+'entity/noentitydatabase',
                idProperty:'id',
                fields:['table_name'],
                autoLoad:true
            }),
            loadMask:true,
            selModel:new Ext.grid.RowSelectionModel({
                singleSelect : true
            }),
            columns: [new Ext.grid.RowNumberer({
                width:27
            }),{             
                header: "Nombre",                
                sortable: true,
                dataIndex: 'table_name',
                renderer:this.entityName
            },{             
                header: "Entidad",              
                sortable: false,
                align: 'center',
                width: 100,
                dataIndex: 'data', 
                renderer:this.renderIcon
            }]
        });
        
        new Ext.Viewport({    
            border:false,
            layout:'border',
            items:[grid,tables]
        });
    }
}

Ext.onReady(com.icg.EntityManager.init,com.icg.EntityManager);