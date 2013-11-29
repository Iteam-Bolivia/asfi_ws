/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package xmlparser;

import com.predic8.plugin.membrane_client.creator.CompositeCreatorContext;
import com.predic8.schema.creator.AbstractSchemaCreator;
import com.predic8.wsdl.AbstractSOAPBody;
import com.predic8.wsdl.AbstractSOAPHeader;
import com.predic8.wsdl.BindingElement;
import com.predic8.wsdl.BindingOperation;
import com.predic8.wsdl.Definitions;
import com.predic8.wsdl.Message;
import com.predic8.wsdl.Operation;
import com.predic8.wsdl.Part;
import java.util.List;

/**
 *
 * @author John
 */
public class SoapCreatorUtil extends AbstractSchemaCreator<CompositeCreatorContext> {

    private Definitions definitions;

    public SoapCreatorUtil(Definitions definitions) {
        this.definitions = definitions;
    }

    public void buildComposite(String portTypeName, String operationName,
            String bindingName) {


        Operation operation = definitions.getOperation(operationName, portTypeName);
        BindingOperation bindingOperation = definitions.getBinding(bindingName).getOperation(operationName);

        createHeaders(bindingOperation, operation.getInput().getMessage());

        for (BindingElement object : bindingOperation.getInput().getBindingElements()) {
            // TODO Attention of SOAP header
            System.out.println(object);
            if (object instanceof AbstractSOAPBody) {
                handleMsgParts(((AbstractSOAPBody) object).getParts());
            }
        }

        //CreatorUtil.layoutScrolledComposites(scrollComp, root);
    }

    private void createHeaders(BindingOperation bOp, Message msg) {
        for (AbstractSOAPHeader header : bOp.getInput().getSOAPHeaders()) {
            //definitions.getElement(msg.getPart(header.getPart()))
           //         .create(this, new CompositeCreatorContext());
            //System.out.println("header: "+ header.getPartName());
        }
    }

    private void handleMsgParts(List<Part> parts) {
        for (Part part : parts) {
            //definitions.getElement(part.getElement()).create(this, new CompositeCreatorContext());
            System.out.println(part);
        }
    }
}
