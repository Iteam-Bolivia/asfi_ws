/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Persona;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author John
 */
@Controller
public class Sample2 {
    
    @Autowired
    Dao dao;
    
    @RequestMapping(value = "/holamundo")
    public @ResponseBody String saludo() {
        return "hola mundo";
    }
    
    @RequestMapping(value = "/holamundo2")
    public String saludo2(Model m) {
        
        m.addAttribute("saludo", "Hello World!");
        
        return "vista1";
    }
    
    @RequestMapping(value = "/formulario1")
    public String formulario1() {                
        return "pruebas/formulario1";
    }
    
    @RequestMapping(value = "/guardarpersona", method = RequestMethod.POST)
    public @ResponseBody Map<String, ? extends Object> guardarPersona(Persona persona) {                
        Map<String, Object> body = new HashMap<String, Object>();
        dao.persist(persona);
        body.put("success", true);
        return body;
    }
    
    @RequestMapping(value = "/listarpersonas", method = RequestMethod.GET)
    public @ResponseBody Map<String, ? extends Object> listarPersonas() {                
        Map<String, Object> body = new HashMap<String, Object>();
        List lst = dao.find(Persona.class);
        body.put("data", lst);
        return body;
    }
}
