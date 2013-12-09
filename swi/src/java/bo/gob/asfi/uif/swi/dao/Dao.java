/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.dao;

import bo.gob.asfi.uif.swi.model.UserService;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 *
 * @author John
 */
public interface Dao {

    public void persist(Object entity);
    
    public void update(Object entity);

    public void persist(Object[] entities);

    public void remove(Object entity);

    public <T> List<T> find(Class<T> entityClass);

    public <T> T load(Class<T> entityClass, Serializable id);

    public <T> T get(Class<T> entityClass, Serializable id);

    public <T> List<T> find(String sql);
    
    public <T> List<T> findAll(Class<T> entityClass);
    
    public <T> T getUsuarioByUsername(String username);

//    public <T> T getServiciosPorUsuario(Integer id);
    
    public void setServicesToUser(Integer usuario_id, Integer servicio_id);
    
    public void setDeleteServiceToUser(Integer usuario_id, Integer servicio_id);
    
    public List<UserService> getUserServices(Integer usuario_id);
    
    public List<UserService> getUserOnlyServices(Integer usuario_id);
    
    public List<UserService> getUserNotServices(Integer usuario_id);
    
    public <T> T getBitacoraBusqueda1(String usuario, String servicio, Date fechai, Date fechaf);
}
