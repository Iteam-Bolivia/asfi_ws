package bo.gob.asfi.uif.swi.web.uif;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author John Castillo Valencia
 */
@Controller
public class UIFController {

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    //@PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/main")
    public String portal() {
        return "main";
    }
    
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/cualquiercosa")
    public String cuequiercosa() {
        return "main";
    }
}
