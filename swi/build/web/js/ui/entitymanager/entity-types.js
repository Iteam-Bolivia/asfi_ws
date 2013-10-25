/*!
 * ICG - International Consulting Group, 2011
 * 
 */

com.icg.formBuilderX = {
    entityStore: new Ext.data.JsonStore({
            url:'entity/addonentities',
            id:'name',
            root:'data',       
            fields:['id','name','label'],
            autoLoad:true
    }),
    entityCombo: function() {
            return {
            xtype: 'combo',
            fieldLabel: 'Entidad',
            emptyText: 'Seleccione una entidad',
            displayField:'label',            
            valueField:'name',
            forceSelection: true,        
            hiddenName: 'rel',
            typeAhead: true,
            triggerAction: 'all',      
            mode:'local'
        };
    },
    entity: function(f) {
        
        var entityselector = this.entityCombo();
        entityselector.listeners = {
            select: function(s,record) {
                f.getForm().findField('name').setValue(record.data.name);
                f.getForm().findField('label').setValue(record.data.label);
            }
        }  
        
        entityselector.allowBlank = false;    
        entityselector.width = 210,
        entityselector.allowBlank = false;
        entityselector.store = this.entityStore;
        var fields = {
            xtype: 'fieldset',
            title: 'Opciones de relaci&oacute;n',            
            autoHeight: true,
            defaultType: 'textfield',
            defaults:{
                msgTarget:'side'
            },
            layout:'form',            
            items: [{
                xtype:'radiogroup',
                fieldLabel: 'Multiplicidad',
                width:150,
                defaults:{
                    name:'multiplicity'
                },
                items:[{
                    boxLabel: '1',                     
                    inputValue: '1',
                    checked:true 
                },{
                    boxLabel: 'n',                     
                    inputValue: 'n'                    
                }]                
            },entityselector,{
                xtype:'displayfield',
                value:'<small>Permitir&aacute; insertar 1 o n Objetos, de otra entidad, estos objetos deberan tener un atributo de visivilidad.</small>'
            }]
        };
        return fields;
    },    
    integer: {
        xtype: 'fieldset',
        title: 'Opciones de n&uacute;meros',            
        autoHeight: true,
        defaultType: 'textfield',
        layout:'form',
        items: [{
            xtype: 'numberfield',
            fieldLabel: 'Valor por defecto',
            emptyText: '',                
            name: 'defaultValue',
            allowDecimals:false,            
            width:210
        },{
            xtype: 'checkbox',
            fieldLabel:'Permitir negativos',
            name:'allowNegative',
            checked:true            
        },{
            xtype: 'numberfield',
            fieldLabel: 'Valor M&iacute;nimo',
            emptyText: '',                
            name: 'minValue',
            allowDecimals:false,            
            width:210
        },{
            xtype: 'numberfield',
            fieldLabel: 'Valor M&aacute;ximo',
            emptyText: '',                
            name: 'maxValue',
            allowDecimals:false,            
            width:210
        }]
    },
    float: {
        xtype: 'fieldset',
        title: 'Opciones de n&uacute;meros',            
        autoHeight: true,
        defaultType: 'textfield',
        layout:'form',
        items: [{
            xtype: 'numberfield',
            fieldLabel: 'Valor por defecto',
            emptyText: '',                
            name: 'defaultValue',
            allowDecimals:true,            
            width:210
        },{
            xtype: 'numberfield',
            fieldLabel: 'Nro. de decimales',
            emptyText: '',                
            name: 'decimalPrecision',
            allowDecimals:false,           
            allowNegative:false,
            width:210
        },{
            xtype: 'checkbox',
            fieldLabel:'Permitir negativos',
            name:'allowNegative',
            checked:true            
        },{
            xtype: 'numberfield',
            fieldLabel: 'Valor M&iacute;nimo',
            emptyText: '',                
            name: 'minValue',
            allowDecimals:true,  
            width:210
        },{
            xtype: 'numberfield',
            fieldLabel: 'Valor M&aacute;ximo',
            emptyText: '',                
            name: 'maxValue',
            allowDecimals:true,            
            width:210
        },{
            xtype: 'hidden',                                      
            name: 'allowDecimals',
            value:'true'
        }]
    },
    string: {
        xtype: 'fieldset',
        title: 'Opciones de cadenas',            
        autoHeight: true,
        defaultType: 'textfield',
        defaults: {
            msgTarget:'side'
        },
        layout:'form',
        items: [{
            xtype: 'numberfield',
            fieldLabel: 'Tama&ntilde;o',
            emptyText: '',
            maxLength: 3,
            name: 'length',
            allowBlank: false,
            AllowNegative:false,
            allowDecimals:false,
            minValue:1,
            width:210
        },{
            xtype: 'textfield',
            fieldLabel: 'Valor por defecto',
            emptyText: '',                
            name: 'defaultValue',
            width:210
        }]
    },
    date: {
        xtype: 'fieldset',
        title: 'Opciones de fecha',                    
        defaultType: 'textfield',
        layout:'form',
        items: [{
            xtype: 'datefield',
            fieldLabel: 'Valor por defecto',
            format: 'd/m/Y',                
            name: 'defaultValue',
            width:210
        },{            
            fieldLabel: 'Patrón',
            emptyText: '',            
            name: 'datePattern',
            value:'dd/MM/yyyy',
            allowBlank: false,
            readOnly:true,
            readonly:true,
            width:210
        }]
    },
    sino: {
        xtype: 'fieldset',
        title: 'Opciones de Si o No',            
        //autoHeight: true,
        defaultType: 'textfield',
        layout:'form',
        items: [{
            xtype:'compositefield',
            fieldLabel: 'Valor por SI',
            items:[{                        
                xtype:'textfield',         
                name: 'yesValue',
                allowBlank: false,
                value:'Si',
                width:150
            },{
                xtype: 'displayfield', 
                value: 'Sel.'
            },{
                xtype:'radio',
                name:'yesNoSelect',
                inputValue: 'yes',
                checked:true
            }]
        },{
            xtype:'compositefield',
            fieldLabel: 'Valor por NO',
            items:[{            
                xtype:'textfield',                          
                name: 'noValue',
                allowBlank: false,
                value:'No',
                width:150
            },{
                xtype: 'displayfield', 
                value: 'Sel.'
            },{
                xtype:'radio',
                name:'yesNoSelect',
                inputValue: 'no'
            }]
        }]
    }
}


