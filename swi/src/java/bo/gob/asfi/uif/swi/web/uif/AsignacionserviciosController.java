package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.UserService;
import bo.gob.asfi.uif.swi.model.Usuario;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
    //private static final Logger logger = LoggerFactory.getLogger(IndividualController.class);

    @RequestMapping(value = "/guardar_servicios", method = RequestMethod.POST)
    public @ResponseBody

    Map<String, ? extends Object> guardarServicios(Usuario usuario) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            Usuario u = dao.get(Usuario.class, usuario.getId());
            u.setServicios(usuario.getServicios());

            dao.update(u);
            body.put("success", true);
            return body;
        } catch (Exception e) {
            body.put("success", false);
            e.printStackTrace();
            java.util.logging.Logger.getLogger(IndividualController.class.getName()).log(Level.SEVERE, null, e);

            return null;
        }
    }

//    @RequestMapping(value = "/listar_servicios")
//    public @ResponseBody
//
//    List<UserService> listar_servicio() {
//        try {
//            Map params = new HashMap();
//            List<UserService> servicios = dao.find(UserService.class);
//            return servicios;
//        } catch (Exception e) {
//            e.printStackTrace();
//            java.util.logging.Logger.getLogger(IndividualController.class.getName()).log(Level.SEVERE, null, e);
//
//            return null;
//        }
//
//    }

    @RequestMapping(value = "/listar_serviciosporusuario")
    public @ResponseBody
    /*
     List<Parametro> listar_parametrosporservicio(@RequestParam Integer servicio_id) {
     try {
     //Map params = new HashMap();
     //List<Parametro> listparametros = dao.getParametrosPorServicio(1);
     //long i=1;
     //Servicio s = dao.get(Servicio.class, i);
     //return s.getParametros();
     return dao.get(UserService.class, servicio_id).getParametros();
     } catch (Exception e) {
     e.printStackTrace();
     java.util.logging.Logger.getLogger(IndividualController.class.getName()).log(Level.SEVERE, null, e);

     return null;
     */
    List<UserService> listar_serviciosporusuario(@RequestParam Integer id) {
        try {
            Map params = new HashMap();
            List<UserService> servicios = dao.getServiciosPorUsuario(id);
            return servicios;
        } catch (Exception e) {
            e.printStackTrace();
            java.util.logging.Logger.getLogger(AsignacionserviciosController.class.getName()).log(Level.SEVERE, null, e);

            return null;
        }
    }

//    @RequestMapping(value = "/listarusuarios")
//    public @ResponseBody
//    Map<String, ? extends Object> listarUsuarios() {
//        Map<String, Object> body = new HashMap<String, Object>();
//        List<Usuario> lst = dao.find(Usuario.class);
//        for (Usuario u : lst) {
//            u.setServicios(null);
//        }
//        body.put("data", lst);
//        return body;
//    }
}
