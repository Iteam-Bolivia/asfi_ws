/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package segip.ws;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author John
 */
@Controller
@RequestMapping(value = "/service")
public class ServiceController {

    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(value = "/searchfields", method = RequestMethod.GET)
    public @ResponseBody List<FormField> userManager() {
        List<FormField> fields = new ArrayList<>();
        
        FormField nombre = new FormField();
        nombre.setXtype(FormField.TEXT_FIELD);
        nombre.setFieldLabel("Nombres");
        nombre.setWidth(230);
        nombre.setAllowBlank(Boolean.FALSE);
        
        nombre = new FormField();
        nombre.setXtype(FormField.TEXT_FIELD);
        nombre.setFieldLabel("Paterno");
        nombre.setWidth(230);
        nombre.setAllowBlank(Boolean.FALSE);
        fields.add(nombre);
        nombre = new FormField();
        nombre.setXtype(FormField.TEXT_FIELD);
        nombre.setFieldLabel("Nombres");
        nombre.setWidth(230);
        nombre.setAllowBlank(Boolean.FALSE);
        fields.add(nombre);
        nombre = new FormField();
        nombre.setXtype(FormField.TEXT_FIELD);
        nombre.setFieldLabel("Materno");
        nombre.setWidth(230);
        nombre.setAllowBlank(Boolean.FALSE);
        
        fields.add(nombre);
        return fields;
    }
}
