/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.model;

import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author John
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class Node extends org.heyma.core.extjs.components.Node {

    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
