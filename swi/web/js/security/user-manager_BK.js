/**
 * Sitmax ExtJS UI
 * Copyright(c) 2011-2012 ICG Inc.
 * @author Johns Castillo Valencia
 */
Ext.ns('com.icg.UserManager');

com.icg.UserManager.personas = {
    grid: function(gridForm) {
        var store = new Ext.data.JsonStore({
            url:'command/select/list/public/persona',
            idProperty:'persona_id',
            root:'data',
            fields:['persona_id','primer_nombre','segundo_nombre','primer_apellido','segundo_apellido','etc'],
            autoLoad:true
        });
        var grid = new Ext.grid.GridPanel({
            title:'Personas',
            store:store,
            width:500,
            height:200,
            columns:[{
                header:'Primer nombre',
                dataIndex:'primer_nombre',
                sortable:true
            },{
                header:'Segundo nombre',
                dataIndex:'segundo_nombre',
                sortable:true
            },{
                header:'Primer apellido',
                dataIndex:'primer_apellido',
                sortable:true
            },{
                header:'Segundo apellido',
                dataIndex:'segundo_apellido',
                sortable:true
            }],
            tbar:[
            {
                text:'Crear pass',
                handler: function() {
                    var record=grid.getSelectionModel().getSelected();
                    //alert(".. "+record.get("persona_id"));
                    var f=com.icg.sitmax.users.usuarios.form();
                    var wina = new Ext.Window({
                        title:'Creacion de Pass',
                        width:500,
                        height:200,
                        modal:true
                    });
                    wina.add(f);
                    wina.show();
                }
            }
            ]//
        });
        return grid;
    },
    grid2: function(options) {
        //var options = new Object();
        options.id = 'persona';
        options.name = 'Persona';
        var ostore = com.icg.sitmax.struct.public.persona.entityJsonStore();
        ostore.autoLoad = true;
        var ocolumns = com.icg.sitmax.struct.public.persona.gridColumns();
        ocolumns.splice(0,0,new Ext.grid.RowNumberer({
            width:25
        }));

        var ntbar = function(grid) {
            var tbar = com.icg.entity.buttons(options, true, true);
            var nu = {
                text:'Crear cuenta',
                iconCls:'cvxcv',
                handler:function() {
                    com.icg.sitmax.users.funcionarios.naccount({
                        grid:grid
                    })
                }
            }
            tbar.push(nu);
            return tbar;
        }

        var store = new Ext.data.JsonStore(ostore);
        var grid = new Ext.grid.GridPanel({
            title:options.name,
            //width:800,
            height:160,
            region:'north',
            store:store,
            loadMask:true,
            collapsible:true,
            columns:ocolumns,
            tbar:[com.icg.entity.buttons(options, true, true),'-',{
                text:'Crear cuenta',
                iconCls:'dfds',
                handler:function() {
                    com.icg.sitmax.users.funcionarios.naccount({
                        grid:grid,
                        funcs:options.funcs
                    })
                } 
            }]
        });    
        
        options.target = grid;
        return grid;
    }
};

