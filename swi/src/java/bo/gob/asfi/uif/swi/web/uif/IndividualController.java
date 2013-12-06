/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Parametro;
import bo.gob.asfi.uif.swi.model.UserService;
import bo.gob.asfi.uif.swi.security.CustomUserDetails;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
@RequestMapping(value = "/individual")
public class IndividualController {

    @Autowired
    Dao dao;

    @RequestMapping(value = "/individual")
    public String individual() {
        return "individual/individual";
    }

    @RequestMapping(value = "/guardarparametros", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> guardarParametro(Parametro parametro) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            dao.update(parametro);
            body.put("success", true);
        } catch (Exception e) {
            body.put("success", false);
            e.printStackTrace();
        }
        return body;
    }

    @RequestMapping(value = "/listaservicios", method = RequestMethod.GET)
    public @ResponseBody
    List<UserService> listaServicioss() {
        List<UserService> lst = dao.findAll(UserService.class);
        for (UserService us : lst) {
            us.setParametros(listarParametros(us.getId()));
        }
        return lst;
    }

    @RequestMapping(value = "/listaserviciosusuario", method = RequestMethod.GET)
    public @ResponseBody
    List<UserService> listaServiciosUsuario() {

        List<UserService> lst = null;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails ud = (CustomUserDetails) auth.getPrincipal();
            if (ud.getRole().equals("admin_uif")) {
                lst = dao.findAll(UserService.class);
            } else {
                lst = dao.getUserServices(ud.getId());
            }
        } else {
            lst = dao.findAll(UserService.class);
        }
        //List<UserService> lst = dao.findAll(UserService.class);        

        for (UserService us : lst) {
            us.setParametros(listarParametros(us.getId()));
        }
        return lst;
    }

    @RequestMapping(value = "/listaparametros")
    public @ResponseBody
    Collection<Parametro> listarParametros(@RequestParam Integer servicio_id) {
        Collection<Parametro> lst = dao.get(UserService.class, servicio_id).getParametros();
        for (Parametro pm : lst) {
            pm.setServicio(null);
        }
        return lst;
    }
}
