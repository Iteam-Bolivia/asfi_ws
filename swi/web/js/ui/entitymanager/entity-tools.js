Ext.BLANK_IMAGE_URL = '/ext-3.3.1/resources/images/default/s.gif';
Ext.ns('com.icg.entity');

com.icg.entity = {
    buttons: function(options,esaveupdate,edelete) {
        var tbar = [{                
            iconCls:'refresh',
            tooltip:'Actualizar',
            handler:function() {                
                options.target.store.reload();
            }
        },'-',{
            iconCls: 'create',
            tooltip:'Nuevo',
            disabled:!esaveupdate,
            handler:function(){        
                options.entity_id = undefined;
                options.record = undefined;
                com.icg.entity.viewform(options);
            }
        },{
            iconCls: 'update',
            tooltip:'Modificar',
            disabled:!esaveupdate,
            handler:function(){
                var record = options.target.getSelectionModel().getSelected(); 
                if(!record) {
                    Ext.MessageBox.show({
                        title:'Aviso',
                        msg:'Debe seleccionar un <b>Registro</b>.',
                        buttons: Ext.MessageBox.OK,
                        icon:Ext.Msg.INFO
                    });
                } else { 
                    options.entity_id = record.get(options.target.store.idProperty);
                    com.icg.entity.viewform(options);                                        
                }     
            }
        },{
            iconCls: 'delete',
            tooltip:'Eliminar',
            disabled:!edelete,
            handler:function() {
                var record = options.target.getSelectionModel().getSelected(); 
                if(!record) {
                    Ext.MessageBox.show({
                        title:'Aviso',
                        msg:'Debe seleccionar un <b>Registro</b>.',
                        buttons: Ext.MessageBox.OK,
                        icon:Ext.Msg.INFO
                    });
                } else {                                                                              
                    Ext.MessageBox.confirm('Confirmar', '¿Confirma eliminar el registro? Se perderan Datos.',function(r) {
                        if(r == 'yes') {
                            var id = record.get(options.target.store.idProperty);
                            var box = Ext.MessageBox.wait('Por favor espere.', 'Eliminando el <b>registro</b>'); 
                            Ext.Ajax.request({                    
                                url:'entity/delete/'+options.id,
                                method: 'POST',
                                params: {
                                    entity_id:id
                                },                    
                                success: function(result, request) {    
                                //    console.log(request);
                                //                                        var r = Ext.util.JSON.decode(result.responseText);
                                //                                        if(!r.success) {
                                //                                            com.icg.sitmax.security.Login();
                                //                                        } else {                                        
                                    options.target.getStore().reload();                                            
                                //                                        }                                        
                                    box.hide();
                                },
                                failure: function(result, request) {
                                    if(result.status == '403') {
                                        com.icg.sitmax.security.msg.e403();                                            
                                    }
                                }
                            });
                        }
                    });
                }                                                                               
            }
        },'-',{                
            iconCls:'history',
            tooltip:'Historico del registro',
            handler:function() {                
                var record = options.target.getSelectionModel().getSelected();
                if(record) {                    
                    var _oid = record.data[options.id+'_id'];
                    var op = {
                        id: options.id+'/'+_oid,
                        iconCls:'history',
                        url:'history/'+options.id+'/'+_oid,
                        title: options.name+'/'+_oid                         
                    };                    
                    top.com.icg.openModule(op);
                } else {
                    com.icg.errors.mustSelect();
                } 
            }
        }];            
        return tbar;    
    },
    formbuttons: function(entity) {
        var tbar = [{
            iconCls: 'silk-add',
            text:'Nuevo',
            handler: function() { 
                com.icg.entity.viewform({
                    url:'persona_telefonos',
                    text:'Telefonos',
                    id:'persona_telefonos'
                })
            }
        },'-',{
            iconCls: 'silk-table-refrosh',
            text:'Modificar'
        },'-',{
            iconCls: 'silk-delete',
            text:'Eliminar'
        }];
        return tbar;
    },
    newAttribute: function(grid,options) {
        var wform = com.icg.Entityform(options);               
        var win = new Ext.Window({
            iconCls:'entity-form',
            title:'Nuevo atributo de '+options.name,
            layout:'fit',
            width:550,
            autoHeight:true,
            closeAction:'hide',
            resizable:false,
            plain: true,
            modal:true,
            items: wform,
            buttonAlign: 'center',
            buttons: [{
                text: 'Guardar',
                formBind: true,
                handler: function() {                
                    wform.getForm().submit({
                        //waitMsg : 'Guardando...',
                        success: function(form, action) {
                            form.reset();
                            var store = grid.getStore();
                            store.reload();
                            win.close();
                        },
                        failure: function(form, action) {
                            if(action.failureType == 'server') {
                                var r = Ext.util.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('Aviso', r.errorMessage);
                            } /*else {
                                Ext.Msg.alert('Aviso','Hay errores en el formulario.');
                            }*/
                        }
                    });

                }
            },{
                text: 'Limpiar',
                handler: function() {
                    wform.getForm().reset();
                }
            }]
        });
        win.show(this);
    },
    updateAttribute: function(grid,options) {
        var wform = com.icg.updateEntityform(options);               
        var win = new Ext.Window({
            iconCls:'entity-form',
            title:'Modificar atributo de '+options.name,
            layout:'fit',
            width:550,
            autoHeight:true,
            closeAction:'hide',
            resizable:false,
            plain: true,
            modal:true,
            items: wform,
            buttonAlign: 'center',
            buttons: [{
                text: 'Guardar',
                formBind: true,
                handler: function() {                
                    wform.getForm().submit({
                        //waitMsg : 'Guardando...',
                        success: function(form, action) {
                            form.reset();
                            var store = grid.getStore();
                            store.reload();
                            win.close();
                        },
                        failure: function(form, action) {
                            if(action.failureType == 'server') {
                                var r = Ext.util.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('Aviso', r.errorMessage);
                            }/* else {
                                Ext.Msg.alert('Aviso','Hay errores en el formulario.');
                            }*/
                        }
                    });

                }
            },{
                text: 'Limpiar',
                handler: function() {
                    wform.getForm().reset();
                }
            }]
        });
        win.show(this);
        if(options.record) {        
            wform.getForm().loadRecord(options.record);
        }
    },
    /**
    * Creates ViewForm for create new {entity} type
    * require:
    * options.id: entity ID
    * options.name: entity name or Label
    * optional:
    * options.target: grid to reload after create
    * option.record: to load data from record
    * options.entity_id: to load data from server
    * @Author: John Castillo Valenicia
    */
    viewform: function(options) {
        var msg = Ext.MessageBox.wait('Abriendo','Espere por favor');
        Ext.Ajax.request({
            url:'load/extjs/'+options.id,
            method: 'GET',                          
            success: function(result, request) {                        
                msg.hide();
                var win = new Ext.Window({                                
                    layout:'fit',  
                    title:options.name,
                    width:550, 
                    height:200,
                    boxMaxHeight:300,
                    boxMaxWidth:700,
                    //minHeight:300,
                    modal:true,
                    //autoHeight:true,
                    resizable:true,
                    autoScroll:true,
                    bodyStyle:'padding-rigth:10px'                          
                });
                            
                var xform = com.icg.entity.utilsui.form(result,xform,win,options.target ? options.target : null,options.fk,options.parent_id);
                //load data           
                if(options.record) {
                    xform.loadRecord(options.record);
                } else if(options.entity_id) {
                    xform.getForm().load({
                        url:'entity/get/'+options.id,
                        method:'GET',
                        params:{
                            id:options.entity_id
                        }                                                    
                    });
                }          
                           
                xform.setTitle(undefined);
                win.add(xform);
                win.show();                                                
            },
            failure: function(result, request) {                        
                Ext.Msg.alert('Error','Error en la solicitud');
            }
        });         
    },

    viewgrid: function(grid,options) {
        
    },
    view: function(data) {
        if(data.length>0) {
            var cols = new Array();
            var fields = new Array();
            for(var prop in data[0]) {                                                    
                //console.log("key:" + prop);
                var col = {
                    header:prop,
                    dataIndex:prop
                };
                cols.push(col);
                var field = {
                    name:prop
                };
                fields.push(field)
            }
                                                                                                
            var grid = new Ext.grid.GridPanel({
                title:'Results',                                                  
                width:400,
                height:190,
                store:new Ext.data.JsonStore({
                    fields:fields,
                    data:data,
                    autoLoad:true
                }),
                columns:cols
            });
            return grid;
        }
        return undefined;
    }
}

