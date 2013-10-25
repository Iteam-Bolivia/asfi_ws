/**
 * FormField Required Configuration
 */
//Ext.override(Ext.layout.FormLayout, {
//    getTemplateArgs: function(field) {
//        var noLabelSep = !field.fieldLabel || field.hideLabel;        
//        var labelSep = (typeof field.labelSeparator == 'undefined' ? this.labelSeparator : field.labelSeparator);
//        if (!field.allowBlank && field.xtype!='checkbox') {
//            labelSep += '<span style="color: rgb(255, 0, 0); padding-left: 2px;">*</span>';            
//        }
//        return {
//            id: field.id,
//            label: field.fieldLabel,
//            labelStyle: field.labelStyle||this.labelStyle||'',
//            elementStyle: this.elementStyle||'',
//            labelSeparator: noLabelSep ? '' : labelSep,
//            itemCls: (field.itemCls||this.container.itemCls||'') + (field.hideLabel ? ' x-hide-label' : ''),
//            clearCls: field.clearCls || 'x-form-clear-left'
//        }        
//    }
//});

Ext.apply(Ext.form.VTypes,{
    uppercase:function(val,field) {      
        var texto = val;
        texto = Ext.util.Format.uppercase(texto);
        field.setRawValue(texto);
        return true;          
    },
    lowercase:function(val,field) {      
        var texto = val;
        texto = Ext.util.Format.lowercase(texto);
        field.setRawValue(texto);
        return true;          
    }
});
