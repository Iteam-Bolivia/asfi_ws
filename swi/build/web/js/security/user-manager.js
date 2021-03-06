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

domain.UserManager = {
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
    usersGrid: function(options) {
        var store = new Ext.data.JsonStore({
            url: Ext.SROOT + 'listarusuarios',
            root: 'data',
            fields: ['id', 'cargo', 'nombres', 'paterno', 'materno',
                'activo', 'descripcion', 'usuario', 'email',
                {name: 'caducaEn', type: 'long'}, 'rol'],
            autoLoad: true
        });

        var searchListFilters = new Ext.ux.grid.GridFilters({
            encode: false,
            local: true,
            menuFilterText: 'Filtrar',
            filters: [
                {type: 'string', dataIndex: 'nombres'},
                {type: 'string', dataIndex: 'paterno'},
                {type: 'string', dataIndex: 'materno'},
                {type: 'list', dataIndex: 'rol', options: ['Usuario', 'Administrador']},
                {type: 'boolean', dataIndex: 'activo', yesText: 'Activo', noText: 'Desactivado'}
            ]});

        var grid = new Ext.grid.GridPanel({
            title: 'Usuarios',
            border: false,
            store: store,
            plugins: [searchListFilters],
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
                    header: "UID",
                    sortable: true,
                    dataIndex: 'usuario'
                }, {
                    header: "Nombre",
                    sortable: true,
                    dataIndex: 'nombres'
                }, {
                    header: "Paterno",
                    sortable: true,
                    dataIndex: 'paterno'
                }, {
                    header: "Materno",
                    sortable: true,
                    dataIndex: 'materno'
                }, {
                    header: "Correo",
                    sortable: true,
                    dataIndex: 'email'
                }, {
                    header: "Cargo",
                    sortable: true,
                    dataIndex: 'cargo'
                }, {
                    header: "Descripcion",
                    sortable: true,
                    dataIndex: 'descripcion'
                }, {
                    header: "Rol",
                    sortable: true,
                    dataIndex: 'rol',
                    filterable: true
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
                }, {
                    header: "Caduca en",
                    sortable: true,
                    dataIndex: 'caducaEn',
                    renderer: function(val) {
                        var date = new Date(val);
                        return date.format('d/m/Y');
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
                        domain.UserManager.newUser(options);
                    }
                }, '-', {
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
                }, {
                    //text: 'Eliminar',
                    iconCls: 'delete',
                    tooltip: 'Activar/Desactivar cuenta',
                    handler: function() {
                        var record = grid.getSelectionModel().getSelected();
                        if (record) {
                            var box = Ext.MessageBox.wait('Por favor espere...');
                            Ext.Ajax.request({
                                url: Ext.SROOT + 'disableaccount',
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
                }, {
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
                }, '-',
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
    datosPersonales: function() {
        return {
            xtype: 'fieldset',
            title: 'Datos personales',
            defaults: {
                msgTarget: 'side',
                width: 200
            },
            items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Nombres',
                    allowBlank: false,
                    name: 'nombres'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Apellido paterno',
                    allowBlank: false,
                    name: 'paterno'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Apellido materno',
                    allowBlank: false,
                    name: 'materno'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Cargo',
                    allowBlank: false,
                    name: 'cargo'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Correo electr&oacute;nico',
                    allowBlank: false,
                    vtype: 'email',
                    name: 'email'
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Descripcion',
                    allowBlank: true,
                    name: 'descripcion'
                }]
        };
    },
    newUser: function(options) {
        var form = new Ext.FormPanel({
            url: Ext.SROOT + 'crearusuario',
            border: false,
            autoHeight: true,
            bodyStyle: 'padding:10px',
            labelWidth: 130,
            items: [this.datosPersonales(), {
                    xtype: 'fieldset',
                    title: 'Datos de acceso',
                    defaults: {
                        msgTarget: 'side',
                        width: 200
                    },
                    items: [{
                            xtype: 'combo',
                            fieldLabel: 'Rol',
                            hiddenName: 'rol',
                            forceSelection: true,
                            store: new Ext.data.ArrayStore({
                                fields: ['type', 'objeto'],
                                data: [['usuario_uif', 'Usuario'], ['admin_uif', 'Administrador']]
                            }),
                            valueField: 'type',
                            displayField: 'objeto',
                            typeAhead: true,
                            mode: 'local',
                            triggerAction: 'all',
                            emptyText: 'Selecione el Rol...',
                            selectOnFocus: true
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Usuario',
                            allowBlank: false,
                            name: 'usuario',
                            regex: /^[a-z,_,0-9]{0,}$/
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Clave (Password)',
                            allowBlank: false,
                            name: 'clave',
                            inputType: 'password',
                            id: '_um_passfield'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Confirmar Clave',
                            allowBlank: false,
                            inputType: 'password',
                            vtype: 'password',
                            initialPassField: '_um_passfield'
                        }, {
                            xtype: 'checkbox',
                            fieldLabel: 'Activo',
                            name: 'activo',
                            checked: true
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Caducar en',
                            name: 'caducaEn'
                        }]
                }]
        });

        var win = new Ext.Window({
            title: 'Registrar Usuario',
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

domain.UserManager.View = {
    init: function() {
        var usuarios = domain.UserManager.usersGrid({});
        new Ext.Viewport({
            layout: 'fit',
            frame: true,
            border: false,
            items: new Ext.Panel({
                frame: true,
                border: false,
                layout: 'fit',
                items: usuarios
            })
        });
    }
}

Ext.onReady(domain.UserManager.View.init, domain.UserManager.View);