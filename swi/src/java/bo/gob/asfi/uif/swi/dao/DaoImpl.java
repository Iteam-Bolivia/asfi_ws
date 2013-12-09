/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.dao;

import bo.gob.asfi.uif.swi.model.Bitacora;
import bo.gob.asfi.uif.swi.model.UserService;
import bo.gob.asfi.uif.swi.model.Usuario;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.hibernate.Criteria;
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

    @Transactional
    public void setDeleteServiceToUser(Integer usuario_id, Integer servicio_id) {
        Usuario u = load(Usuario.class, usuario_id);
        List<UserService> lst2 = new ArrayList<UserService>();
        for (UserService us : u.getServicios()) {
            if (!us.getId().equals(servicio_id)) {
                lst2.add(us);
            }
        }
        u.setServicios(lst2);
        update(u);
    }

    @Transactional(readOnly = true)
    public List<UserService> getUserServices(Integer usuario_id) {
        List<UserService> lst = get(Usuario.class, usuario_id).getServicios();
        for (UserService us : lst) {
            us.getParametros();
        }
        return lst;
    }

    @Transactional(readOnly = true)
    public List<UserService> getUserOnlyServices(Integer usuario_id) {
        List<UserService> lst = get(Usuario.class, usuario_id).getServicios();
        for (UserService us : lst) {
            us.setParametros(null);
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

    @Transactional(readOnly = true)
    public <T> T getBitacoraBusqueda1(String usuario, String servicio, Date fechai, Date fechaf) {

        Criteria criterio1 = this.sessionFactory.getCurrentSession().createCriteria(Bitacora.class);

        if (!"[TODOS]".equals(usuario)) {
            criterio1.add(Restrictions.eq("usuario", usuario));
        }
        if (!"[TODOS]".equals(servicio)) {
            criterio1.add(Restrictions.eq("servicio", servicio));
        }

        criterio1.add(Restrictions.between("fecha", fechai, fechaf));
        //if(fechai.toString()!="01/01/1975")
        //{
        // criterio1.add(Restrictions.ge("fecha",fechai));

        /* }
         if(fechaf.toString()!="01/01/1975")
         {*/
        //criterio1.add(Restrictions.le("fecha",fechaf));

        // }
        List result = criterio1.list();
        return (T) result;
    }
}
