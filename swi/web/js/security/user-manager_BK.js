/**
 * Sitmax ExtJS UI
 * Copyright(c) 2011-2012 ICG Inc.
 * @author Johns Castillo Valencia
 */
Ext.ns('com.icg.UserManager');
[
    {"nombre": "NewWebService", 
        "puertos": [
            {"nombre": "NewWebServicePort", 
                "operaciones": [
                    {
                        "nombre": "hello", 
                        "request": {"element": [{"name": "name", "type": "string"}]}, 
                        "response": {"element": [{"name": "return", "type": "string"}]}}, 
                    {"nombre": "sumar", 
                        "request": {"element": [{"name": "sumando_a", "type": "int"}, {"name": "sumando_b", "type": "int"}]}, "response": {"element": [{"name": "return", "type": "string"}]}}]}]}]