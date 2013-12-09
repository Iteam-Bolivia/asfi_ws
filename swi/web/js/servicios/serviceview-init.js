/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 * @Author: John Castillo Valencia
 * john.gnu@gmail.com
 */
Ext.ns('Ext.samples');

(function() {

    Ext.samples.Fields = function(data) {
        if (data.length > 0) {
            var cols = new Array();
            var fields = new Array();
            for (var prop in data[0]) {
                console.log("key:" + prop);
                var col = {
                    header: prop,
                    dataIndex: prop
                };
                cols.push(col);
                var field = {
                    name: prop
                };
                fields.push(field)
            }

            var grid = new Ext.grid.GridPanel({
                title: 'Resultados',
                //width: 400,
                height: 190,
                store: new Ext.data.JsonStore({
                    fields: fields,
                    data: data,
                    autoLoad: true
                }),
                columns: cols
            });
            return grid;
        }
        return undefined;
    };

    Ext.samples.RequestForm = function(options) {
        var formreq = Ext.getCmp('form_request');
        formreq.removeAll();
        Ext.Ajax.request({
            url: Ext.SROOT + 'paneldeservicios/formserviceitems',
            method: 'POST',
            params: {
                id: options.id
            },
            success: function(result, request) {
                var sfields = Ext.util.JSON.decode(result.responseText);
                sfields.push({
                    xtype: 'hidden',
                    name: '_swi_userservice_id_',
                    value: options.id
                });
                var form = new Ext.FormPanel({
                    url: Ext.SROOT + 'webservicesystem',
                    border: false,
                    autoHeight: true,
                    region: 'center',
                    bodyStyle: 'padding:10px',
                    labelWidth: 130,
                    frame: true,
                    labelAlign: 'top',
                    defaults: {
                        msgTarget: 'side'
                    },
                    items: sfields,
                    tbar: [{
                            text: 'Ejecutar',
                            iconCls: 'play',
                            tooltip: 'Llamar la operaci&oacute;n del servicio',
                            handler: function() {
                                formreq.getEl().mask("Espere...", "x-mask-loading");
                                form.getForm().submit({
                                    success: function(form, action) {
                                        var ro = Ext.util.JSON.decode(action.response.responseText);
                                        formreq.getEl().unmask();
                                        formreq.remove(1);
                                        var grid = Ext.samples.Fields(ro.result)
//                                        formreq.add({
//                                            xtype: 'panel',
//                                            title: 'Resultado',
//                                            bodyStyle: 'padding:10px',
//                                            autoScroll: true,
//                                            height: 200,
//                                            html: '<code>' + ro.result + '</code>'
//                                        });
                                        formreq.add(grid);
                                        formreq.doLayout();
                                    },
                                    failure: function(form, action) {
                                        //Ext.Msg.alert('Warning', action.result.errorMessage);
                                        //options.error('Error interno',action.result.errorMessage);
                                        //domain.errors.submitFailure('Error interno', action.result.errorMessage);
                                    }
                                });
                            }
                        }]
                });
                formreq.add(form);
                formreq.doLayout();
            },
            failure: function(result, request) {

            }
        });
    }

    SamplePanel = Ext.extend(Ext.DataView, {
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
                '<dd ext:url="{url}" ext:id="{id}"><img src="images/{icon}"/>',
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
        onDblClick: function(e) {
            var group = e.getTarget('h2', 3, true);
            if (group) {
                group.up('div').toggleClass('collapsed');
            } else {
                var t = e.getTarget('dd', 5, true);
                if (t && !e.getTarget('a', 2)) {
                    var url = t.getAttributeNS('ext', 'url');
                    var id = t.getAttributeNS('ext', 'id');
                    Ext.samples.RequestForm({id: id});
                }
            }
            return SamplePanel.superclass.onClick.apply(this, arguments);
        }
    });
    Ext.samples.SamplePanel = SamplePanel;
    Ext.reg('samplespanel', Ext.samples.SamplePanel);
})();

Ext.onReady(function() {
    (function() {

        var store = new Ext.data.JsonStore({
            url: Ext.SROOT + 'paneldeservicios/listaservicios',
            idProperty: 'id',
            fields: ['id', 'title', 'samples'],
            autoLoad: true
        });

        var panel = new Ext.Panel({
            title: 'Servicios',
            frame: true,
            id: 'all-demos',
            border: false,
            region: 'center',
            autoScroll: true,
            items: new SamplePanel({
                store: store
            }),
            tbar: ['->', {
                    iconCls: 'refresh',
                    tooltip: 'Recargar',
                    handler: function() {
                        store.reload();
                    }
                }]
        });

        new Ext.Viewport({
            layout: 'border',
            border: false,
            items: [panel, {
                    region: 'east',
                    title: 'Formulario de Solicitud',
                    id: 'form_request',
                    split: true,
                    layout: 'fit',
                    collapsible: true,
                    autoScroll: true,
                    width: 500,
                    minWidth: 400
                }]
        });

    }).defer(500);
});