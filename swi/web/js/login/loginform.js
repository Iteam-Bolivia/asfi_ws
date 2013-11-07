/**
 * 
 * @author Johns Castillo Valencia
 * john.gnu@gmail.com
 * @description Formulario de Autenticacion de usuarios
 *  
 */
Ext.ns('domain.security');
       
domain.security.msg = {
    login: function() {           
        Ext.MessageBox.show({
            title: 'Error',
            msg: 'No se reconoce la información de inicio de sesión.  Verifique nombre de usuario y contraseña.',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });   
    },
    e401: function() {           
        Ext.MessageBox.show({
            title: 'HTTP status 401',
            msg: 'Fall&oacute; el inicio de sesi&oacute;n!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });   
    },
    e403: function() {           
        Ext.MessageBox.show({
            title: 'HTTP status 403',
            msg: 'Acceso denegato!',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });   
    },       
    chgpassError: function(msg,frm) {           
        Ext.MessageBox.show({
            title: 'Error',
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR,
            fn:function(r) {
                frm.reset();
            }
        });   
    },  
    chgpassSuccess: function(win) {           
        Ext.MessageBox.show({
            title: 'Success',
            msg: 'Cambiar password correcto.',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO,
            fn:function(r) {
                win.close();
            }
        });   
    }  
}
       
domain.security.Login = function() {    
    var loginSubmit = function() {
        login.getForm().submit({
            method:'POST', 
            success:function(form, action){
                window.location = '../main';                   
            },                    
            failure:function(form, action){
                domain.security.msg.login();
                login.getForm().reset();                                            
            } 
        });
    };
    
    var login = new Ext.FormPanel({
        labelWidth:130,
        url:'j_spring_security_check',
        frame:true,
        defaultType:'textfield',
        monitorValid:true,
        bodyStyle:'padding:10px',
        defaults: {
            width:200
        },
        items:[{
            fieldLabel:'Nombre de usuario',
            name:'j_username',
            allowBlank:false                                
        },{
            fieldLabel:'Contraseña',
            name:'j_password',
            inputType:'password',
            allowBlank:false
        }],
        buttons:[{
            text:'Iniciar sesi&oacute;n',
            width:100,
            formBind: true,
            handler:loginSubmit
        }],
        keys: [{
            key: [Ext.EventObject.ENTER], 
            handler: loginSubmit
        }]
    });
        
    var win = new Ext.Window({
        title:'Iniciar sesi&oacute;n',
        iconCls:'key',
        width:450,
        height:200,
        layout:'anchor',
        //modal:true,
        resizable:false,
        closable:false,
        items:[{
            xtype:'panel',    
            bodyStyle:'padding:10px;background-color:orange;color:#FFFFFF',
            html:'<b>Identifíquese para continuar...</b>',
            height:50
        },login]
    });                  
    return win;
}

domain.security.chgpass = function(options) {    
    
    var form = new Ext.FormPanel({
        labelWidth:130,
        url:'user/ldap/chpass',
        autoHeight:true,
        frame:false,
        defaultType:'textfield',
        monitorValid:true,
        bodyStyle:'padding:10px',
        defaults: {
            width:200
        },
        items:[{
            fieldLabel:'Contraseña anterior',
            name:'current',
            inputType:'password',
            allowBlank:false
        },{
            fieldLabel:'Contraseña nueva',
            name:'new',
            inputType:'password',
            allowBlank:false
        },{
            fieldLabel:'Confirmar',
            name:'confirm',
            inputType:'password',
            allowBlank:false
        },{
            xtype:'hidden', 
            name:'userName',
            value: options.userName           
        }],
        buttons:[{
            text:'Cambiar',
            width:100,
            formBind: true,
            handler:function(){
                form.getForm().submit({
                    method:'POST', 
                    success:function(form, action){
                        domain.security.msg.chgpassSuccess(win);
                    },                    
                    failure:function(form, action){
                        if(action.failureType == 'server') {
                            var obj = Ext.util.JSON.decode(action.response.responseText);  
                            domain.security.msg.chgpassError(obj.errorMessage,form);
                        }
                    } 
                });
            }
        },{
            text:'Cancelar',
            width:100,
            handler:function() {
                win.close();
            }
        }]
    });
    
    var win = new Ext.Window({
        title:'Cambiar contraseña',
        width:450,
        autoHeight:true,
        layout:'anchor',
        modal:true,
        resizable:false,
        items:[form]
    });        
    win.show();             
}