com.icg.UserManager.funcionarios = {
    form: function(options) {
        console.log('abriendo form');

        var form = function(){
            return new Ext.ux.Plugin.RemoteComponent({
                url : 'load/extjs/persona'
            }); 
        };
        var config = null;
        
        Ext.Ajax.request({
            url      : 'load/extjs/persona',
            async    : false,
            callback : function(opts, success, response) {
                var json = response.responseJSON;
                // or var json = Ext.decode(response.responseText, true);
                config = json; //or Ext.apply(config, json);
            }
        });
        
        console.log(config);
    },
    grid: function() {
        var options = new Object();
        options.id = 'funcionario';
        options.name = 'Funcionario';
        Ext.Ajax.request({
            url:'load/extjs/grid/funcionario',
            method: 'GET',                    
            success: function(result, request) {                        
                var sgrid = Ext.util.JSON.decode(result.responseText);  
                var store = new Ext.data.JsonStore(sgrid.store);
                sgrid.store = store;
                sgrid.width = 800;
                sgrid.height = 200;
                
                var tbar = [{
                    iconCls: 'silk-add',
                    text:'Nuevo',
                    handler:function(){        
                        options.entity_id = undefined;
                        options.record = undefined;
                        com.icg.entity.viewform(options);
                    }
                },'-',{
                    iconCls: 'editar',
                    text:'Modificar',
                    handler:function(){
                        var record = griden.getSelectionModel().getSelected(); 
                        if(!record) {
                            Ext.MessageBox.show({
                                title:'Aviso',
                                msg:'Debe seleccionar un <b>Registro</b>.',
                                buttons: Ext.MessageBox.OK,
                                icon:Ext.Msg.INFO
                            });
                        } else { 
                            //options.record = record;
                            options.entity_id = record.get('funcionario_id');
                            com.icg.entity.viewform(options);                            
                        }     
                    }
                },'-',{
                    iconCls: 'silk-delete',
                    text:'Eliminar',
                    handler:function() {
                        var record = griden.getSelectionModel().getSelected(); 
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
                                    var id = record.get(griden.store.idProperty);
                                    var box = Ext.MessageBox.wait('Por favor espere.', 'Eliminando el <b>registro</b>'); 
                                    Ext.Ajax.request({                    
                                        url:'entity/delete/'+options.id,
                                        method: 'POST',
                                        params: {
                                            entity_id:id
                                        },                    
                                        success: function(result, request) {
                                            griden.getStore().reload();
                                            box.hide();
                                        },
                                        failure: function(result, request) {
                                            Ext.Msg.alert('Error','Fallo.');
                                            box.hide();
                                        }
                                    });
                                }
                            });
                        }                                                                               
                    }
                }];
                sgrid.tbar = tbar;
                var griden = new Ext.grid.GridPanel(sgrid);
                
                options.target = griden;
                
                griden.render('funcionarios')                    
            },
            failure: function(result, request) {                        
                Ext.Msg.alert('Error','Error en la solicitud');
            }
        });
    },
    grid2: function() {
        var options = new Object();
        options.id = 'funcionario';
        options.name = 'Funcionario';
        var ostore = com.icg.sitmax.struct.public.funcionario.entityJsonStore();
        ostore.autoLoad = true;
        var ocolumns = com.icg.sitmax.struct.public.funcionario.gridColumns();
        ocolumns.splice(0,0,new Ext.grid.RowNumberer({
            width:25
        }));
        var tbar = com.icg.entity.buttons(options, false, true);
        var store = new Ext.data.JsonStore(ostore);
        var grid = new Ext.grid.GridPanel({
            title:options.name,
            //width:800,
            collapsible:true,
            height:160,
            region:'center',
            store:store,
            loadMask:true,
            columns:ocolumns,
            tbar:tbar
        });    
        options.target = grid;
        return grid;
    },
    naccount: function(options) {
        var record = options.grid.getSelectionModel().getSelected();
        var htmlTpl = new Ext.Template('Primer nombre:<b>{pn}</b>&nbsp;Segundo nombre:<b>{sn}</b><br>',
            'Primer apellido:<b>{pa}</b>&nbsp;Segundo apellido:<b>{sa}</b><br>');
        htmlTpl.compile();
        var form = com.icg.sitmax.struct.scpublic.funcionario.entityForm();
        form.url = 'user/ldap/persist',
        form.items.splice(0,0,{
            xtype:'panel',
            border:false,
            heigth: 40,
            bodyStyle: 'padding-bottom:15px;background:#eee;',
            margins:5,
            html:htmlTpl.apply({
                pn:record.get('primer_nombre'),
                sn:record.get('segundo_nombre'),
                pa:record.get('primer_apellido'),
                sa:record.get('segundo_apellido')
            })
        });     
        form.items.push({
            fieldLabel:'Clave/Password',
            xtype:'textfield',
            inputType:'password',
            width:200,
            name:'password'            
        });
        console.log(form);
        //        form.items.push({
        //            xtype:'hidden',
        //            name:'persona_id',
        //            value:record.get('persona_id')
        //        });
        
        var extform = new Ext.form.FormPanel(form);
        extform.getForm().findField('persona_id').setValue(record.get('persona_id'));
        var win = new Ext.Window({                                
            layout:'fit',  
            title:'Nueva Cuenta',
            width:500,      
            modal:true,
            autoHeight:true,
            autoScroll:true,
            bodyStyle:'padding-rigth: 15px',                          
            items:extform,
            buttons:[{
                text:'Crear',
                handler:function(){
                    extform.getForm().submit({
                        success:function(form, action) {                            
                            options.funcs.store.reload();
                            //options.g..get(0).store.reload();
                            win.close();
                        },
                        failure:function(form, action) {
                                
                        }    
                    });
                }
            },{
                text:'Cancelar',
                handler:function(){
                    win.close();
                }
            }]
        });                
        win.show();
    }
};

