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

    private String id;
    private String url;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
