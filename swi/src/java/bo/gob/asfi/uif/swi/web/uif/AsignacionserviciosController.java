package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.UserService;
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

    @RequestMapping(value = "/listarserviciosporusuario")
    public @ResponseBody
    List<UserService> listarServiciosPorUsuario(@RequestParam Integer id) {
        try {
            return dao.getUserServices(id);
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
}
