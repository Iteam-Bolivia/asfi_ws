/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.security;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author John
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {


    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        System.out.println("user to load lici:" + username);
        Map<String, Object> usr = new HashMap<String, Object>();//service.getExistObject("sys", "usuario", "usuario", username);
        System.out.println(usr);
        if (usr == null) {
            System.out.println("user not found");
            throw new UsernameNotFoundException("user not found");
        }

        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;

        CustomUserDetails user = new CustomUserDetails(
                username,
                (String) usr.get("passwords"),
                (Boolean) usr.get("active"),
                accountNonExpired,
                accountNonLocked,
                credentialsNonExpired,
                getRoles((Integer) usr.get("rol_id")));
        user.setNombre((String) usr.get("usuario_nombre"));
        user.setApellido((String) usr.get("usuario_apellido"));

        //all categorias
        //EntityResult rc = service.find("sys", "categoria", new String[]{"orden"});
        //all funciones
        //EntityResult rf = service.find("sys", "funcion", new String[]{"orden"});

        //funciones rol user
        //SimpleFilter sf = new SimpleFilter();
        //sf.addValue("rol_id", (Integer) usr.get("rol_id"));
        //sf.addANDRestriction(new Restriction("rol_id", Restriction.EQUALS));

        //EntityResult rfu = service.find("sys", "rol_funcion", sf);

        //user.setMenu(buildMenu(rc, rf, rfu));
        return user;
    }

//    private List buildMenu(EntityResult rc, EntityResult rf, EntityResult rfu) {
//        List menu = new ArrayList();
//        for (Map<String, Object> c : rc.getListData()) {
//            List fns = new ArrayList();
//            for (Map<String, Object> f : rf.getListData()) {
//                boolean sw = false;
//                for (Map<String, Object> fu : rfu.getListData()) {
//                    if (f.get("categoria_id").equals(c.get("categoria_id"))) {
//                        if (fu.get("funcion_id").equals(f.get("funcion_id"))) {
//                            sw = true;
//                        }
//                    }
//                }
//                if (sw) {
//                    fns.add(f);
//                }
//            }
//            if (fns.size() > 0) {
//                c.put("funciones", fns);
//                menu.add(c);
//            }
//        }
//        return menu;
//    }

    private Set<String> getRoles(Integer role) {
        Set<String> roles = new HashSet<String>();
        if (role.intValue() == 1) {
            roles.add("ROLE_ADMINISTRADOR");
        } else if (role.intValue() == 2) {
            roles.add("ROLE_FUNCIONARIO");
        } else if (role.intValue() == 3) {
            roles.add("ROLE_SUPERVISOR");
        } else if (role.intValue() == 4) {
            roles.add("ROLE_OPERADOR");
        }
        return roles;
    }
}
