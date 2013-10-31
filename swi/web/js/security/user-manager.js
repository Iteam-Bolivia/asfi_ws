/**
 * Sitmax ExtJS UI
 * Copyright(c) 2011-2012 ICG Inc.
 * @author Johns Castillo Valencia
 */
Ext.ns('domain.UserManager');

domain.errors = {
    mustSelect : function() {
        Ext.MessageBox.show({
            title:'Aviso',
            msg:'Debe seleccionar un <b>Registro</b>.',
            buttons: Ext.MessageBox.OK,
            icon:Ext.Msg.INFO
        });
    },
    mustBeNatural : function() {
        Ext.MessageBox.show({
            title:'Aviso',
            msg:'Debe seleccionar una persona <b>Natural</b>.',
            buttons: Ext.MessageBox.OK,
            icon:Ext.Msg.INFO
        });
    },
    submitFailure: function(title, msg) {
        Ext.MessageBox.show({
            title:title,
            msg:msg,
            buttons: Ext.MessageBox.OK,
            icon:Ext.Msg.ERROR
        });
    }
};

domain.formButtons = function(options) {
    return [{
        text: 'Guardar',
        iconCls:'entity-save',
        formBind: true,
        handler: function() {                
            options.form.getForm().submit({
                //waitMsg : 'Guardando...',
                success: function(form, action) {
                    options.grid.getStore().reload();                        
                    options.win.close();
                },
                failure: function(form, action) {
                    //Ext.Msg.alert('Warning', action.result.errorMessage);
                    //options.error('Error interno',action.result.errorMessage);
                    domain.errors.submitFailure('Error interno',action.result.errorMessage);
                }
            });
        }
    },{
        text: 'Deshacer',
        iconCls:'entity-undo',
        handler: function() {
            options.form.getForm().reset();
        }
    },'->',{
        text: 'Cerrar',
        handler: function() {
            options.win.close();
        }
    }]; 
};

