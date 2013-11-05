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
            url: Ext.SROOT + 'listarpersonas',
            root: 'data',
            fields: ['id', 'cargo', 'nombres', 'apellidos',
                'activo', 'descripcion'],
            autoLoad: true
        });

        var grid = new Ext.grid.GridPanel({
            title: 'Usuarios',
            border: false,
            store: store,
            loadMask: true,
            columns: [new Ext.grid.RowNumberer({
                    width: 27
                }), {
                    header: "UID",
                    sortable: true,
                    dataIndex: 'id'
                }, {
                    header: "Nombre",
                    sortable: true,
                    dataIndex: 'nombres'
                }, {
                    header: "Apellidos",
                    sortable: true,
                    dataIndex: 'apellidos'
                }, {
                    header: "Cargo",
                    sortable: true,
                    dataIndex: 'cargo'
                }, {
                    header: "Descripcion",
                    sortable: true,
                    dataIndex: 'descripcion'
                }, {
                    header: "Activo",
                    sortable: true,
                    dataIndex: 'activo'
                }],
            tbar: [{
                    iconCls: 'refresh',
                    handler: function() {
                        grid.store.reload();
                    }
                }, '-', {
                    text: 'Nuevo',
                    iconCls: 'create',
                    tooltip: 'Nuevo',
                    handler: function() {
                        domain.UserManager.newUser(options);
                    }
                }, {
                    text: 'Modificar',
                    iconCls: 'update',
                    tooltip: 'Modificar',
                    handler: function() {

                    }
                }, {
                    text: 'Eliminar',
                    iconCls: 'delete',
                    tooltip: 'Eliminar',
                    handler: function() {

                    }
                }, '-', {
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
                }]
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
    newUser: function(options) {
        var form = new Ext.FormPanel({
            url: Ext.SROOT + 'guardarpersona',
            border: false,
            autoHeight: true,
            bodyStyle: 'padding:10px',
            labelWidth: 130,
            items: [{
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
                }, {
                    xtype: 'fieldset',
                    title: 'Datos de acceso',
                    defaults: {
                        msgTarget: 'side',
                        width: 200
                    },
                    items: [{
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
                            xtype:'datefield',
                            fieldLabel:'Caducar en',
                            name:'caduca'
                        }]
                }]
        });

        var win = new Ext.Window({
            title: 'Registrar Usuario',
            autoScroll: true,
            width: 600,
            activeItem: 0,
            layout: 'card',
            items: form,
            modal: true,
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