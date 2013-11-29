/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.services;

/**
 *
 * @author John
 */
public interface IPersonService {
    Person getRandom();
    Person getById(Long id);
    void save(Person person);
}
