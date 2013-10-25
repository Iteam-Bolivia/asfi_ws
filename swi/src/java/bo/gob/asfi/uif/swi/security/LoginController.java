/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author John
 */
@Controller
public class LoginController {

    @RequestMapping(value = "/loginform", method = RequestMethod.GET)
    public String getLoginPage(Model model, @RequestParam(value = "error", required = false) boolean error) {        
        if (error) {
            model.addAttribute("key", "failure");
        }
        return "/login/Login";
    }
    
    @RequestMapping(value = "/accessdenied", method = RequestMethod.GET)
    public String accessDenied(HttpServletRequest request, HttpServletResponse response) {        
        
        return "/FatalError";
    }
}
