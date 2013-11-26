/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif.user;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Parametro;
import bo.gob.asfi.uif.swi.model.UserService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
public class UserServiceControllerDemo {

    @Autowired
    Dao dao;

    @RequestMapping(value = "/userservices")
    public String administrarServicios() {

        return "servicios/userServices";
    }

    @RequestMapping(value = "/saveuserservice", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> crearServicio(UserService serv) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            dao.persist(serv);
            body.put("success", true);
            return body;
        } catch (Exception e) {
        }
        body.put("success", false);
        return body;
    }

    @RequestMapping(value = "/listuserservice", method = RequestMethod.GET)
    public @ResponseBody
    List<UserService> listarUserServices() {
        return dao.find(UserService.class);
    }

    @RequestMapping(value = "/registrarparametro", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> registrarParametro(Parametro param) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            dao.persist(param);
            body.put("success", true);
            return body;
        } catch (Exception e) {
        }
        body.put("success", false);
        return body;
    }

    @RequestMapping(value = "/listaparametros")
    public @ResponseBody
    List<Parametro> listarParametros(@RequestParam Integer servicio_id) {
        return dao.get(UserService.class, servicio_id).getParametros();
    }
}
