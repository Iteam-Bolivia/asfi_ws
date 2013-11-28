/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author John
 */
@Entity
@Table(name = "servicios")
public class UserService implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "servicio_id")
    private Integer id;
    private String nombre;
    private String router;
    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Collection<Parametro> parametros;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRouter() {
        return router;
    }

    public void setRouter(String router) {
        this.router = router;
    }

    public Collection<Parametro> getParametros() {
        return parametros;
    }

//    public void setParametros(Collection<Parametro> parametros) {
//        this.parametros = parametros;
//    }
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof UserService)) {
            return false;
        }
        UserService other = (UserService) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "bo.gob.asfi.uif.swi.model.UserService[ id=" + id + " ]";
    }
}
