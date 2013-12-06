/*
 * ICG SRL - International Consulting Group 2011
 */
package bo.gob.asfi.uif.swi.web.menu;

import bo.gob.asfi.uif.swi.security.CustomUserDetails;
import com.google.gson.Gson;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;
import org.heyma.menu.Menu;
import org.heyma.menu.Module;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @since 30-01-2012
 * @author Johnston Castillo Valencia
 * @email: john.gnu@gmail.com
 */
@Controller
//@Scope("session")
@RequestMapping(value = "/menu")
public class MenuController {

    private void menuFromXML(String role) {
        XStream xstream = new XStream(new DomDriver());
        xstream.alias("menu", Menu.class);
        xstream.alias("module", Module.class);
        if (role.equals("admin_uif")) {
            InputStream in = this.getClass().getClassLoader().getResourceAsStream("bo/gob/asfi/uif/swi/web/menu/menu.xml");
            this.menu = new Menu();
            this.menu = (Menu) xstream.fromXML(in);
        } else {
            InputStream in = this.getClass().getClassLoader().getResourceAsStream("bo/gob/asfi/uif/swi/web/menu/menuUser.xml");
            this.menu = new Menu();
            this.menu = (Menu) xstream.fromXML(in);
        }
    }
    private Menu menu;

    public MenuController() {
//        XStream xstream = new XStream(new DomDriver());
//        xstream.alias("menu", Menu.class);
//        xstream.alias("module", Module.class);
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        Gson g = new Gson();
//        System.out.println(g.toJson(auth.getPrincipal()));
//        InputStream in = this.getClass().getClassLoader().getResourceAsStream("bo/gob/asfi/uif/swi/web/menu/menu.xml");
//        
//        Menu menux = (Menu) xstream.fromXML(in);
//        this.menu = menux;
    }

    @RequestMapping(value = "/jsonmenu", method = RequestMethod.GET)
    public @ResponseBody
    List<Menu> menu() {
        return this.menu.getItems();
    }

    @RequestMapping(value = "/menu", method = RequestMethod.GET)
    public String menuJS(Map out) {
        //Gson gson = new Gson();
        System.out.println("Loading menu from Atribute...");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        Gson g = new Gson();
//        System.out.println(g.toJson(auth.getPrincipal()));
        if (auth.getPrincipal() instanceof CustomUserDetails) {
            CustomUserDetails ud = (CustomUserDetails) auth.getPrincipal();
            this.menuFromXML(ud.getRole());

            //out.put("json", gson.toJson(this.menu.getItems()));
            JsonConfig jsonConfig = new JsonConfig();
            jsonConfig.setJsonPropertyFilter(new PropertyFilter() {
                public boolean apply(Object source, String name, Object value) {
                    if (value == null) {
                        return true;
                    }
                    return false;
                }
            });

            JSONArray jsonArray = JSONArray.fromObject(this.menu.getItems(), jsonConfig);
            out.put("json", jsonArray);
        }
        return "ui/menu/menuObject";
    }

    @RequestMapping(value = "/menumng", method = RequestMethod.GET)
    public String menuManager() {
        return "ui/menu/menuManager";
    }

    @RequestMapping(value = "/load")
    public @ResponseBody
    Map<String, ? extends Object> loadMenu() {
        Map<String, Object> data = new HashMap<String, Object>();
        try {
            System.out.println("Loading menu from XML...");
            //this.menuFromXML();
            data.put("success", Boolean.TRUE);
        } catch (Exception e) {
            e.printStackTrace();
            data.put("errorMessage", e.getMessage());
            data.put("success", Boolean.FALSE);
        }
        return data;
    }

    @RequestMapping(value = "/menu/persist", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, ? extends Object> persist(Menu menu) {
        Map<String, Object> data = new HashMap<String, Object>();
        try {
            this.addMenu(menu);

            System.out.println(menu.getText());
            data.put("success", Boolean.TRUE);
        } catch (Exception e) {
            data.put("errorMessage", e.getMessage());
            data.put("success", Boolean.FALSE);
        }
        return data;
    }

    private void addMenu(Menu menu) {
        boolean isEquals = false;
        int index = 0;
        for (Menu mn : this.menu.getItems()) {
            if (mn.getId().equals(menu.getId())) {
                isEquals = true;
                index = this.menu.getItems().indexOf(mn);
            }
        }
        if (!isEquals) {
            this.menu.getItems().add(menu);
        } else {
            this.menu.getItems().set(index, menu);
        }
    }
}