com.icg.UserManager.usuarios = {
    
    wizard: function() {
        var cardNav = function(incr){
//            var l = Ext.getCmp('card-wizard-panel').getLayout();
//            var i = l.activeItem.id.split('card-')[1];
//            var next = parseInt(i, 10) + incr;
//            l.setActiveItem(next);
//            Ext.getCmp('card-prev').setDisabled(next==0);
//            Ext.getCmp('card-next').setDisabled(next==2);
            console.log(incr);
        };
        var win = new Ext.Window({
            title:'Crear cuenta',
            iconCls:'form',
            width:500,
            height:400,
            modal:true,
            resizable:true,
            maximizable:true,
            layout:'card',
            activeItem: 0,
            bodyStyle: 'padding:15px',
            defaults: {
                border:false
            },
            bbar: ['->', {
                id: 'card-prev',
                text: '&laquo; Previous',
                scope:this,
                //handler: cardNav.createDelegate(this, [-1]),
                handler: cardNav.createDelegate(win),
                disabled: true                                
            },{
                id: 'card-next',
                text: 'Next &raquo;',                
                //handler: cardNav.createDelegate(this, [1])
                handler: cardNav.createDelegate(win)
            }],
            items: [{
                id: 'card-0',
                html: '<h1>Welcome to the Demo Wizard!</h1><p>Step 1 of 3</p><p>Please click the "Next" button to continue...</p>'
            },{
                id: 'card-1',
                html: '<p>Step 2 of 3</p><p>Almost there.  Please click the "Next" button to continue...</p>'
            },{
                id: 'card-2',
                html: '<h1>Congratulations!</h1><p>Step 3 of 3 - Complete</p>'
            }]
        });
        win.show();
    },
    form: function(options) {
        var form = new Ext.form.FormPanel({                        
            url: 'pruebas/ldap',                                          
            border:true,
            bodyStyle:'padding:10px',
            labelWidth:100,
            items:[{
                xtype:'fieldset',    
                title:'Datos de usuario',    
                items:[{
                    xtype:'textfield',
                    fieldLabel:'UID/Email',
                    width: 200,
                    name: 'email'
                },{
                    xtype:'textfield',
                    fieldLabel:'Password',
                    width: 200,
                    name: 'password',
                    inputType:'password'
                }]
            },{
                xtype: 'hidden',
                title:'Datos de persona',
                items:[{
                    xtype: 'hidden',
                    fieldLabel:'Nombre',
                    width: 200,
                    name: 'fullName'
                },{
                    xtype: 'hidden',
                    fieldLabel:'Apellidos',
                    width: 200,
                    name: 'lastName'
                },{
                    xtype: 'hidden',
                    fieldLabel:'Telefono',
                    width: 200,
                    name: 'phone'
                },{
                    xtype: 'hidden',
                    fieldLabel:'Dscripcion',
                    width: 200,
                    name: 'description'
                }]
            }],                                        
            buttons:[{
                text:'guardar',
                handler: function() {
                    form.getForm().submit({
                        success:function(form,action) {
                            options.window.close();
                            options.grid.store.reload();
                        }
                    });
                }
            },{
                text:'cancel',
                handler: function() {
                    form.getForm().reset();
                    options.window.close();
                }
            }]
        });
        return form;
    },
    grid:function(options) {
        var store = new Ext.data.JsonStore({
            url:Ext.SROOT+'user/ldap/list',
            root:'data',
            fields:['userName','firstName','lastName','email'],
            autoLoad:true
        });
        store.on('exception',function( store, records, options ){
            console.log(options);
            alert('error');
        });

        var grid = new Ext.grid.GridPanel({
            title:'Usuarios',
            region:'center',
            height:300,
            store:store,
            loadMask:true,
            columns:[new Ext.grid.RowNumberer({
                width:25
            }),{
                header: "UID",
                width: 100,
                sortable: true,
                dataIndex: 'userName'
            },{
                header: "Nombre",
                width: 100,
                sortable: true,
                dataIndex: 'firstName'
            },{
                header: "Apellidos",
                width: 100,
                sortable: true,
                dataIndex: 'lastName'
            },{
                header: "Email",
                width: 100,
                sortable: true,
                dataIndex: 'email'
            },{
                header: "Descripcion",
                width: 100,
                sortable: true,
                dataIndex: 'description'
            }],
            tbar:[{                
                iconCls:'refresh',
                handler:function() {                
                    grid.store.reload();
                }
            },'-',{
                iconCls: 'create',
                text: 'Nuevo',
                handler: function(){
                    com.icg.UserManager.usuarios.wizard();
                }
            },{
                iconCls: 'update',
                text: 'Modificar',
                handler: function(){
                    var record = grid.getSelectionModel().getSelected();
                    if(record) {
                        com.icg.createEntity(grid,record);
                    } else {
                        com.icg.errors.mustSelect();
                    }
                }
            },'-',{
                iconCls: 'delete',
                text: 'Eliminar',
                disabled:true,
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
                text: 'Abrir',
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

com.icg.UserManager.View = {

    init: function() { 
        var usuarios  = com.icg.UserManager.usuarios.grid();
       
        //var grid  = com.icg.UserManager.usuarios.roles(null);
        //grid.render('grid');
        
        //var grid2 = com.icg.UserManager.funcionarios.grid2();
        //grid2.render('funcionarios');
        
        //var grid3 = com.icg.UserManager.personas.grid2({funcs:grid2});
        //grid3.render('personas');
        //
        //        var personas = com.icg.sitmax.users.personas.grid(null);
        //        personas.render('personas');
        new Ext.Viewport({
            border:false,
            layour:'border',
            items:[usuarios]
        });
    }
}

Ext.onReady(com.icg.UserManager.View.init,com.icg.UserManager.View);