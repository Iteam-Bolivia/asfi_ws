package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Usuario;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author John Castillo Valencia
 */
@Controller
public class UIFController {

    @Autowired
    Dao dao;

    //@PreAuthorize("hasRole('ADMIN')")
    //@PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/main")
    public String portal() {
        return "main";
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/seguro")
    public @ResponseBody String cuequiercosa() {
        
        Authentication autenticacion = SecurityContextHolder.getContext().getAuthentication();
        String nombre = autenticacion.getName();
        
        return "Hola " + nombre + ", acceso validado!";
    }
    
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public  @ResponseBody Map<String, ? extends Object> getLogin(@RequestParam(value = "error", required = false) boolean error) {
        
        Map<String, Object> data = new HashMap<String, Object>();
        if (error == true) {
            data.put("success", Boolean.FALSE);
            data.put("reason", "Fallo el ingreo.. intente nuevamente");
        } else {
            data.put("success", Boolean.TRUE);   
        }
        return data;
    }
    
    
    @RequestMapping(value = "/get/{entity}/{id}")
    public @ResponseBody Object get(@PathVariable String entity, @PathVariable Integer id) {
        try {
            Object o = dao.get(Class.forName("bo.gob.asfi.uif.swi.model." + entity), id);
            return 0;
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(UIFController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    @RequestMapping(value = "/finduser/{username}")
    public @ResponseBody Object find(@PathVariable String username) {
        
        Usuario user = dao.getUsuarioByUsername(username);
        System.out.println(user);
        return user;
    }
    
}
