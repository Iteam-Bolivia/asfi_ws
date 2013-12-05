/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.model;

/**
 *
 * @author John
 */
public class Operacion {

    private String nombre;
    private ORequest request;
    private OResponse response;
    private String bindingName;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public ORequest getRequest() {
        return request;
    }

    public void setRequest(ORequest request) {
        this.request = request;
    }

    public OResponse getResponse() {
        return response;
    }

    public void setResponse(OResponse response) {
        this.response = response;
    }

    public String getBindingName() {
        return bindingName;
    }

    public void setBindingName(String bindingName) {
        this.bindingName = bindingName;
    }
}
