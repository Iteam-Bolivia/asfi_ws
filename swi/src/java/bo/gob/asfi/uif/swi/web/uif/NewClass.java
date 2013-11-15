/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package bo.gob.asfi.uif.swi.web.uif;

/**
 *
 * @author John
 */
public class NewClass {
    public static void main(String[] args) {
        try {
            //RestClient rc = new RestClient();
            RestClient.doGet("/searchfields");
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
