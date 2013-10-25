<jsp:directive.page contentType="text/javascript" pageEncoding="UTF-8"/>
Ext.appMenu = function() {
   var menu = ${json};
   menu.push(['->',{    
     id:'_appthemeswitcher',
     xtype:'themecombo',  
     fieldLabel:'dsdsd'
   }]);
   return menu;
}