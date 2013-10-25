/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author John
 */
@Entity
@Table(schema = "uif", name = "usuarios")
public class Usuario {

    @Id
    @Column(name = "clm0")
    private Integer id;
    @Column(name = "clm1")
    private String usernamae;
    @Column(name = "clm2", length = 100)
    private String password;
    @Column(name = "clm3")
    private String rol;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsernamae() {
        return usernamae;
    }

    public void setUsernamae(String usernamae) {
        this.usernamae = usernamae;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
