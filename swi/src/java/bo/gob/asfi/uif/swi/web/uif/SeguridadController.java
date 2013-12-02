/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Usuario;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author John
 */
@Controller
public class SeguridadController {

    @Autowired
    Dao dao;

    @RequestMapping(value = "/crearusuario", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> crearUsuario(Usuario usuario) {
        Map<String, Object> body = new HashMap<String, Object>();
        dao.persist(usuario);
        body.put("success", true);
        return body;
    }

    @RequestMapping(value = "/guardarusuario", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> guardarUsuario(Usuario usuario) {
        Map<String, Object> body = new HashMap<String, Object>();

        Usuario u = dao.get(Usuario.class, usuario.getId());
        u.setNombres(usuario.getNombres());
        u.setPaterno(usuario.getPaterno());
        u.setMaterno(usuario.getMaterno());
        u.setCargo(usuario.getCargo());
        u.setEmail(usuario.getEmail());
        u.setDescripcion(usuario.getDescripcion());

        dao.update(u);
        body.put("success", true);
        return body;
    }

    @RequestMapping(value = "/changepassword", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> changePassword(Usuario usuario) {
        Map<String, Object> body = new HashMap<String, Object>();

        Usuario u = dao.get(Usuario.class, usuario.getId());
        u.setClave(usuario.getClave());

        dao.update(u);
        body.put("success", true);
        return body;
    }

    @RequestMapping(value = "/disableaccount", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> disableAccount(Usuario usuario) {
        Map<String, Object> body = new HashMap<String, Object>();

        Usuario u = dao.get(Usuario.class, usuario.getId());
        u.setActivo(!u.getActivo());

        dao.update(u);
        body.put("success", true);
        return body;
    }

    @RequestMapping(value = "/listarusuarios", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, ? extends Object> listarUsuarios() {
        Map<String, Object> body = new HashMap<String, Object>();
        List<Usuario> lst = dao.findAll(Usuario.class);
        
        for(Usuario u: lst) {
            u.setServicios(null);
        }
        
        body.put("data", lst);
        return body;
    }
}
