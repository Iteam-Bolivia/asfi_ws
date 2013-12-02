/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif.user;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Parametro;
import bo.gob.asfi.uif.swi.model.UserService;
import java.util.ArrayList;
import java.util.Collection;
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

        List<UserService> lst = dao.findAll(UserService.class);
        List<UserService> lst2 = new ArrayList<UserService>();
        for (UserService us : lst) {
            System.out.println(us.getNombre());
            UserService nus = new UserService();
            nus.setId(us.getId());
            nus.setNombre(us.getNombre());
            lst2.add(nus);
        }

        return lst2;
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

    @RequestMapping(value = "/updateparam", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> actualizarParametro(Parametro param) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {          
            dao.update(param);
            body.put("success", true);
            return body;
        } catch (Exception e) {
        }
        body.put("success", false);
        return body;
    }

    @RequestMapping(value = "/listaparametros")
    public @ResponseBody
    Collection<Parametro> listarParametros(@RequestParam Integer servicio_id) {

        Collection<Parametro> lst = dao.get(UserService.class, servicio_id).getParametros();

        List<Parametro> lst2 = new ArrayList<Parametro>();
        for (Parametro pm : lst) {
            System.out.println(pm.getNombre());
            Parametro npm = new Parametro();
            npm.setId(pm.getId());
            npm.setNombre(pm.getNombre());
            npm.setEtiqueta(pm.getEtiqueta());
            npm.setRequerido(pm.getRequerido());
            npm.setTipo(pm.getTipo());
            lst2.add(npm);
        }

        return lst2;
    }
}
