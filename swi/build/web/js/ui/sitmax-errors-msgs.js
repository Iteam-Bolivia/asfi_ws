
Ext.ns('com.icg.errors');

com.icg.errors.mustSelect = function() {
    Ext.MessageBox.show({
        title:'Aviso',
        msg:'Debe seleccionar un <b>Registro</b>.',
        buttons: Ext.MessageBox.OK,
        icon:Ext.Msg.INFO
    });
}

com.icg.errors.serverError = function(action) {    
    var httpStatus = null;
    if(action) {
        var response = action.response;
        if(response.status != 200) {
           httpStatus = response.status ? 'HTTP: ' + response.status : '';
           httpStatus += response.statusText ? ' : ' + response.statusText : ''; 
        } else {
           httpStatus = action.result.errorMessage ? 'Server: '+action.result.errorMessage : 'No se ha enviado la causa del error.';
        }
    }
    Ext.MessageBox.show({
        title:'Error',
        msg:'Ha ocurrido un GRAVE error en el Servidor.<br> ' + httpStatus,
        buttons: Ext.MessageBox.OK,
        icon:Ext.Msg.ERROR
    });
}

Ext.ns('com.icg.message');

com.icg.message.deleteConfirm = function(m) {
    var msg = '¿Confirma eliminar el registro? Se perderan Datos.';
    if(m) {
        msg = msg + '\n' + m;
    }
    Ext.MessageBox.confirm('Confirmar', msg ,function(r) {
        if(r == 'yes') {
                                
        }
    });
}