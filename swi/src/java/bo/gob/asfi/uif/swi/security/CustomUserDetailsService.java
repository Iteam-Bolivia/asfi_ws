/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.security;

import bo.gob.asfi.uif.swi.dao.Dao;
import bo.gob.asfi.uif.swi.model.Usuario;
import java.util.HashSet;
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

    @Autowired
    Dao dao;

    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        System.out.println("user to load swi:" + username);
        Usuario user = dao.getUsuarioByUsername(username);

        if (user == null) {
            System.out.println("user not found");
            throw new UsernameNotFoundException("user not found");
        }

        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;

        CustomUserDetails userDetail = new CustomUserDetails(
                username,
                user.getClave(),
                user.getActivo(),
                accountNonExpired,
                accountNonLocked,
                credentialsNonExpired,
                getRoles(1));

        userDetail.setNombre(user.getNombres());
        userDetail.setApellido(user.getPaterno());

        return userDetail;
    }

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
