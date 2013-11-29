/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author John
 */
@Controller
public class BitacoraController {
    
    @RequestMapping(value = "/busquedaporusurio")
    public String busquedaPorUsuario() {                
        return "bitacora/busquedaporusuario";
    }
    
}
