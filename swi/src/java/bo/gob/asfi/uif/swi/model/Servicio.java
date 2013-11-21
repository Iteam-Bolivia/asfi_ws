/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

/**
 *
 * @author John
 */
@Entity
@Table(name = "servicios")
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "servicio_id")
    private Long id;
    private String nombre;
    private String servidor;
    @Column(columnDefinition = "TEXT")
    private String wsdl;
    private String wsdlurl;
    private String puerto;
    private String protocolo;
    private String username;
    private String password;
    private Boolean activo = false;
    @OneToMany(mappedBy = "servicio")
    @OrderBy("NOMBRE")
    List<Recurso> recursos;

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

//    public List<Recurso> getRecursos() {
//        return recursos;
//    }
//
//    public void setRecursos(List<Recurso> recursos) {
//        this.recursos = recursos;
//    }
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

    public String getServidor() {
        return servidor;
    }

    public void setServidor(String servidor) {
        this.servidor = servidor;
    }

    public String getPuerto() {
        return puerto;
    }

    public void setPuerto(String puerto) {
        this.puerto = puerto;
    }

    public String getProtocolo() {
        return protocolo;
    }

    public void setProtocolo(String protocolo) {
        this.protocolo = protocolo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getWsdl() {
        return wsdl;
    }

    public void setWsdl(String wsdl) {
        this.wsdl = wsdl;
    }

    public String getWsdlurl() {
        return wsdlurl;
    }

    public void setWsdlurl(String wsdlurl) {
        this.wsdlurl = wsdlurl;
    }
}
