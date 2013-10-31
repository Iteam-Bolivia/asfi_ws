/**
 * Sitmax ExtJS UI
 * Copyright(c) 2011-2012 ICG Inc.
 * @author Johns Castillo Valencia
 */
Ext.ns('com.icg.UserManager');
var sssttt;
com.icg.errors = {
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

com.icg.formButtons = function(options) {
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
                        com.icg.errors.submitFailure('Error interno', action.result.errorMessage);
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

com.icg.UserManager = {
    wizard: function(options) {
        var form = new Ext.FormPanel({
            url: Ext.SROOT + 'user/ldap/persist',
            border: false,
            autoHeight: true,
            bodyStyle: 'padding:10px',
            labelWidth: 130,
            //waitMsgTarget:true,
            items: [{
                    xtype: 'fieldset',
                    title: 'Datos de la Cuenta',
                    defaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Nombre completo',
                            name: 'displayname'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: '<b>Usuario</b>',
                            width: 200,
                            allowBlank: false,
                            name: 'usuario',
                            regex: /^[a-z,_,0-9]{0,}$/
                        }, {
                            xtype: 'textfield',
                            password: true,
                            fieldLabel: 'Clave',
                            width: 200,
                            allowBlank: false,
                            name: 'passwords',
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
                            "name": "persona_id"
                        }, {
                            xtype:'hidden',
                            name:'tipo',
                            value:'ADMIN'
                        }]
                }, {
                    xtype: 'fieldset',
                    title: 'Otras opciones',
                    defaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                            "xtype": "datefield",
                            "fieldLabel": "Fecha inicio",
                            "width": 200,
                            "name": "desde",
                            "allowBlank": true,
                            editable: false,
                            value: new Date(),
                            "format": "d/m/Y",
                            vtype: 'daterange',
                            id: '_start_date_',
                            endDateField: '_end_date_'
                        }, {
                            "xtype": "datefield",
                            "fieldLabel": "Fecha finalización",
                            "width": 200,
                            "name": "hasta",
                            "allowBlank": true,
                            "format": "d/m/Y",
                            vtype: 'daterange',
                            id: '_end_date_',
                            startDateField: '_start_date_'
                        }, {
                            "xtype": "radiogroup",
                            "fieldLabel": "Estado",
                            columns: [100, 100],
                            "items": [{
                                    "boxLabel": "Activado",
                                    "inputValue": "true",
                                    "name": "active",
                                    "checked": true
                                }, {
                                    "boxLabel": "Desactivado",
                                    "inputValue": "false",
                                    "name": "active"
                                }]
                        }, {
                            xtype: 'textarea',
                            fieldLabel: 'Descripción',
                            width: 200,
                            name: 'descripcion'
                        }]
                }]
        });

        var _persona = null;

        var prevb = new Ext.Button({
            text: '< Antras',
            disabled: true,
            width: 100,
            handler: function() {
                prevb.setDisabled(true);
                nextb.setText('Siguiente >');
                win.getLayout().setActiveItem(0);
            }
        });

        var fnext = function(data) {
            _persona = data;
            if (prevb.disabled) {
                prevb.setDisabled(false);
                nextb.setText('Finalizar');
                win.getLayout().setActiveItem(1);

                var per = data;
                var snombres =
                        (per.primer_nombre === null ? '' : per.primer_nombre) +
                        (per.segundo_nombre === null ? '' : ' ' + per.segundo_nombre);
                var sapellidos =
                        (per.primer_apellido === null ? '' : per.primer_apellido) +
                        (per.segundo_apellido === null ? '' : ' ' + per.segundo_apellido);

                //form.getForm().findField('nombres').setValue(snombres);     
                //form.getForm().findField('apellidos').setValue(sapellidos);
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
                        if (action.failureType === 'server') {
                            var r = Ext.util.JSON.decode(action.response.responseText);
                            com.icg.errors.submitFailure('Error', r.errorMessage);
                        }
                    }
                });
            }
        };

        var nextb = new Ext.Button({
            text: 'Siguiente >',
            width: 100,
            handler: function() {
                var record = formSearch[1].getSelectionModel().getSelected();
                if (record) {
                    if (record.data.tipo_persona === 'Natural') {
                        fnext(record.data);
                    } else {
                        com.icg.errors.mustBeNatural();
                    }
                } else {
                    if (_persona) {
                        //prevb.setDisabled(false);
                        //nextb.setText('Finalizar');
                        //win.getLayout().setActiveItem(1);
                        fnext(_persona);
                    } else {
                        com.icg.errors.mustSelect();
                    }
                }
            }
        });
        var formSearch = com.icg.personas.searchForm();
        var win = new Ext.Window({
            title: 'Buscar persona',
            autoScroll: true,
            height: 460,
            width: 600,
            activeItem: 0,
            layout: 'card',
            items: [{
                    xtype: 'panel',
                    layout: 'anchor',
                    tbar: [{
                            tooltip: 'Nuevo registro de Persona',
                            iconCls: 'create',
                            handler: function() {
                                var options = {};
                                var fp = com.icg.personas.formNatural(options);

                                var win = new Ext.Window({
                                    title: 'Nuevo registro de Persona',
                                    width: 500,
                                    height: 450,
                                    modal: true,
                                    autoScroll: true,
                                    items: fp,
                                    listeners: {
                                        'close': function() {
                                            if (options.formValues) {
                                                fnext(options.formValues);
                                            }
                                        }
                                    }
                                });

                                options.window = win;
                                win.show();
                            }
                        }],
                    items: formSearch
                }, form],
            modal: true,
            bbar: ['->',
                prevb, '-', nextb]
        });
        win.show();
    },
    update: function(options) {
        var form = new Ext.FormPanel({
            url: Ext.SROOT + 'user/ldap/update',
            border: false,
            autoHeight: true,
            bodyStyle: 'padding:10px',
            labelWidth: 130,
            //waitMsgTarget:true,
            items: [{
                    xtype: 'fieldset',
                    title: 'Datos de la Cuenta',
                    defaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                            xtype: 'compositefield',
                            fieldLabel: 'Nombre completo',
                            width: 300,                            
                            items: [{
                                    xtype: 'displayfield',
                                    name: 'primer_nombre'
                                }, {
                                    xtype: 'displayfield',
                                    name: 'primer_apellido'
                                }/*, {
                                    xtype: 'displayfield',
                                    name: 'segundo_nombre'
                                }, {
                                    xtype: 'displayfield',
                                    name: 'primer_apellido'
                                }, {
                                    xtype: 'displayfield',
                                    name: 'segundo_apellido'
                                }*/]
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: '<b>ID Usuario</b>',
                            name: 'usuario'
                        }, {
                            xtype: "hidden",
                            name: "id"
                        }]
                }, {
                    xtype: 'fieldset',
                    title: 'Otras opciones',
                    defaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                            "xtype": "datefield",
                            "fieldLabel": "Fecha inicio",
                            "width": 200,
                            "name": "desde",
                            "allowBlank": true,
                            editable: false,
                            "format": "d/m/Y",
                            vtype: 'daterange',
                            id: '_start_date_',
                            endDateField: '_end_date_'
                        }, {
                            "xtype": "datefield",
                            "fieldLabel": "Fecha finalizacion",
                            "width": 200,
                            "name": "hasta",
                            "allowBlank": true,
                            "format": "d/m/Y",
                            vtype: 'daterange',
                            id: '_end_date_',
                            startDateField: '_start_date_'
                        }, {
                            "xtype": "radiogroup",
                            "fieldLabel": "Estado",
                            columns: [100, 100],
                            "items": [{
                                    "boxLabel": "Activado",
                                    "inputValue": "true",
                                    "name": "active",
                                    "checked": true
                                }, {
                                    "boxLabel": "Desactivado",
                                    "inputValue": "false",
                                    "name": "active"
                                }],
                            "name": "active"    
                        }, {
                            xtype: 'textarea',
                            fieldLabel: 'Descripción',
                            width: 200,
                            name: 'descripcion'
                        }]
                }]
        });

        var prevb = new Ext.Button({
            text: '< Antras',
            disabled: true,
            width: 100
        });
        var nextb = new Ext.Button({
            text: 'Finalizar',
            width: 100,
            handler: function() {
                form.getForm().submit({
                    //waitMsg:'Guardando...',
                    success: function(form, action) {
                        options.grid.store.reload();
                        win.close();
                    },
                    failure: function(form, action) {
                        if (action.failureType == 'server') {
                            var r = Ext.util.JSON.decode(action.response.responseText);
                            com.icg.errors.submitFailure('Error', r.errorMessage);
                        }
                    }
                });
            }
        });

        var win = new Ext.Window({
            title: 'Modificar Cuenta',
            autoScroll: true,
            //height: 460,
            width: 600,
            activeItem: 0,
            layout: 'card',
            items: form,
            modal: true,
            bbar: ['->',
                prevb, '-', nextb]
        });
        win.show();
        console.log(options.record.data);
        form.getForm().loadRecord(options.record);
    },
    changePassword: function(options) {
        var form = new Ext.FormPanel({
            url: Ext.SROOT + 'user/ldap/changepassword',
            border: false,
            autoHeight: true,
            bodyStyle: 'padding:10px',
            labelWidth: 130,
            //waitMsgTarget:true,
            items: [{
                    xtype: 'fieldset',
                    defaults: {
                        msgTarget: 'side'
                    },
                    items: [{
                            xtype: 'compositefield',
                            fieldLabel: 'Nombre completo',
                            width: 300,                            
                            items: [{
                                    xtype: 'displayfield',
                                    name: 'primer_nombre'
                                }, {
                                    xtype: 'displayfield',
                                    name: 'primer_apellido'
                                }]
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: '<b>ID Usuario</b>',
                            name: 'usuario'
                        }, {
                            xtype: 'textfield',
                            password: true,
                            fieldLabel: 'Clave',
                            width: 200,
                            allowBlank: false,
                            name: 'passwords',
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
                    width: 100,
                    handler: function() {
                        form.getForm().submit({
                            //waitMsg:'Guardando...',
                            success: function(form, action) {
                                win.close();
                            },
                            failure: function(form, action) {
                                if (action.failureType == 'server') {
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
                var id = options.record.data.id;
                //var box = Ext.MessageBox.wait('Por favor espere.', 'Eliminando el <b>registro</b>'); 
                Ext.Ajax.request({
                    url: Ext.SROOT + 'user/ldap/delete',
                    method: 'POST',
                    params: {
                        user_id: id
                    },
                    success: function(result, request) {
                        options.grid.store.reload();
                        //box.hide();
                    },
                    failure: function(result, request) {
                        if (result.status == '403') {
                            com.icg.sitmax.security.msg.e403();
                        }
                    }
                });
            }
        });


    },
    usersGrid: function(options) {
        var store = new Ext.data.JsonStore({
            //url: Ext.SROOT + 'command/select/list/directory/cuentas',
            url: Ext.SROOT + 'user/ldap/list/admin',
            root: 'data',            
            fields: ['usuario','responsable','id', 
                'primer_nombre','segundo nombre',
                'primer_apellido','segundo_apellido',
                'active', 'descripcion',
                {name: 'desde', type: 'date', dateFormat: 'Y-m-d'},
                {name: 'hasta', type: 'date', dateFormat: 'Y-m-d'}],
            autoLoad: true
        });
        
        sssttt = store;
        
        var userstatus = function(val, meta, record) {
            
            if(_servertime < record.data.desde.getTime()) {
                val = false;
            } 
            if(record.data.hasta) {
                if(_servertime > record.data.hasta) {
                    val = false;
                }
            }
            if (val) {
                return '<span style="color:GREEN"><b>Activo</b></span>';
            } else {
                return '<span style="color:RED">Inactivo</span>';
            }
        };
        var dateformat = function(val) {            
            var e = Ext.util.Format.dateRenderer('d/m/Y');
            if(val) {
                return e(val);
            } else {
                return '<span style="color:GREEN">indefinido</span>';;
            }            
        };
        var fnombres = function(val, meta, record) {      
                var per = record.data;                 
                var snombres =
                        per.primer_nombre +
                        (per.segundo_nombre === undefined ? '' : ' ' + per.segundo_nombre);
                return snombres;                                
        };
        var fapellidos = function(val, meta, record) {      
                var per = record.data;                 
                var sapellidos =
                        per.primer_apellido +
                        (per.segundo_apellido === null ? '' : ' ' + per.segundo_apellido);                
                return  sapellidos;
        };
        var grid = new Ext.grid.GridPanel({
            region: 'center',
            title: 'Administradores',
            border: false,
            store: store,
            loadMask: true,
            columns: [new Ext.grid.RowNumberer({
                    width: 27
                }), {
                    header: "Usuario",
                    sortable: true,
                    dataIndex: 'usuario',
                    width: 80
                }, {
                    header: "Nombres",
                    sortable: true,     
                    dataIndex: 'primer_nombre',
                    renderer:fnombres,
                    width: 150
                }, {
                    header: "Apellidos",
                    sortable: true,
                    dataIndex: 'primer_apellido',
                    renderer:fapellidos,
                    width: 150
                }, {
                    header: "Desde",
                    sortable: true,
                    dataIndex: 'desde',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    width: 70
                }, {
                    header: "Hasta",
                    sortable: true,
                    dataIndex: 'hasta',
                    renderer: dateformat,
                    width: 70
                }, {
                    header: "Descripcion",
                    sortable: true,
                    dataIndex: 'descripcion'
                }, {
                    header: "Activo",
                    sortable: true,
                    dataIndex: 'active',
                    renderer: userstatus,
                    width: 60
                }],
            tbar: [{
                    iconCls: 'refresh',
                    handler: function() {
                        grid.store.reload();
                    }
                }, '-', {
                    iconCls: 'create',
                    tooltip: 'Nuevo',
                    handler: function() {
                        com.icg.UserManager.wizard(options);
                    }
                }, {
                    iconCls: 'update',
                    tooltip: 'Modificar',
                    handler: function() {
                        var record = grid.getSelectionModel().getSelected();
                        if (record) {
                            options.record = record;
                            com.icg.UserManager.update(options);
                        } else {
                            com.icg.errors.mustSelect();
                        }
                    }
                }, {
                    iconCls: 'delete',
                    tooltip: 'Eliminar',
                    handler: function() {
                        var record = grid.getSelectionModel().getSelected();
                        if (record) {
                            options.record = record;
                            com.icg.UserManager.deleteUser(options);
                        } else {
                            com.icg.errors.mustSelect();
                        }
                    }
                }, '-', {
                    iconCls: 'key',
                    tooltip: 'Asignar o cambiar la clave',
                    handler: function() {
                        var record = grid.getSelectionModel().getSelected();
                        if (record) {
                            options.record = record;
                            com.icg.UserManager.changePassword(options);
                        } else {
                            com.icg.errors.mustSelect();
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
    }
};

com.icg.UserManager.View = {
    init: function() {
        var usuarios = com.icg.UserManager.usersGrid({});
        new Ext.Viewport({
            layout: 'fit',
            border: false,
            items: new Ext.Panel({
                border: false,
                layout: 'border',
                split: true,
                items: [{
                        title: 'Información',
                        collapsible: true,
                        region: 'west',
                        width: 200
                    }, usuarios, {
                        split: true,
                        collapsible: true,
                        region: 'east',
                        width: 300
                    }]
            })
        });
    }
}

Ext.onReady(com.icg.UserManager.View.init, com.icg.UserManager.View);