domain.UserManager = {        
    wizard: function(options) {
        var form = new Ext.FormPanel({                      
            url: Ext.SROOT + 'user/ldap/persist',                                          
            border:false,
            autoHeight:true,
            bodyStyle:'padding:10px',
            labelWidth:130,
            //waitMsgTarget:true,
            items:[{
                xtype:'fieldset',    
                title:'Datos de la Cuenta',    
                defaults:{
                    msgTarget:'side'
                },
                items:[{
                    xtype: 'displayfield',
                    fieldLabel:'Nombre completo',                    
                    name:'displayname'
                },{
                    xtype:'textfield',
                    fieldLabel:'<b>ID Usuario</b>',
                    width:200,
                    allowBlank:false,
                    name:'id_usuario',                                                           
                    regex: /^[a-z,_,0-9]{0,}$/ 
                },{
                    xtype:'textfield',
                    password:true,
                    fieldLabel:'Clave',
                    width: 200,
                    allowBlank:false,
                    name: 'password',
                    inputType:'password',
                    id:'_um_passfield'
                },{
                    xtype:'textfield',
                    password:true,
                    fieldLabel:'Confirmar Clave',
                    width: 200,
                    allowBlank:false,
                    inputType:'password',
                    vtype:'password',
                    initialPassField:'_um_passfield'
                },{
                    xtype:'textfield',
                    fieldLabel:'Cargo',
                    allowBlank:false,
                    width: 200,
                    name:'cargo'
                },{
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Roles',
                    columns:1,
                    items: [{
                        boxLabel: 'Inspector', 
                        name: 'Inspector' 
                    },{
                        boxLabel: 'Supervisor', 
                        name: 'Supervisor'
                    },{
                        boxLabel: 'Admin', 
                        name: 'Admin'
                    }]
                },{
                    "xtype":"hidden",
                    "name":"nombres"
                },{
                    "xtype":"hidden",
                    "name":"apellidos"
                },{
                    "xtype":"hidden",
                    "name":"persona_id"
                }]
            },{
                xtype: 'fieldset',                
                title:'Otras opciones',
                defaults:{
                    msgTarget:'side'
                },
                items:[{
                    "xtype":"datefield",
                    "fieldLabel":"Fecha inicio",
                    "width":200,
                    "name":"fecha_inicio",
                    "allowBlank":true,
                    editable:false,
                    value:new Date(),
                    "format":"d/m/Y",
                    vtype: 'daterange',
                    id:'_start_date_',
                    endDateField: '_end_date_'
                },{
                    "xtype":"datefield",
                    "fieldLabel":"Fecha finalización",
                    "width":200,
                    "name":"fecha_fin",
                    "allowBlank":true,
                    "format":"d/m/Y",
                    vtype: 'daterange',
                    id:'_end_date_',
                    startDateField:'_start_date_'
                },{
                    "xtype":"radiogroup",
                    "fieldLabel":"Estado",                      
                    columns: [100, 100],
                    "items":[{
                        "boxLabel":"Activado",
                        "inputValue":"true",
                        "name":"activo",
                        "checked":true
                    },{
                        "boxLabel":"Desactivado",
                        "inputValue":"false",
                        "name":"activo"
                    }],
                    "name":"activo"
                },{
                    xtype: 'textarea',
                    fieldLabel:'Descripción',
                    width: 200,
                    name: 'descripcion'
                }]
            }]            
        });
        
        var _persona = null;
        
        var prevb = new Ext.Button({
            text:'< Antras',
            disabled:true,
            width:100,
            handler: function() {
                prevb.setDisabled(true);
                nextb.setText('Siguiente >');
                win.getLayout().setActiveItem(0); 
            }
        });
        
        var fnext = function(data) {                           
            _persona = data;
            if(prevb.disabled) {
                prevb.setDisabled(false);
                nextb.setText('Finalizar');
                win.getLayout().setActiveItem(1); 

                var per = data;
                var snombres = 
                (per.primer_nombre == null ? '' : per.primer_nombre) +
                (per.segundo_nombre == null ? '' : ' ' + per.segundo_nombre);
                var sapellidos = 
                (per.primer_apellido == null ? '' : per.primer_apellido) +
                (per.segundo_apellido == null ? '' : ' ' + per.segundo_apellido);

                form.getForm().findField('nombres').setValue(snombres);     
                form.getForm().findField('apellidos').setValue(sapellidos);
                form.getForm().findField('displayname').setValue(snombres + ' ' + sapellidos);
                form.getForm().findField('persona_id').setValue(per.persona_id);
                    
            } else {
                form.getForm().submit({
                    //waitMsg:'Guardando...',
                    success: function(form, action) {                                                      
                        options.grid.store.reload();
                        win.close();                            
                    },
                    failure: function(form, action) {
                        if(action.failureType == 'server') {
                            var r = Ext.util.JSON.decode(action.response.responseText);                                
                            domain.errors.submitFailure('Error', r.errorMessage);
                        } 
                    }     
                });
            }
        };
        
        var nextb = new Ext.Button({
            text:'Siguiente >',
            width:100,
            handler:function() {
                var record = formSearch[1].getSelectionModel().getSelected();
                if(record) {
                    if(record.data.tipo_persona == 'Natural') {                       
                        fnext(record.data);                   
                    } else {
                        domain.errors.mustBeNatural();
                    }
                } else {
                    if(_persona) {
                        //prevb.setDisabled(false);
                        //nextb.setText('Finalizar');
                        //win.getLayout().setActiveItem(1);
                        fnext(_persona);
                    } else {
                        domain.errors.mustSelect();  
                    }                    
                }   
            }
        });        
        var formSearch = domain.personas.searchForm();
        var win = new Ext.Window({
            title:'Crear Cuenta',
            autoScroll:true,
            height:460,
            width:600,
            activeItem: 0,
            layout:'card',
            items:[{
                xtype:'panel',
                layout:'anchor',
                tbar:[{                    
                    tooltip:'Nuevo registro de Persona',
                    iconCls:'create',
                    handler:function() {
                        var options = {};
                        var fp = domain.personas.formNatural(options);  

                        var win = new Ext.Window({
                            title:'Nuevo registro de Persona',
                            width:500,
                            height:450,
                            modal:true,
                            autoScroll:true,
                            items:fp,
                            listeners:{
                                'close': function() {
                                    if(options.formValues) {                                                                                
                                        fnext(options.formValues);    
                                    }    
                                }
                            }
                        });
                        
                        options.window = win;
                        win.show();
                    }                           
                },{                    
                    tooltip:'Eliminar Registro de Persona',
                    iconCls:'delete',
                    handler:function() {
                        var record = formSearch[1].getSelectionModel().getSelected();
                        if(record) {
                            Ext.MessageBox.confirm('Confirmar', '¿Confirma eliminar el registro? Se perderán Datos.',function(r) {
                                if(r == 'yes') {
                                    var id = record.get();
                                    var box = Ext.MessageBox.wait('Por favor espere.', 'Eliminando el <b>registro</b>'); 
                                    Ext.Ajax.request({                    
                                        url:Ext.SROOT + 'entity/delete/persona',
                                        method: 'POST',
                                        params: {
                                            entity_id:record.data.persona_id
                                        },                    
                                        success: function(result, request) {                                                                        
                                            formSearch[1].getStore().reload(); 
                                            //panelpersona.removeAll();
                                            box.hide();
                                        },
                                        failure: function(result, request) {
                                            if(result.status == '403') {
                                                domain.swi.security.msg.e403();                                            
                                            }
                                        }
                                    });
                                } 
                            });
                        } else {
                            domain.errors.mustSelect();
                        }
                    }
                }],
                items:formSearch
            },form],
            modal:true,
            bbar:['->',
            prevb,'-',nextb]
        });        
        win.show();
    },
    update: function(options) {
        var form = new Ext.FormPanel({                      
            url: Ext.SROOT + 'user/ldap/update',                                          
            border:false,
            autoHeight:true,
            bodyStyle:'padding:10px',
            labelWidth:130,
            //waitMsgTarget:true,
            items:[{
                xtype:'fieldset',    
                title:'Datos de la Cuenta',    
                defaults:{
                    msgTarget:'side'
                },
                items:[{
                    xtype: 'compositefield',
                    fieldLabel: 'Nombre completo',   
                    anchor:'-20',
                    items:[{
                        xtype:'displayfield',                        
                        name:'nombres'
                    },{
                        xtype:'displayfield',                        
                        name:'apellidos'
                    }]
                },{
                    xtype:'displayfield',
                    fieldLabel:'<b>ID Usuario</b>',                    
                    name:'id_usuario'
                },{
                    xtype:'textfield',
                    fieldLabel:'Cargo',
                    allowBlank:false,
                    width: 200,
                    name:'cargo'
                },{
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Roles',
                    columns:1,
                    items: [{
                        boxLabel: 'Inspector', 
                        name: 'Inspector' 
                    },{
                        boxLabel: 'Supervisor', 
                        name: 'Supervisor'
                    },{
                        boxLabel: 'Admin', 
                        name: 'Admin'
                    }]
                },{
                    "xtype":"hidden",
                    "name":"funcionario_id"
                }]
            },{
                xtype: 'fieldset',                
                title:'Otras opciones',
                defaults:{
                    msgTarget:'side'
                },
                items:[{
                    "xtype":"datefield",
                    "fieldLabel":"Fecha inicio",
                    "width":200,
                    "name":"fecha_inicio",
                    "allowBlank":true,
                    editable:false,
                    "format":"d/m/Y",
                    vtype: 'daterange',
                    id:'_start_date_',
                    endDateField: '_end_date_'
                },{
                    "xtype":"datefield",
                    "fieldLabel":"Fecha finalizacion",
                    "width":200,
                    "name":"fecha_fin",
                    "allowBlank":true,
                    "format":"d/m/Y",
                    vtype: 'daterange',
                    id:'_end_date_',
                    startDateField:'_start_date_'
                },{
                    "xtype":"radiogroup",
                    "fieldLabel":"Estado",                      
                    columns: [100, 100],
                    "items":[{
                        "boxLabel":"Activado",
                        "inputValue":"true",
                        "name":"activo",
                        "checked":true
                    },{
                        "boxLabel":"Desactivado",
                        "inputValue":"false",
                        "name":"activo"
                    }],
                    "name":"activo"
                },{
                    xtype: 'textarea',
                    fieldLabel:'Descripción',
                    width: 200,
                    name: 'descripcion'
                }]
            }]            
        });                
        
        var prevb = new Ext.Button({
            text:'< Antras',
            disabled:true,
            width:100            
        });
        var nextb = new Ext.Button({
            text:'Finalizar',
            width:100,
            handler: function() {                                           
                form.getForm().submit({
                    //waitMsg:'Guardando...',
                    success: function(form, action) {                                                      
                        options.grid.store.reload();
                        win.close();                            
                    },
                    failure: function(form, action) {
                        if(action.failureType == 'server') {
                            var r = Ext.util.JSON.decode(action.response.responseText);                                
                            domain.errors.submitFailure('Error', r.errorMessage);
                        } 
                    }     
                });                
            }
        });        
        
        var win = new Ext.Window({
            title:'Modificar Cuenta',
            autoScroll:true,
            height:460,
            width:600,
            activeItem: 0,
            layout:'card',
            items:form,
            modal:true,
            bbar:['->',
            prevb,'-',nextb]
        });        
        win.show();
        form.getForm().loadRecord(options.record);
    },
    changePassword: function(options) {
        var form = new Ext.FormPanel({                      
            url: Ext.SROOT + 'user/ldap/changepassword',                                          
            border:false,
            autoHeight:true,
            bodyStyle:'padding:10px',
            labelWidth:130,
            //waitMsgTarget:true,
            items:[{
                xtype:'fieldset',                    
                defaults:{
                    msgTarget:'side'
                },
                items:[{
                    xtype:'displayfield',
                    fieldLabel:'Nombre completo',                    
                    name:'nombres'
                },{
                    xtype:'displayfield',
                    fieldLabel:'<b>ID Usuario</b>',                    
                    name:'id_usuario'
                },{
                    xtype:'textfield',
                    password:true,
                    fieldLabel:'Clave',
                    width: 200,
                    allowBlank:false,
                    name: 'password',
                    inputType:'password',
                    id:'_um_passfield'
                },{
                    xtype:'textfield',
                    password:true,
                    fieldLabel:'Confirmar Clave',
                    width: 200,
                    allowBlank:false,
                    inputType:'password',
                    vtype:'password',
                    initialPassField:'_um_passfield'
                },{
                    "xtype":"hidden",
                    "name":"funcionario_id"
                }]
            }]            
        });                

        var win = new Ext.Window({
            title:'Asignar o cambiar clave',
            autoScroll:true,
            autoHeight:true,
            width:600,
            activeItem: 0,
            layout:'card',
            items:form,
            modal:true,
            buttonAlign:'center',
            buttons:[{
                text:'Guardar',
                width:100,
                handler: function() {                                           
                    form.getForm().submit({
                        //waitMsg:'Guardando...',
                        success: function(form, action) {                                                                                      
                            win.close();                            
                        },
                        failure: function(form, action) {
                            if(action.failureType == 'server') {
                                var r = Ext.util.JSON.decode(action.response.responseText);                                
                                domain.errors.submitFailure('Error', r.errorMessage);
                            } 
                        }     
                    });                
                }
            }]
        });        
        win.show();
        form.getForm().loadRecord(options.record);
    },
    deleteUser: function(options) {
        
        Ext.MessageBox.confirm('Confirmar', '¿Confirma eliminar el registro? Se perderan Datos.',function(r) {
            if(r == 'yes') {
                var id = options.record.data.funcionario_id;
                //var box = Ext.MessageBox.wait('Por favor espere.', 'Eliminando el <b>registro</b>'); 
                Ext.Ajax.request({                    
                    url:Ext.SROOT + 'entity/delete/funcionario',
                    method: 'POST',
                    params: {
                        entity_id:id
                    },                    
                    success: function(result, request) {    
                        options.grid.store.reload(); 
                    //box.hide();
                    },
                    failure: function(result, request) {
                        if(result.status == '403') {
                            domain.swi.security.msg.e403();                                            
                        }
                    }
                });
            }
        });
        
        
    },
    usersGrid: function(options) {
        var store = new Ext.data.JsonStore({
            url:Ext.SROOT+'command/select/list/public/funcionario',
            root:'data',            
            fields:['funcionario_id','cargo','id_usuario','nombres','apellidos',
            'activo','descripcion','fecha_inicio','fecha_fin'],
            autoLoad:true
        });
        store.on('exception',function( store, records, options){
            //console.log(options);
            //alert('error');
            });

        var grid = new Ext.grid.GridPanel({
            title:'Funcionarios',
            border:false,
            store:store,
            loadMask:true,
            columns:[new Ext.grid.RowNumberer({
                width:27
            }),{
                header: "UID",                
                sortable: true,
                dataIndex: 'id_usuario'
            },{
                header: "Nombre",                
                sortable: true,
                dataIndex: 'nombres'
            },{
                header: "Apellidos",                
                sortable: true,
                dataIndex: 'apellidos'
            },{
                header: "Cargo",                
                sortable: true,
                dataIndex: 'cargo'
            },{
                header: "Fec. inicio",                
                sortable: true,
                dataIndex: 'fecha_inicio'
            },{
                header: "Fec. fin",                
                sortable: true,
                dataIndex: 'fecha_fin'
            },{
                header: "Descripcion",                
                sortable: true,
                dataIndex: 'descripcion'
            },{
                header: "Activo",                
                sortable: true,
                dataIndex: 'activo'
            }],
            tbar:[{                
                iconCls:'refresh',
                handler:function() {                
                    grid.store.reload();
                }
            },'-',{
                iconCls: 'create',
                tooltip: 'Nuevo',
                handler: function() {                                        
                    domain.UserManager.wizard(options);
                }
            },{
                iconCls: 'update',
                tooltip: 'Modificar',
                handler: function() {
                    var record = grid.getSelectionModel().getSelected();
                    if(record) {                        
                        options.record = record;                             
                        domain.UserManager.update(options);
                    } else {
                        domain.errors.mustSelect();
                    }
                }
            },{
                text:'Eliminar',
                iconCls: 'delete',
                tooltip: 'Eliminar',
                handler: function() {
                    var record = grid.getSelectionModel().getSelected();
                    if(record) {
                        options.record = record;                                        
                        domain.UserManager.deleteUser(options);
                    } else {
                        domain.errors.mustSelect();
                    }
                }
            },'-',{
                iconCls: 'key',
                tooltip: 'Asignar o cambiar la clave',
                handler: function(){
                    var record = grid.getSelectionModel().getSelected();
                    if(record) {
                        options.record = record
                        domain.UserManager.changePassword(options);
                    } else {
                        domain.errors.mustSelect();
                    }                    
                }
            }] 
        });      
        options.grid = grid;
        return grid;
    },
    roles:function() {
        var grid = this.grid(null);
        grid.getSelectionModel().on('rowselect', function(sm, rowindex, record) {            
            form.getForm().load({
                url:'user/ldap/userroles',
                method:'GET',
                params:{
                    username:record.get('userName')
                }
            });
        });
        
        var form = new Ext.form.FormPanel({                        
            url: 'user/ldap/updateroles',   
            title:'ROLE selector',
            border:true,
            bodyStyle:'padding:10px',
            labelWidth:100,
            layout: 'column', 
            region:'south',
            //width:800,
            frame:true,
            items:[grid,
            {
                columnWidth: 0.4,
                xtype: 'fieldset',
                margin:3,
                style: {
                    "margin-left": "10px", // when you add custom margin in IE 6...
                    "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
                },
                labelWidth: 90,
                title:'System access',
                defaultType: 'textfield',              
                border: true,    
                bodyStyle:'padding:10px',
                items: [{
                    xtype: 'checkboxgroup',
                    fieldLabel: 'Roles',
                    columns:1,
                    items: [{
                        boxLabel: 'Inspector', 
                        name: 'Inspector' 
                    },{
                        boxLabel: 'Supervisor', 
                        name: 'Supervisor'
                    },{
                        boxLabel: 'Admin', 
                        name: 'Admin'
                    }]
                },{
                    xtype:'hidden',
                    name:'userName'
                }] 
            }],
            buttons:[{
                text:'Guardar',
                handler: function() {
                    guardar();
                }
            }]
        });
        
        var guardar = function() {
            form.getForm().submit({
                
                });
        }
        return form;
    } 
};

domain.UserManager.View = {

    init:function() { 
        var usuarios  = domain.UserManager.usersGrid({});       
        new Ext.Viewport({			
            layout:'fit',
            frame:true,
            border:false,
            items:new Ext.Panel({
                frame:true,
                border:false,
                layout:'fit',
                items:usuarios                            
            })			
        });
    }
}

Ext.onReady(domain.UserManager.View.init,domain.UserManager.View);