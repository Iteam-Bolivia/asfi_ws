/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.FieldSet;
import bo.gob.asfi.uif.swi.model.FormField;
import bo.gob.asfi.uif.swi.model.Parametro;
import bo.gob.asfi.uif.swi.model.RpiField;
import bo.gob.asfi.uif.swi.model.UserService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.heyma.core.extjs.components.Button;
import org.heyma.core.extjs.components.ExtJSUtils;
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
@RequestMapping(value = "/rpi")
public class RpiController {

    @Autowired
    Dao dao;

    @RequestMapping(value = "/rpi")
    public String rpi() {
        return "servicios/rpi";
    }

    @RequestMapping(value = "/setserviceenabled", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> setServiceEnabled(@RequestParam Integer id) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            UserService us = dao.get(UserService.class, id);
            us.setRpiEnable(!us.getRpiEnable());
            dao.update(us);
            body.put("success", true);
        } catch (Exception e) {
        }
        body.put("success", false);
        return body;
    }

    @RequestMapping(value = "/formserviceitems")
    public @ResponseBody
    List<FieldSet> formServiceItems() {
        List<UserService> lst = dao.findAll(UserService.class);

        return requestFormFiends(lst);
    }

    @RequestMapping(value = "/guardarcampo", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> guardarCampo(RpiField field) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            dao.persist(field);
            //System.out.println(srvfields);
            String[] srvParams = field.getServiceParamsIds().split(":");//srvfields.split(":");
            for (String sp : srvParams) {
                Parametro p = dao.get(Parametro.class, new Integer(sp));
                p.setRpifield(field.getId());
                dao.update(p);
            }
        } catch (Exception e) {
        }
        body.put("success", false);
        return body;
    }

    @RequestMapping(value = "/eliminarcampo", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> eliminarCampo(@RequestParam Integer id) {
        Map<String, Object> body = new HashMap<String, Object>();
        try {
            RpiField rf = dao.get(RpiField.class, id);
            for (String sp : rf.getServiceParamsIds().split(":")) {
                Parametro p = dao.get(Parametro.class, new Integer(sp));
                p.setRpifield(null);
                dao.update(p);
            }
            dao.remove(rf);
            body.put("success", true);
        } catch (Exception e) {
        }
        body.put("success", false);
        return body;
    }

    private List<FieldSet> requestFormFiends(List<UserService> services) {
        List<FieldSet> list = new ArrayList<FieldSet>();
        for (UserService us : services) {
            FieldSet fs = new FieldSet();
            fs.setTitle(us.getNombre());
            fs.setId(us.getId().toString());
            //fs.setCheckboxToggle(true);
            //fs.setCollapsed(!us.getRpiEnable());
            if (us.getRpiEnable()) {
                fs.getButtons().add(new Button("Deshabilitar", "", "delete", 100));
            } else {
                fs.getButtons().add(new Button("Habilitar", "", "create", 100));
            }
            for (Parametro pm : us.getParametros()) {
                FormField ff = new FormField();
                ff.setFieldLabel(pm.getEtiqueta());
                ff.setXtype(ExtJSUtils.attributetypeTOExtJSType(pm.getTipo()));
                ff.setValue(pm.getValordefecto());
                ff.setAllowBlank(!pm.getRequerido());
                fs.getItems().add(ff);
            }
            list.add(fs);
        }
        return list;
    }

    @RequestMapping(value = "/formrpiitems")
    public @ResponseBody
    List<FormField> formRpiItems() {
        List<RpiField> fields = dao.findAll(RpiField.class);

        return RpiController.rpiFormFiends(fields);
    }

    public static List<FormField> rpiFormFiends(List<RpiField> fields) {
        List<FormField> list = new ArrayList<FormField>();
        for (RpiField pm : fields) {
            FormField ff = new FormField();
            ff.setFieldLabel(pm.getEtiqueta());
            ff.setXtype(pm.getTipo());
            ff.setValue(pm.getValordefecto());
            ff.setAllowBlank(!pm.getRequerido());
            ff.setId(pm.getId() + ":rpifield");
            list.add(ff);
        }
        return list;
    }
}
