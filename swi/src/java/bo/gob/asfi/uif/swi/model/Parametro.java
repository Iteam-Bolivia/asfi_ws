/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author John
 */
@Entity
@Table(name = "parametros")
public class Parametro implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "parametro_id")
    private Integer id;
    private String nombre;
    private String etiqueta;
    private String tipo;
    private Boolean requerido = false;
    @Transient
    private Boolean oculto;
    private String valordefecto;
    private String patron;
    private Integer rpifield;
    @ManyToOne(fetch = FetchType.LAZY)
    private UserService servicio;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRpifield() {
        return rpifield;
    }

    public void setRpifield(Integer rpifield) {
        this.rpifield = rpifield;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEtiqueta() {
        return etiqueta;
    }

    public void setEtiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Boolean getRequerido() {
        return requerido;
    }

    public void setRequerido(Boolean requerido) {
        this.requerido = requerido;
    }

    public UserService getServicio() {
        return servicio;
    }

    public void setServicio(UserService servicio) {
        this.servicio = servicio;
    }

    public Boolean getOculto() {
        return this.tipo.equals("hidden");
    }

    public String getValordefecto() {
        return valordefecto;
    }

    public void setValordefecto(String valordefecto) {
        this.valordefecto = valordefecto;
    }

    public String getPatron() {
        return patron;
    }

    public void setPatron(String patron) {
        this.patron = patron;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Parametro)) {
            return false;
        }
        Parametro other = (Parametro) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "bo.gob.asfi.uif.swi.model.Parametro[ id=" + id + " ]";
    }
}
