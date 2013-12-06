/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.FormField;
import bo.gob.asfi.uif.swi.model.Parametro;
import bo.gob.asfi.uif.swi.model.UserService;
import bo.gob.asfi.uif.swi.security.CustomUserDetails;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.heyma.core.extjs.components.ExtJSUtils;
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
 * @author John
 */
@Controller
@RequestMapping(value = "/paneldeservicios")
public class PanelDeServiciosController {

    @Autowired
    Dao dao;

    @RequestMapping(value = "/paneldeservicios")
    public String panelDeServicios() {
        return "individual/paneldeservicios";
    }

    @RequestMapping(value = "/listaservicios", method = RequestMethod.GET)
    public @ResponseBody
    List<Map<String, Object>> listarUserServices() {

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

        List<Map<String, Object>> samples = new ArrayList<Map<String, Object>>();
        System.out.println(lst.size());
        for (UserService us : lst) {
            us.setParametros(null);
            //set view
            Map<String, Object> itemserv = new HashMap<String, Object>();
            itemserv.put("text", us.getNombre());
            itemserv.put("desc", us.getDescripcion());
            itemserv.put("icon", "desktop.gif");
            itemserv.put("url", us.getRouter());
            itemserv.put("id", us.getId());
            samples.add(itemserv);
        }
        System.out.println(samples.size());
        List<Map<String, Object>> services = new ArrayList<Map<String, Object>>();
        Map item = new HashMap();
        item.put("title", "Servicios del sistema");
        item.put("samples", samples);
        services.add(item);
        return services;
    }

    @RequestMapping(value = "/formserviceitems")
    public @ResponseBody
    List<FormField> formServiceItems(@RequestParam(value = "id") Integer id) {
        UserService us = dao.get(UserService.class, id);

        return PanelDeServiciosController.requestFormFiends(us.getParametros());
    }

    public static List<FormField> requestFormFiends(Collection<Parametro> parametros) {
        List<FormField> list = new ArrayList<FormField>();
        for (Parametro pm : parametros) {
            FormField ff = new FormField();
            ff.setFieldLabel(pm.getEtiqueta());
            ff.setXtype(ExtJSUtils.attributetypeTOExtJSType(pm.getTipo()));
            ff.setValue(pm.getValordefecto());
            ff.setName(pm.getNombre());
            ff.setAllowBlank(!pm.getRequerido());
            list.add(ff);
        }
        return list;
    }
}
