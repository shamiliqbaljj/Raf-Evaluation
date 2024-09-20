/**
 * 
 * Author : Jobin And Jismi IT Services
 * 
 * Date Created : 20 - September - 2024
 * 
 * Description : Custom Sales Order Creation
 * 
 * 
 * 
 * 
 * 
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],
    
    (serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET')
                {
                    try{
                   createForm();
                    }
                    catch(error)
                    {
                        log,debug(error)
                    }
                   
                    function createForm()
                    {     
                  try{
                    var form = serverWidget.createForm({
                    title: 'Sales Order',
                    });
    
                    form.addField({
                        id: 'firstname',
                        type: serverWidget.FieldType.TEXT,
                        label: 'First Name'
                    }).isMandatory = true;
                    form.addField({
                        id: 'lastname',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Last Name'
                    }).isMandatory = true;
                    form.addField({
                        id: 'email',
                        type: serverWidget.FieldType.EMAIL,
                        label: 'E mail'
                    }).isMandatory = true;
                    form.addField({
                        id: 'phonenumber',
                        type: serverWidget.FieldType.PHONE,
                        label: 'Phone Number'
                    }).isMandatory = true;



                    var subList = form.addSublist({
                        id: 'salesordersublist',
                        type: serverWidget.SublistType.INLINEEDITOR,
                        label: 'Sales Order Sublist',
                    });
                    subList.addField({
                        id: 'custpage_itemname',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Item',
                        source : 'item'
                    });
                    subList.addField({
                        id: 'custpage_description',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Description'
                    });
                    subList.addField({
                        id: 'custpage_quantity',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Quantity'
                    }).isMandatory = true;
                    subList.addField({
                        id: 'custpage_price',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Price'
                    }).isMandatory = true;
                    subList.addField({
                        id: 'custpage_total',
                        type: serverWidget.FieldType.FLOAT,
                        label: 'Total'
                    });
                    form.addSubmitButton({
                        label: "Submit"
                    });
                    scriptContext.response.writePage(form);
                
                    form.clientScriptModulePath = 'SuiteScripts/JobinAndJismi/Raf Evltn/jj_cs_raf1.js';
                }
            
                catch(error)
            {
                log.debug(error)   
            }
        }
            }
        
            


        }

        return {onRequest}

    });
