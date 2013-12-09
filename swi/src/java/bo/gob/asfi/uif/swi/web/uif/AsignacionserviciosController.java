package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.UserService;
import bo.gob.asfi.uif.swi.model.Usuario;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Marcelo
 */
@Controller
@RequestMapping(value = "/asignacionservicios")
public class AsignacionserviciosController {
    
    @Autowired
    Dao dao;
    
    @RequestMapping(value = "/asignacionservicios")
    public String individual() {
        return "asignacionservicios/asignacionservicios";
    }
    
    @RequestMapping(value = "/listarusuarios", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, ? extends Object> listarUsuarios() {
        Map<String, Object> body = new HashMap<String, Object>();
        List<Usuario> lst = dao.findAll(Usuario.class);
        List<Usuario> lst2 = new ArrayList<Usuario>();
        for (Usuario u : lst) {
            if (u.getRol().equals("usuario_uif")) {
                u.setServicios(null);
                lst2.add(u);
            }
        }
        
        body.put("data", lst2);
        return body;
    }
    
    @RequestMapping(value = "/listarserviciosporusuario")
    public @ResponseBody
    List<UserService> listarServiciosPorUsuario(@RequestParam Integer id) {
        try {
            return dao.getUserOnlyServices(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @RequestMapping(value = "/guardarservicios", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> guardarServicios(@RequestParam int idUsuario, @RequestParam int idServicio) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            dao.setServicesToUser(idUsuario, idServicio);
            body.put("success", true);
            return body;
        } catch (Exception e) {
            body.put("success", false);
        }
        return body;
    }
    
    
    
    @RequestMapping(value = "/eliminarservicio", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> elminarServicios(@RequestParam int idUsuario, @RequestParam int idServicio) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            dao.setDeleteServiceToUser(idUsuario, idServicio);
            body.put("success", true);
            return body;
        } catch (Exception e) {
            body.put("success", false);
        }
        return body;
    }            
}
