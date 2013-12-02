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
    mustBeServer: function() {
        Ext.MessageBox.show({
            title: 'Aviso',
            msg: 'Debe seleccionar la <b>Ra&iacute;z del servicio</b>.',
            buttons: Ext.MessageBox.OK,
            icon: Ext.Msg.INFO
        });
    },
    mustBeOperation: function() {
        Ext.MessageBox.show({
            title: 'Aviso',
            msg: 'Debe seleccionar una <b>Operacion del servicio</b>.',
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
    definirServicio: function(options) {
        var form = new Ext.FormPanel({
            url: Ext.SROOT + 'definirservicio',
            border: false,
            autoHeight: true,
            bodyStyle: 'padding:10px',
            defaults: {
                msgTarget: 'side',
                width: 300
            },
            items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    allowBlank: false,
                    name: 'nombre'
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Descripci&oacute;n',
                    allowBlank: false,
                    name: 'descripcion'
                }, {
                    xtype: "hidden",
                    name: "router",
                    value: options.router,
                }]
        });

        var win = new Ext.Window({
            title: 'Definir Servicio',
            autoScroll: true,
            autoHeight: true,
            width: 500,
            activeItem: 0,
            layout: 'anchor',
            items: [{
                    xtype: 'panel',
                    bodyStyle: 'padding:10px;background-color:#FFFFFF;color:#777777',
                    html: '<b>Esta acci&oacute;n establece la Operaci&oacute;n Web Service como servicio del sistema.  El Servicio requiere configuraci&oacute;n.</b>',
                    height: 50,
                    border: false
                }, form],
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
    },
    deleteService: function(options) {
        if (options.node.attributes.iconCls === 'server') {
            var item = options.node.attributes;
            Ext.MessageBox.confirm('Confirmar', '¿Confirma eliminar el registro? Se perderan Datos.', function(r) {
                if (r === 'yes') {
                    Ext.Ajax.request({
                        url: Ext.SROOT + 'eliminarservidor',
                        method: 'POST',
                        params: {
                            id: item.id
                        },
                        success: function(result, request) {
                            options.tree.getRootNode().reload();
                        },
                        failure: function(result, request) {

                        }
                    });
                }
            });
        } else {
            domain.errors.mustBeServer();
        }
    },
    reloadService: function(options) {
        if (options.node.attributes.iconCls === 'server') {
            var item = options.node.attributes;
            Ext.Ajax.request({
                url: Ext.SROOT + 'reloadservidor',
                method: 'POST',
                params: {
                    id: item.id
                },
                success: function(result, request) {
                    options.tree.getRootNode().reload();
                },
                failure: function(result, request) {

                }
            });
        } else {
            domain.errors.mustBeServer();
        }
    },
    openOperation: function(options) {
        options.panelinfo.removeAll();
        if (options.node.attributes.iconCls === 'operation') {
            var item = options.node.attributes;
            Ext.Ajax.request({
                url: Ext.SROOT + 'formserviceitems',
                method: 'POST',
                params: {
                    id: item.id
                },
                success: function(result, request) {
                    var sfields = Ext.util.JSON.decode(result.responseText);
                    var form = new Ext.FormPanel({
                        url: Ext.SROOT + 'submitservice',
                        border: false,
                        autoHeight: true,
                        bodyStyle: 'padding:10px',
                        labelWidth: 130,
                        frame: true,
                        labelAlign: 'top',
                        items: [{
                                xtype: 'fieldset',
                                layout: 'form',
                                defaults: {
                                    msgTarget: 'side'
                                },
                                items: sfields
                            }],
                        tbar: [{
                                text: 'Enviar',
                                iconCls: 'play',
                                tooltip: 'Llamar la operaci&oacute;n del servicio',
                                handler: function() {
                                    //submit service request
                                }
                            }, '-', {
                                text: 'Definir Servicio',
                                iconCls: 'accept',
                                tooltip: 'Definir como Servicio del sistema',
                                handler: function() {
                                    domain.ServiceManager.definirServicio({router: item.id});
                                }
                            }]
                    });
                    options.panelinfo.add(form);
                    options.panelinfo.doLayout();
                },
                failure: function(result, request) {

                }
            });
        } else {
            domain.errors.mustBeOperation();
        }
    },
    datosServicio: function() {
        return {
            xtype: 'fieldset',
            title: 'Datos de conexion',
            defaults: {
                msgTarget: 'side',
                width: 450
            },
            items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    allowBlank: false,
                    name: 'nombre'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'WSDL URL',
                    allowBlank: false,
                    name: 'wsdlurl'
                }]
        };
    },
    newService: function(options) {
        var form = new Ext.FormPanel({
            url: Ext.SROOT + 'crearservicio',
            border: false,
            autoHeight: true,
            bodyStyle: 'padding:10px',
            labelWidth: 100,
            waitMsgTarget: true,
            items: [this.datosServicio()]
        });

        var win = new Ext.Window({
            iconCls: 'server',
            title: 'Registrar Servicio',
            autoScroll: true,
            width: 650,
            autoHeight: true,
            minWidth: 640,
            items: form,
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                    text: 'Guardar',
                    handler: function() {
                        this.disabled = true;
                        form.getForm().submit({
                            waitMsg: 'Leyendo WSDL...',
                            success: function(form, action) {
                                options.tree.getRootNode().reload();
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

domain.ServiceManager.View = {
    init: function() {

        var tree = new Ext.tree.TreePanel({
            title: 'Servicios',
            iconCls: 'server',
            region: 'west',
            collapsible: true,
            split: true,
            width: 400,
            minWidth: 350,
            maxWidth: 450,
            autoScroll: true,
            animate: true,
            loadMask: true,
            rootVisible: false,
            root: {
                nodeType: 'async'
            },
            loader: new Ext.tree.TreeLoader({
                dataUrl: 'treeservices',
                requestMethod: 'GET'
            }),
            tbar: [{
                    iconCls: 'refresh',
                    tooltip: 'Recargar',
                    handler: function() {
                        tree.getRootNode().reload();
                    }
                }, '-', {
                    text: 'Nuevo',
                    iconCls: 'server-add',
                    tooltip: 'Nuevo servicio',
                    handler: function() {
                        domain.ServiceManager.newService({tree: tree});
                    }
                }, {
                    text: 'Eliminar',
                    iconCls: 'server-delete',
                    tooltip: 'Eliminar servicio',
                    handler: function() {
                        var record = tree.getSelectionModel().getSelectedNode();
                        if (record) {
                            domain.ServiceManager.deleteService({node: record, tree: tree});
                        } else {
                            domain.errors.mustSelect();
                        }
                    }
                }, '-', {
                    text: 'Abrir',
                    iconCls: 'open',
                    tooltip: 'Abrir Operaci&oacute;n',
                    handler: function() {
                        var record = tree.getSelectionModel().getSelectedNode();
                        if (record) {
                            domain.ServiceManager.openOperation({
                                node: record,
                                tree: tree,
                                panelinfo: serviceInfoPanel
                            });
                        } else {
                            domain.errors.mustSelect();
                        }
                    }
                }, {
                    iconCls: 'drink',
                    text: 'Expandir',
                    handler: function() {
                        tree.getRootNode().reload();
                        tree.getRootNode().expand(true);
                    }
                }, {
                    iconCls: 'page-refresh',
                    text: 'Recargar',
                    handler: function() {
                        var record = tree.getSelectionModel().getSelectedNode();
                        if (record) {
                            domain.ServiceManager.reloadService({node: record, tree: tree});
                        } else {
                            domain.errors.mustSelect();
                        }
                    }
                }],
            listeners: {
                dblclick: function(node, e) {
                    if (node.attributes.iconCls === 'operation') {
                        domain.ServiceManager.openOperation({
                            node: node,
                            tree: tree,
                            panelinfo: serviceInfoPanel
                        });
                    }
                }//,
//                click: function(node, e) {
//                }
            }
        });
        //tree.getRootNode().expand(true);
        var serviceInfoPanel = new Ext.Panel({
            title: 'Informacion',
            region: 'center',
            layout: 'fit'
        });

        new Ext.Viewport({
            layout: 'fit',
            border: false,
            items: new Ext.Panel({
                border: false,
                layout: 'border',
                items: [tree, serviceInfoPanel]
            })
        });
    }
}

Ext.onReady(domain.ServiceManager.View.init, domain.ServiceManager.View);