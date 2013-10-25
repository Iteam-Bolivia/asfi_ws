/**
 * IframePanel Class
 * @Description Component Admin
 * @author Johns Castillo Valencia
 */

Ext.IframePanel = Ext.extend(Ext.Panel, {
    onRender: function() {
        this.bodyCfg = {
            tag: 'iframe',
            src: this.src,
            cls: this.bodyCls,
            style: {
                border: '0px none'
            }
        };
        Ext.IframePanel.superclass.onRender.apply(this, arguments);
    }
});

/**
 * openModule, Open Module in new TAB 
 * @augments, 
 *   id:
 *   icono:
 *   title: 
 *   url: url direct to program 
 * @author Johns Castillo Valencia
 */
swi.ui.openModule = function(options) { 
    if(options.fn) {
       var ret = eval(options.fn);
    } else {
        var tab = swi.ui.main.tabs.findById(options.id);
        if(!tab) {
            var siframe = new Ext.IframePanel({
                src: options.url ? options.url : '404.jsp'
            });            
            tab = new Ext.Panel({
                id:options.id,
                iconCls: options.iconCls ? options.iconCls : 'module-app',
                layout:'fit',
                closable:true,
                title:options.title ? options.title : 'Sin titulo',
                items:siframe
            });                                          
            swi.ui.main.tabs.add(tab);
        }  
        swi.ui.main.tabs.activate(tab);       
    }
};

swi.ui.main = {
    start: function() {        
        var start = new Ext.Panel({
            id: 'start-panel',
            title: "Servicios",
            layout: 'fit',
            autoScroll: true,
            bodyStyle: 'padding:25px',            
            contentEl: 'start-div'
        });
        this.tabs = new Ext.TabPanel({
            border: false,
            activeTab: 0,
            enableTabScroll: true,
            items:[start],
            plugins: new Ext.ux.TabCloseMenu()
        });
        return {
            id: 'content-panel',
            region: 'center',
            activeItem: 0,
            layout:'fit',             
            tbar:Ext.appMenu(),
            items: [this.tabs]
        };
    },
    init: function(){        
        Ext.History.init();
        new Ext.Viewport({
            layout:'border',
            items:[{
                xtype:'box',
                region:'north',
                frame:true,
                applyTo:'header',
                height:50
            },swi.ui.main.start(),{
                xtype:'box',
                region:'south',
                frame:true,
                applyTo:'footer',
                height:40
            }]       
        });
    } 
};    

Ext.onReady(swi.ui.main.init);