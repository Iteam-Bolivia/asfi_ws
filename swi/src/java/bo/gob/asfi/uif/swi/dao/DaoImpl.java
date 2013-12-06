/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.dao;

import bo.gob.asfi.uif.swi.model.UserService;
import bo.gob.asfi.uif.swi.model.Usuario;
import java.io.Serializable;
import java.util.List;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author John
 */
@Repository
public class DaoImpl implements Dao {

    @Autowired
    SessionFactory sessionFactory;

    @Transactional
    public void persist(Object entity) {
        this.sessionFactory.getCurrentSession().save(entity);
    }

    @Transactional
    public void update(Object entity) {
        this.sessionFactory.getCurrentSession().merge(entity);
    }

    @Transactional
    public void persist(Object[] entities) {
        for (Object entity : entities) {
            this.sessionFactory.getCurrentSession().save(entity);
        }
    }

    @Transactional
    public void remove(Object entity) {
        this.sessionFactory.getCurrentSession().delete(entity);
    }

    @Transactional(readOnly = true)
    public <T> List<T> find(Class<T> entityClass) {
        return this.sessionFactory.getCurrentSession().createCriteria(entityClass).list();
    }

    @Transactional(readOnly = true)
    public <T> List<T> findAll(Class<T> entityClass) {
        return this.sessionFactory.getCurrentSession().createQuery("from " + entityClass.getName()).list();
    }

    @Transactional(readOnly = true)
    public <T> T load(Class<T> entityClass, Serializable id) {
        return (T) this.sessionFactory.getCurrentSession().load(entityClass, id);
    }

    @Transactional(readOnly = true)
    public <T> T get(Class<T> entityClass, Serializable id) {
        return (T) this.sessionFactory.getCurrentSession().get(entityClass, id);
    }

    @Transactional(readOnly = true)
    public <T> List<T> find(String sql) {
        return this.sessionFactory.getCurrentSession().createSQLQuery(sql).list();
    }

    @Transactional(readOnly = true)
    public <T> T getUsuarioByUsername(String username) {
        return (T) this.sessionFactory.getCurrentSession().createCriteria(Usuario.class)
                .add(Restrictions.eq("usuario", username)).uniqueResult();
    }

//    @Transactional(readOnly = true)
//    public <T> T getServiciosPorUsuario(Integer id) {
//        return (T) this.sessionFactory.getCurrentSession().createCriteria(UserService.class)
//                .add(Restrictions.eq("id", id)).list();
//    }

    @Transactional
    public void setServicesToUser(Integer usuario_id, Integer servicio_id) {
        Usuario u = load(Usuario.class, usuario_id);
        u.addServicices(load(UserService.class, servicio_id));
        update(u);
    }

    @Transactional(readOnly = true)
    public List<UserService> getUserServices(Integer usuario_id) {
        List<UserService> lst = get(Usuario.class, usuario_id).getServicios();
        for(UserService us : lst) {
            us.getParametros();            
        }
        return lst;
    }
    
    @Transactional(readOnly = true)
    public List<UserService> getUserNotServices(Integer usuario_id) {
        return this.sessionFactory.getCurrentSession().createQuery("select from Usuario "
                + "u.id left join UserService us.id on u.id=us.id").list();
                //createCriteria(UserService.class)
                //.add(Restrictions.eq("usuario", username)).uniqueResult();
        //return lst;
    }
}
