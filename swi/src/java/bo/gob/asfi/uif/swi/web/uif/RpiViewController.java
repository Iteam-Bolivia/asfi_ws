/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.FormField;
import bo.gob.asfi.uif.swi.model.Parametro;
import bo.gob.asfi.uif.swi.model.RpiField;
import bo.gob.asfi.uif.swi.model.RpiResultado;
import bo.gob.asfi.uif.swi.model.UserService;
import bo.gob.asfi.uif.swi.security.CustomUserDetails;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
@RequestMapping(value = "/rpiview")
public class RpiViewController {

    @Autowired
    Dao dao;

    @RequestMapping(value = "/rpiview")
    public String rpiView() {
        return "servicios/rpiview";
    }

    @RequestMapping(value = "/formrpiitems")
    public @ResponseBody
    Collection<FormField> formRpiItems() {
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

        Collection<Parametro> parametros = new ArrayList<Parametro>();
        for (UserService us : lst) {
            if (us.getRpiEnable()) {
                //extfields.addAll(rpiFormFiendsFromParams(us.getParametros()));
                parametros.addAll(us.getParametros());
            }
        }
        return rpiFormFiendsFromParams(parametros);
    }

    public Collection<FormField> rpiFormFiendsFromParams(Collection<Parametro> parametros) {
        //Set<FormField> list = new HashSet<FormField>();
        Map<String, FormField> lst = new HashMap<String, FormField>();
        for (Parametro pm : parametros) {
            if (pm.getRpifield() == null) {
                FormField ff = new FormField();
                ff.setFieldLabel(pm.getEtiqueta());
                ff.setXtype(ExtJSUtils.attributetypeTOExtJSType(pm.getTipo()));
                ff.setValue(pm.getValordefecto());
                ff.setAllowBlank(!pm.getRequerido());
                ff.setName(pm.getServicio().getId() + ":" + pm.getNombre());
                //list.add(ff);
                lst.put(ff.getName(), ff);
            } else {
                RpiField rf = dao.get(RpiField.class, pm.getRpifield());
                FormField ff = new FormField();
                ff.setFieldLabel(rf.getEtiqueta());
                ff.setXtype(rf.getTipo());
                ff.setValue(rf.getValordefecto());
                ff.setAllowBlank(!rf.getRequerido());
                ff.setName("rpifield-" + rf.getId());
                //ff.setId(rf.getId() + ":rpifield");
                //list.add(ff);
                lst.put(ff.getName(), ff);
            }
        }
        return lst.values();
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

        List<UserService> lst2 = new ArrayList<UserService>();
        for (UserService us : lst) {
            if (us.getRpiEnable()) {
                us.setParametros(listarParametros(us.getId()));
                lst2.add(us);
            }
        }

        return lst2;
    }

    private Collection<Parametro> listarParametros(@RequestParam Integer servicio_id) {
        Collection<Parametro> lst = dao.get(UserService.class, servicio_id).getParametros();
        for (Parametro pm : lst) {
            pm.setServicio(null);
        }
        return lst;
    }

    @RequestMapping(value = "/guardarrpi", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> guardarRpi(RpiResultado rpi) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            rpi.setUsuario(auth.getName());
            rpi.setFecha(new Date());
            dao.persist(rpi);
            body.put("success", true);
        } catch (Exception e) {
        }
        body.put("success", false);
        return body;
    }

    @RequestMapping(value = "/listarpis", method = RequestMethod.GET)
    public @ResponseBody
    List<RpiResultado> listaRpiS() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return dao.findAll(RpiResultado.class);
    }
}
