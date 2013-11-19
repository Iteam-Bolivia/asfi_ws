/**
 * Sitmax ExtJS UI
 * Copyright(c) 2011-2012 ICG Inc.
 * @author Johns Castillo Valencia
 */
Ext.ns('domain.UserManager');

domain.errors = {
    mustSelect: function() {
        Ext.MessageBox.show({
            title: 'Aviso',
            msg: 'Debe seleccionar un <b>Registro</b>.',
            buttons: Ext.MessageBox.OK,
            icon: Ext.Msg.INFO
        });
    },
    mustBeNatural: function() {
        Ext.MessageBox.show({
            title: 'Aviso',
            msg: 'Debe seleccionar una persona <b>Natural</b>.',
            buttons: Ext.MessageBox.OK,
            icon: Ext.Msg.INFO
        });
    },
    submitFailure: function(title, msg) {
        Ext.MessageBox.show({
            title: title,
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.Msg.ERROR
        });
    }
};

domain.formButtons = function(options) {
    return [{
            text: 'Guardar',
            iconCls: 'entity-save',
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
                        domain.errors.submitFailure('Error interno', action.result.errorMessage);
                    }
                });
            }
        }, {
            text: 'Deshacer',
            iconCls: 'entity-undo',
            handler: function() {
                options.form.getForm().reset();
            }
        }, '->', {
            text: 'Cerrar',
            handler: function() {
                options.win.close();
            }
        }];
};

