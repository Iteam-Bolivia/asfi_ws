/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.FormField;
import bo.gob.asfi.uif.swi.model.Parametro;
import bo.gob.asfi.uif.swi.model.RpiField;
import bo.gob.asfi.uif.swi.model.UserService;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.heyma.core.extjs.components.ExtJSUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
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
    List<FormField> formRpiItems() {
        List<RpiField> fields = dao.findAll(RpiField.class);

        List<FormField> extfields = RpiController.rpiFormFiends(fields);

        List<UserService> uservices = dao.findAll(UserService.class);
        for (UserService us : uservices) {
            if (us.getRpiEnable()) {
                extfields.addAll(rpiFormFiendsFromParams(us.getParametros()));
            }
        }
        return extfields;
    }

    public List<FormField> rpiFormFiendsFromParams(Collection<Parametro> parametros) {
        List<FormField> list = new ArrayList<FormField>();
        for (Parametro pm : parametros) {
            if (pm.getRpifield() == null) {
                FormField ff = new FormField();
                ff.setFieldLabel(pm.getEtiqueta());
                ff.setXtype(ExtJSUtils.attributetypeTOExtJSType(pm.getTipo()));
                ff.setValue(pm.getValordefecto());
                ff.setAllowBlank(!pm.getRequerido());
                list.add(ff);
            }
        }
        return list;
    }
}
