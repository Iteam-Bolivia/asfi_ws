/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package segip.ws;

import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author John
 */
@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class FormField extends org.heyma.core.extjs.components.FormField {
    
}
