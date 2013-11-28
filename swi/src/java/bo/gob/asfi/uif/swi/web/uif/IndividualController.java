/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Parametro;
import bo.gob.asfi.uif.swi.model.UserService;
import java.util.Collection;
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
 * @author John
 */
@Controller
@RequestMapping(value = "/individual")
public class IndividualController {

    @Autowired
    Dao dao;

    @RequestMapping(value = "/individual")
    public String individual() {
        return "individual/individual";
    }
    //private static final Logger logger = LoggerFactory.getLogger(IndividualController.class);

    @RequestMapping(value = "/guardar_parametros", method = RequestMethod.POST)
    public @ResponseBody

    Map<String, ? extends Object> guardarParametro(Parametro parametro) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            Parametro u = dao.get(Parametro.class, parametro.getId());
            u.setEtiqueta(parametro.getEtiqueta());
            u.setOculto(parametro.getOculto());
            u.setValordefecto(parametro.getValordefecto());
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

    @RequestMapping(value = "/listar_servicios")
    public @ResponseBody

    List<UserService> listar_servicio() {
        try {
            Map params = new HashMap();
            List<UserService> servicios = dao.find(UserService.class);
            return servicios;
        } catch (Exception e) {
            e.printStackTrace();
            java.util.logging.Logger.getLogger(IndividualController.class.getName()).log(Level.SEVERE, null, e);

            return null;
        }

    }

    @RequestMapping(value = "/listar_parametrosporservicio")
    public @ResponseBody
    Collection<Parametro> listar_parametrosporservicio(@RequestParam Integer servicio_id) {
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
        }

    }
}
