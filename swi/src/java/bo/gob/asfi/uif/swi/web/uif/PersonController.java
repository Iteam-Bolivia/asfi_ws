/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

import bo.gob.asfi.uif.swi.services.IPersonService;
import bo.gob.asfi.uif.swi.services.Person;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author John
 */
@Controller
@RequestMapping("api")
public class PersonController {

    @Autowired
    IPersonService personService;
    
    @RequestMapping("person/random")
    @ResponseBody
    public Person randomPerson() {
        return personService.getRandom();
    }

    @RequestMapping("person/{id}")
    @ResponseBody
    public Person getById(@PathVariable Long id) {
        return personService.getById(id);
    }

    // same as above method, just showing different URL mapping
    @RequestMapping(value = "person", params = "id")
    @ResponseBody
    public Person getByIdFromParam(@RequestParam Long id) {
        return personService.getById(id);
    }

    // handles person form submit
    @RequestMapping(value = "person", method = RequestMethod.POST)
    @ResponseBody
    public String savePerson(Person person) {
        personService.save(person);
        return "Saved person: " + person.toString();
    }
}