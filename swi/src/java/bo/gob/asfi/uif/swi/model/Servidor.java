/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.model;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author John
 */
@Entity
@Table(name = "servidores")
public class Servidor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "servidor_id")
    private Long id;
    private String nombre;
    private String wsdlurl;
    @Lob
    private String jsonstruct;
    private Boolean activo = false;
    @Transient
    private List<Servicio> servicios;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getWsdlurl() {
        return wsdlurl;
    }

    public void setWsdlurl(String wsdlurl) {
        this.wsdlurl = wsdlurl;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public List<Servicio> getServicios() {
        Type listType = new TypeToken<ArrayList<Servicio>>() {
        }.getType();
        return new Gson().fromJson(this.jsonstruct, listType);        
    }

    public void setServicios(List<Servicio> servicios) {
        this.servicios = servicios;
    }

    public String getJsonstruct() {
        return jsonstruct;
    }

    public void setJsonstruct(String jsonstruct) {
        this.jsonstruct = jsonstruct;
    }
}
