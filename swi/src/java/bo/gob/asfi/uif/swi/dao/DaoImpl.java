/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.dao;

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
}
