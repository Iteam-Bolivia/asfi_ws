/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.security;

import bo.gob.asfi.uif.swi.model.Usuario;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author John
 */
//@Controller
@RequestMapping(value = "/sss")
public class UsuarioController {

//    @Autowired
//    IEntityServices service;
    @PreAuthorize("hasRole('ROLE_ADMINISTRADOR')")
    @RequestMapping(value = "/administrarusuarios")
    public String administrarUsuarios(Model model) {
        //EntityResult r = service.find("sys", "usuario", new String[] {"usuario_nombre","usuario_apellido"});
        //model.addAttribute("usuarios", r.getListData());
        return "/usuarios/AdministrarUsuario";
    }

    @PreAuthorize("hasRole('ROLE_ADMINISTRADOR')")
    @RequestMapping(value = "/formusuario")
    public String formUsuario() {
        return "/usuarios/RegistrarUsuario";
    }

    @PreAuthorize("hasRole('ROLE_ADMINISTRADOR')")
    @RequestMapping(value = "/registrarusuario", method = RequestMethod.POST)
    public String registrarUsuario(Usuario usuario) {


        return "redirect:/formusuario";
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/formcontrasenia")
    public String password() {
        return "/seguridad/ChangePassword";
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/changepassword")
    public String changePassword(Model model, @RequestParam String usuario, @RequestParam String old_password, @RequestParam String new_password) {

        return "/seguridad/ChangePassword";
    }

    public String hashMD5Password(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes());

        byte byteData[] = md.digest();
        //convert the byte to hex format method 1
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < byteData.length; i++) {
            sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }

        return sb.toString();
    }
}