com.icg.entity.utilsui = {
    form: function(response,xform,winContent,grldReload, fk, parent_id) {
        var robj = Ext.util.JSON.decode(response.responseText);          
        var sform = Ext.util.JSON.decode(robj.form);  
        var btns = [{
            text:'Guardar',
            formBind: true,
            handler:function() {
                xform.getForm().submit({
                    //waitMsg : 'Guardando...',
                    success: function(form, action) {
                        xform.getForm().reset();
                        if(grldReload) grldReload.getStore().reload();
                        if(winContent) winContent.close();                        
                    },
                    failure: function(form, action) {
                        //Ext.Msg.alert('Error','Ha ocurrido un error.');
                        if(action.failureType == 'server') {
                            var r = Ext.util.JSON.decode(action.response.responseText);
                            Ext.Msg.alert('Aviso', r.errorMessage);
                        }/* else {
                            Ext.Msg.alert('Aviso','Hay errores en el formulario.');
                        }*/
                    }
                });    
            }
        },{
            text:'Limpiar',
            handler: function() {
                xform.getForm().reset();                
            }
        }];            
        sform.labelWidth=170; 
        sform.buttons=btns; 
        delete sform.title;
        sform.buttonAlign = 'center';
        //sform.buttons=btns;
        Ext.each(sform.items, function(item, index) {
            //console.log(item.xtype)
            if(item.xtype == 'grid') {
                item.tbar = com.icg.entity.buttons({
                    name:item.entityName,
                    id:item.entityID
                });  
            }
        });
        
        
        xform = new Ext.form.FormPanel(sform);
        if(fk && parent_id) {
            xform.getForm().findField(fk).setValue(parent_id);
        }
        return xform;
    },   
    Localform: function(options) {
        //var sform = Ext.util.JSON.decode(response.responseText);          
        var btns = [{
            text:'Guardar',
            formBind: true,
            handler:function() {
                xform.getForm().submit({
                    //waitMsg : 'Guardando...',
                    success: function(form, action) {
                        xform.getForm().reset();
                        if(grldReload) grldReload.getStore().reload();
                        if(winContent) winContent.close();                        
                    },
                    failure: function(form, action) {
                        //Ext.Msg.alert('Error','Ha ocurrido un error.');
                        if(action.failureType == 'server') {
                            var r = Ext.util.JSON.decode(action.response.responseText);
                            Ext.Msg.alert('Aviso', r.errorMessage);
                        } /*else {
                            Ext.Msg.alert('Aviso','Hay errores en el formulario.');
                        }*/
                    }
                });    
            }
        },{
            text:'Limpiar',
            handler: function() {
                xform.getForm().reset();
                if(winContent) winContent.close();
            }
        }];
        sform.buttons=btns; 
        
        Ext.each(sform.items, function(item, index) {
            //console.log(item.xtype)
            if(item.xtype == 'grid') {
                item.tbar = com.icg.entity.buttons({
                    name:item.entityName,
                    id:item.entityID
                });  
            }
        });
        
        
        var xform = new Ext.form.FormPanel(options.objectform);
        return xform;
    }
}

com.icg.entity.noStructError = function() {
    Ext.MessageBox.show({
        title:'Aviso',
        msg:'No se ha definido una <b>estructura</b>.',
        buttons: Ext.MessageBox.OK,
        icon:Ext.Msg.INFO
    });
}

com.icg.entity.mustSelect = function() {
    Ext.MessageBox.show({
        title:'Aviso',
        msg:'Debe seleccionar un <b>Atributo</b>.',
        buttons: Ext.MessageBox.OK,
        icon:Ext.Msg.INFO
    });
}