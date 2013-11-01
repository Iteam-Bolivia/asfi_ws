/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.model.Persona;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author John
 */
@Controller
public class SampleController {
    
     @RequestMapping(value = "/hola",method = RequestMethod.GET)
     public @ResponseBody String saludo() {
         String s = "hola mundo";
         return s;
     }
     
     @RequestMapping(value = "/persona/{id}",method = RequestMethod.GET)
     public @ResponseBody Persona getPersona(@PathVariable int id) {
         Persona p = new Persona();
         p.setId(id);
         p.setNombres("John Castillo");        
         return p;
     }
     
     @RequestMapping(value = "/page1",method = RequestMethod.GET)
     public String page1() {
         String s = "page1";
         return s;
     }
}
