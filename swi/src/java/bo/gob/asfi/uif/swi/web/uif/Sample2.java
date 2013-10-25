/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author John
 */
@Controller
public class Sample2 {
    
    @RequestMapping(value = "/holamundo")
    public @ResponseBody String saludo() {
        return "hola mundo";
    }
    
    @RequestMapping(value = "/holamundo2")
    public String saludo2(Model m) {
        
        m.addAttribute("saludo", "Hello World!");
        
        return "vista1";
    }
}