domain.ServiceManager = {
    wizard: function(options) {

    },
    update: function(options) {

    },
    changePassword: function(options) {
        var form = new Ext.FormPanel({
            url: Ext.SROOT + 'changepassword',
            border: false,
            autoHeight: true,
            bodyStyle: 'padding:10px',
            labelWidth: 130,
            items: [{
                    xtype: 'fieldset',
                    defaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                            xtype: 'displayfield',
                            fieldLabel: '<b>ID Usuario</b>',
                            name: 'usuario'
                        }, {
                            xtype: 'textfield',
                            password: true,
                            fieldLabel: 'Clave',
                            width: 200,
                            allowBlank: false,
                            name: 'clave',
                            inputType: 'password',
                            id: '_um_passfield'
                        }, {
                            xtype: 'textfield',
                            password: true,
                            fieldLabel: 'Confirmar Clave',
                            width: 200,
                            allowBlank: false,
                            inputType: 'password',
                            vtype: 'password',
                            initialPassField: '_um_passfield'
                        }, {
                            "xtype": "hidden",
                            "name": "id"
                        }]
                }]
        });

        var win = new Ext.Window({
            title: 'Asignar o cambiar clave',
            autoScroll: true,
            autoHeight: true,
            width: 600,
            activeItem: 0,
            layout: 'card',
            items: form,
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                    text: 'Guardar',
                    handler: function() {
                        form.getForm().submit({
                            success: function(form, action) {
                                win.close();
                            },
                            failure: function(form, action) {
                                if (action.failureType === 'server') {
                                    var r = Ext.util.JSON.decode(action.response.responseText);
                                    com.icg.errors.submitFailure('Error', r.errorMessage);
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

        Ext.MessageBox.confirm('Confirmar', '¿Confirma eliminar el registro? Se perderan Datos.', function(r) {
            if (r == 'yes') {
                var id = options.record.data.funcionario_id;
                //var box = Ext.MessageBox.wait('Por favor espere.', 'Eliminando el <b>registro</b>'); 
                Ext.Ajax.request({
                    url: Ext.SROOT + 'entity/delete/funcionario',
                    method: 'POST',
                    params: {
                        entity_id: id
                    },
                    success: function(result, request) {
                        options.grid.store.reload();
                        //box.hide();
                    },
                    failure: function(result, request) {
                        if (result.status == '403') {
                            domain.swi.security.msg.e403();
                        }
                    }
                });
            }
        });


    },
    serviceGrid: function(options) {
        var store = new Ext.data.JsonStore({
            url: Ext.SROOT + 'servicios',
            //root: 'data',
            fields: ['id', 'nombre', 'servidor', 'puerto', 'protocolo',
                'activo', 'descripcion', 'username'],
            autoLoad: true
        });

//        var searchListFilters = new Ext.ux.grid.GridFilters({
//            encode: false,
//            local: true,
//            menuFilterText: 'Filtrar',
//            filters: [
//                {type: 'string', dataIndex: 'nombres'},
//                {type: 'string', dataIndex: 'paterno'},
//                {type: 'string', dataIndex: 'materno'},
//                {type: 'list', dataIndex: 'rol', options: ['Usuario', 'Administrador']},
//                {type: 'boolean', dataIndex: 'activo', yesText: 'Activo', noText: 'Desactivado'}
//            ]});

        var grid = new Ext.grid.GridPanel({
            title: 'Servicios',
            border: false,
            store: store,
//            plugins: [searchListFilters],
//            plugins: [new Ext.ux.grid.Search({
//                    iconCls: 'icon-zoom'
//                            , readonlyIndexes: ['id']
//                            , disableIndexes: ['uid', 'clave']
//                            , minChars: 3
//                            , autoFocus: true,
//                    width: 100
//				,menuStyle:'radio'
//                }), new Ext.ux.grid.RowActions({
//                    actions: [{
//                            iconCls: 'icon-minus'
//                                    , qtip: 'Delete Record'
//                                    , style: 'margin:0 0 0 3px'
//                        }]
//                })],
            loadMask: true,
            columns: [new Ext.grid.RowNumberer({
                    width: 27
                }), {
                    header: "Nombre",
                    sortable: true,
                    dataIndex: 'nombre'
                }, {
                    header: "Servidor",
                    sortable: true,
                    dataIndex: 'servidor'
                }, {
                    header: "Puerto",
                    sortable: true,
                    dataIndex: 'puerto'
                }, {
                    header: "Usuario",
                    sortable: true,
                    dataIndex: 'username'
                }, {
                    header: "Activo",
                    sortable: true,
                    dataIndex: 'activo',
                    renderer: function(val) {
                        if (val) {
                            return '<img src="' + Ext.IMAGES_SILK + 'accept.png">';
                        } else {
                            return '<img src="' + Ext.IMAGES_SILK + 'cancel.png">';
                        }
                    }
                }],
            tbar: [{
                    iconCls: 'refresh',
                    handler: function() {
                        grid.store.reload();
                    }
                }, '-', {
                    text: 'Nuevo usuario',
                    iconCls: 'create',
                    tooltip: 'Nuevo',
                    handler: function() {
                        domain.ServiceManager.newService(options);
                    }
                }/*, '-', {
                    //text: 'Modificar',
                    iconCls: 'update',
                    tooltip: 'Modificar datos personales',
                    handler: function() {
                        var record = grid.getSelectionModel().getSelected();
                        if (record) {
                            options.record = record;
                            domain.UserManager.updateUser(options);
                        } else {
                            com.icg.errors.mustSelect();
                        }
                    }
                }*/, {
                    text: 'Activar/Desactivar',
                    iconCls: 'delete',
                    tooltip: 'Activar/Desactivar',
                    handler: function() {
                        var record = grid.getSelectionModel().getSelected();
                        if (record) {
                            var box = Ext.MessageBox.wait('Por favor espere...');
                            Ext.Ajax.request({
                                url: Ext.SROOT + 'disableservice',
                                method: 'POST',
                                params: {
                                    id: record.data.id
                                },
                                success: function(result, request) {
                                    grid.getStore().reload();
                                    box.hide();
                                },
                                failure: function(result, request) {
                                    Ext.Msg.alert('Error', 'Fallo.');
                                    box.hide();
                                }
                            });
                        } else {
                            domain.errors.mustSelect();
                        }
                    }
                }/*, {
                    iconCls: 'key',
                    tooltip: 'Asignar o cambiar la clave',
                    handler: function() {
                        var record = grid.getSelectionModel().getSelected();
                        if (record) {
                            options.record = record;
                            domain.UserManager.changePassword(options);
                        } else {
                            domain.errors.mustSelect();
                        }
                    }
                }, '-',*/
            ]//,
//            bbar: new Ext.PagingToolbar({
//                store: this.store
//                        , displayInfo: true
//                        , pageSize: 3
//            })
//            bbar: new Ext.PagingToolbar({
//                store: store,
//                pageSize: 50,
//                plugins: [searchListFilters]
//            })
        });
        options.grid = grid;
        return grid;
    },
    roles: function() {
        var grid = this.grid(null);
        grid.getSelectionModel().on('rowselect', function(sm, rowindex, record) {
            form.getForm().load({
                url: 'user/ldap/userroles',
                method: 'GET',
                params: {
                    username: record.get('userName')
                }
            });
        });

        var form = new Ext.form.FormPanel({
            url: 'user/ldap/updateroles',
            title: 'ROLE selector',
            border: true,
            bodyStyle: 'padding:10px',
            labelWidth: 100,
            layout: 'column',
            region: 'south',
            //width:800,
            frame: true,
            items: [grid,
                {
                    columnWidth: 0.4,
                    xtype: 'fieldset',
                    margin: 3,
                    style: {
                        "margin-left": "10px", // when you add custom margin in IE 6...
                        "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0"  // you have to adjust for it somewhere else
                    },
                    labelWidth: 90,
                    title: 'System access',
                    defaultType: 'textfield',
                    border: true,
                    bodyStyle: 'padding:10px',
                    items: [{
                            xtype: 'checkboxgroup',
                            fieldLabel: 'Roles',
                            columns: 1,
                            items: [{
                                    boxLabel: 'Inspector',
                                    name: 'Inspector'
                                }, {
                                    boxLabel: 'Supervisor',
                                    name: 'Supervisor'
                                }, {
                                    boxLabel: 'Admin',
                                    name: 'Admin'
                                }]
                        }, {
                            xtype: 'hidden',
                            name: 'userName'
                        }]
                }],
            buttons: [{
                    text: 'Guardar',
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
    },
    datosServicio: function() {
        return {
            xtype: 'fieldset',
            title: 'Datos de conexion',
            defaults: {
                msgTarget: 'side',
                width: 200
            },
            items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    allowBlank: false,
                    name: 'nombre'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Servidor',
                    allowBlank: false,
                    name: 'servidor'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Puerto',
                    allowBlank: false,
                    name: 'puerto'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Usuario',
                    allowBlank: false,
                    name: 'username'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Password',
                    allowBlank: false,                    
                    name: 'password'
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Descripcion',
                    allowBlank: true,
                    name: 'descripcion'
                }]
        };
    },
    newService: function(options) {
        var form = new Ext.FormPanel({
            url: Ext.SROOT + 'crearservicio',
            border: false,
            autoHeight: true,
            bodyStyle: 'padding:10px',
            labelWidth: 130,
            items: [this.datosServicio()]
        });

        var win = new Ext.Window({
            title: 'Registrar Servicio',
            autoScroll: true,
            width: 600,
            height: 300,
            minHeight: 250,
            minWidth: 550,
            items: form,
            maximizable: true,
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                    text: 'Guardar',
                    handler: function() {
                        form.getForm().submit({
                            success: function(form, action) {
                                options.grid.store.reload();
                                win.close();
                            },
                            failure: function(form, action) {

                            }
                        });
                    }
                }]
        });
        win.show();
    },
    updateUser: function(options) {
        var form = new Ext.FormPanel({
            url: Ext.SROOT + 'guardarusuario',
            border: false,
            autoHeight: true,
            bodyStyle: 'padding:10px',
            labelWidth: 130,
            items: [this.datosPersonales(),
                {
                    xtype: 'hidden',
                    name: 'id'
                }
            ]
        });

        var win = new Ext.Window({
            title: 'Modificar datos de Usuario',
            autoScroll: true,
            width: 600,
            height: 300,
            minHeight: 250,
            minWidth: 550,
            items: form,
            maximizable: true,
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                    text: 'Guardar',
                    handler: function() {
                        form.getForm().submit({
                            success: function(form, action) {
                                options.grid.store.reload();
                                win.close();
                            },
                            failure: function(form, action) {

                            }
                        });
                    }
                }]
        });
        win.show();
        if (options.record) {
            form.getForm().loadRecord(options.record);
        }
    }
};


domain.SamplePanel = Ext.extend(Ext.DataView, {
    autoHeight: true,
    frame: true,
    cls: 'demos',
    itemSelector: 'dd',
    overClass: 'over',
    tpl: new Ext.XTemplate(
            '<div id="sample-ct">',
            '<tpl for=".">',
            '<div><a name="{id}"></a><h2><div>{title}</div></h2>',
            '<dl>',
            '<tpl for="samples">',
            '<dd ext:url="{url}"><img src="shared/screens/{icon}"/>',
            '<div><h4>{text}',
            '<tpl if="this.isNew(values.status)">',
            '<span class="new-sample"> (New)</span>',
            '</tpl>',
            '<tpl if="this.isUpdated(values.status)">',
            '<span class="updated-sample"> (Updated)</span>',
            '</tpl>',
            '<tpl if="this.isExperimental(values.status)">',
            '<span class="new-sample"> (Experimental)</span>',
            '</tpl>',
            '</h4><p>{desc}</p></div>',
            '</dd>',
            '</tpl>',
            '<div style="clear:left"></div></dl></div>',
            '</tpl>',
            '</div>', {
        isExperimental: function(status) {
            return status == 'experimental';
        },
        isNew: function(status) {
            return status == 'new';
        },
        isUpdated: function(status) {
            return status == 'updated';
        }
    }),
    onClick: function(e) {
        var group = e.getTarget('h2', 3, true);
        if (group) {
            group.up('div').toggleClass('collapsed');
        } else {
            var t = e.getTarget('dd', 5, true);
            if (t && !e.getTarget('a', 2)) {
                var url = t.getAttributeNS('ext', 'url');
                window.open(url);
            }
        }
        return SamplePanel.superclass.onClick.apply(this, arguments);
    }
});

Ext.reg('samplespanel', domain.SamplePanel);




domain.UserManager.View = {
    init: function() {
        var catalog = [{
                title: 'Offline Support',
                samples: [{
                        text: 'Simple Tasks',
                        url: 'tasks/tasks.html',
                        icon: 'tasks.gif',
                        desc: 'Personal task management application example that uses <a href="http://gears.google.com" target="_blank">Google Gears</a> for data storage.'
                    }, {
                        text: 'Simple Tasks',
                        url: 'http://extjs.com/blog/2008/02/24/tasks2/',
                        icon: 'air.gif',
                        desc: 'Complete personal task management application example that runs on <a href="http://labs.adobe.com/technologies/air/" target="_blank">Adobe AIR</a>.'
                    }, {
                        text: 'Simple Tasks',
                        url: 'http://extjs.com/blog/2008/02/24/tasks2/',
                        icon: 'air.gif',
                        desc: 'Complete personal task management application example that runs on <a href="http://labs.adobe.com/technologies/air/" target="_blank">Adobe AIR</a>.'
                    }, {
                        text: 'Simple Tasks',
                        url: 'http://extjs.com/blog/2008/02/24/tasks2/',
                        icon: 'air.gif',
                        desc: 'Complete personal task management application example that runs on <a href="http://labs.adobe.com/technologies/air/" target="_blank">Adobe AIR</a>.'
                    }]
            }];
        var store = new Ext.data.JsonStore({
            idProperty: 'id',
            fields: ['id', 'title', 'samples'],
            data: catalog
        });

        //var servicios = new domain.SamplePanel({
        //    store: store
        //});
        
        var servicios = domain.ServiceManager.serviceGrid({});
        new Ext.Viewport({
            layout: 'fit',
            frame: true,
            border: false,
            items: new Ext.Panel({
                frame: true,
                border: false,
                layout: 'fit',
                items: servicios
            })
        });
    }
}

Ext.onReady(domain.UserManager.View.init, domain.UserManager.View);