/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author John
 */
@Controller
@RequestMapping(value = "/security")
public class SecurityController {

    @RequestMapping(value = "/usermanager", method = RequestMethod.GET)
    public String userManager() {
        return "security/usermanager";
    }
}
