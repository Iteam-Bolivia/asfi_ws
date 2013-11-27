/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.model;

import java.util.List;
import org.hibernate.Session;

/**
 *
 * @author John
 */
public class Test {

    public static void main(String[] args) {

        System.out.println("Hibernate one to many (Annotation)");
        Session session = HibernateUtil.getSessionFactory().openSession();

        session.beginTransaction();

        List<UserService> lst = session.createCriteria(UserService.class).list();
        for(UserService us : lst) {
            System.out.println(us.getNombre());            
            for(Parametro p : us.getParametros()) {
                System.out.println(p.getNombre());
                System.out.println(p.getServicio());
            }
        }

        //session.save();

        session.getTransaction().commit();
        System.out.println("Done");
    }
}
