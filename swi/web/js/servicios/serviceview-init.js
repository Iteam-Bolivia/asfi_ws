/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2006-2010 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ns('Ext.samples');

(function() {

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
                                //domain.ServiceManager.definirServicio({router: item.id});
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
        onClick: function(e) {
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
            region: 'center',
            autoScroll: true,
            items: new SamplePanel({
                store: store
            }),
            tbar:[{
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
                    width: 500
                }]
        });

    }).defer(500);
});