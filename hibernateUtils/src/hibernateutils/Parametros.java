/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package hibernateutils;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author John
 */
@Entity
@Table(name = "PARAMETROS")
@NamedQueries({
    @NamedQuery(name = "Parametros.findAll", query = "SELECT p FROM Parametros p")})
public class Parametros implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "PARAMETRO_ID")
    private Long parametroId;
    @Column(name = "ETIQUETA")
    private String etiqueta;
    @Column(name = "NOMBRE")
    private String nombre;
    @Column(name = "REQUERIDO")
    private Short requerido;
    @Column(name = "TIPO")
    private String tipo;
    @JoinColumn(name = "SERVICIO_SERVICIO_ID", referencedColumnName = "SERVICIO_ID")
    @ManyToOne
    private Servicios servicioServicioId;

    public Parametros() {
    }

    public Parametros(Long parametroId) {
        this.parametroId = parametroId;
    }

    public Long getParametroId() {
        return parametroId;
    }

    public void setParametroId(Long parametroId) {
        this.parametroId = parametroId;
    }

    public String getEtiqueta() {
        return etiqueta;
    }

    public void setEtiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Short getRequerido() {
        return requerido;
    }

    public void setRequerido(Short requerido) {
        this.requerido = requerido;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Servicios getServicioServicioId() {
        return servicioServicioId;
    }

    public void setServicioServicioId(Servicios servicioServicioId) {
        this.servicioServicioId = servicioServicioId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (parametroId != null ? parametroId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Parametros)) {
            return false;
        }
        Parametros other = (Parametros) object;
        if ((this.parametroId == null && other.parametroId != null) || (this.parametroId != null && !this.parametroId.equals(other.parametroId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "hibernateutils.Parametros[ parametroId=" + parametroId + " ]";
    }
    
}
