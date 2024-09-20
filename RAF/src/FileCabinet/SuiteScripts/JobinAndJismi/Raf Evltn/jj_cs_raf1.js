/**
 * 
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
 * 
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search','N/email'],
/**
 * @param{record} record
 * @param{search} search
 */
function(record, search, email) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
        
        

    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
        
        try{
            if (scriptContext.sublistId == 'salesordersublist')
            {
        let currentRecord = scriptContext.currentRecord
        let itemName = currentRecord.getCurrentSublistText({
            sublistId : 'salesordersublist',
            fieldId : 'custpage_itemname'
        });
        


        var mySearch = search.create({
            title: "Item4",
            type: search.Type.ITEM,
            filters: ['name','is',itemName],
            columns: ['salesdescription','baseprice']
        });
        let searchResult = mySearch.run().getRange({
            start : 0,
            end : 50
        })

        for (var i = 0; i < searchResult.length; i++) {
            var description = searchResult[i].getValue({
                name: 'salesdescription'
            });
            var basePrice = searchResult[i].getValue({
                name: 'baseprice'
            });
            
        }

        currentRecord.setCurrentSublistValue({
            sublistId: 'salesordersublist',
            fieldId: 'custpage_description',
            value: description,
            ignoreFieldChange: true
        });

        currentRecord.setCurrentSublistValue({
            sublistId: 'salesordersublist',
            fieldId: 'custpage_price',
            value: basePrice,
            ignoreFieldChange: true
        });
    }
}
    catch(error)
    {
        log.debug(error)
    }
    
    

   

        

    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    function postSourcing(scriptContext) {

    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function sublistChanged(scriptContext) {

        

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function lineInit(scriptContext) {

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(scriptContext) {

        try{
        let currentRecord = scriptContext.currentRecord;
        let quantity = currentRecord.getCurrentSublistText({
            sublistId : 'salesordersublist',
            fieldId : 'custpage_quantity'
        });
        let basePrice = currentRecord.getCurrentSublistText({
            sublistId : 'salesordersublist',
            fieldId : 'custpage_price'
        });
        
        let total = quantity * basePrice;

    currentRecord.setCurrentSublistValue({
        sublistId: 'salesordersublist',
        fieldId: 'custpage_total',
        value: total,
        ignoreFieldChange: true
    });
}
catch(error)
{
    log.debug(error)
}
return true;

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {

        try{
        let currentRecord = scriptContext.currentRecord;
        let itemName = currentRecord.getSublistValue({
            sublistId : 'salesordersublist',
            fieldId : 'custpage_itemname',
            line : 0
        });
        let itemquantity = currentRecord.getSublistValue({
            sublistId : 'salesordersublist',
            fieldId : 'custpage_quantity',
            line : 0
        });
        let customerEmail = currentRecord.getText('email');
        let customerName = currentRecord.getText('firstname');
        
        let quantity = currentRecord.getText('custpage_quantity')
        
        var mySearch = search.create({
            title: "Customer 1",
            type: search.Type.CUSTOMER,
            filters: ['email','is',customerEmail],
            columns: ['internalid']
        });
        let searchResult = mySearch.run().getRange({
            start : 0,
            end : 50
        })

        for (var i = 0; i < searchResult.length; i++) {
            var internalId = searchResult[i].getValue({
                name: 'internalid'
            });

        
        }

        
        if (internalId)
        {
            //Creating Customer Record

            let salesOrderRecord = record.create ({
                type : record.Type.SALES_ORDER,
                isDynamic : true
            });

            salesOrderRecord.setValue({
                fieldId : 'entity',
                value : internalId
            });

            salesOrderRecord.setCurrentSublistValue({
                sublistId : 'item',
                fieldId : 'item',
                value : itemName
            });
            salesOrderRecord.setCurrentSublistValue({
                sublistId : 'item',
                fieldId : 'quantity',
                value : itemquantity
            });
            salesOrderRecord.commitLine ({
                sublistId : 'item'
            });

            let recordId = salesOrderRecord.save({
                enableSourcing : false,
                ignoreMandatoryFields : true
            });

            var mySearch = search.create({
                title: "Total",
                type: search.Type.SALES_ORDER,
                filters: ['internalid','is',recordId],
                columns: ['total','salesrep']
            });
            let searchResult = mySearch.run().getRange({
                start : 0,
                end : 2
            })
    
            for (var i = 0; i < searchResult.length; i++) {
                var total = searchResult[i].getValue({
                    name: 'total'
                });
                var salesRep = searchResult[i].getValue({
                    name: 'salesrep'
                });
            }

            if(total > 500)
            {
                
            var mySearch = search.create({
                title: "salesRep",
                type: search.Type.EMPLOYEE,
                filters: ['internalid','is',salesRep],
                columns: ['supervisor']
            });
            let searchResult = mySearch.run().getRange({
                start : 0,
                end : 2
            });
            for (var i = 0; i < searchResult.length; i++) {
                var supervisorId = searchResult[i].getValue({
                    name: 'supervisor'
                });     
            }
            var mySearch = search.create({
                title: "Supervisor",
                type: search.Type.EMPLOYEE,
                filters: ['internalid','is',supervisorId],
                columns: ['email']
            });
            let searchResults = mySearch.run().getRange({
                start : 0,
                end : 2
            });
            for (var i = 0; i < searchResult.length; i++) {
                var emailId = searchResult[i].getText({
                    name: 'email'
                });   
                alert (emailId);

                    
                // var transactionFile = render.transaction({
                // entityId: recordId,
                // printMode: render.PrintMode.PDF
                // });
                  

                email.send({
                    author: 26,
                    recipients: "abc@gmail.com",
                    subject: 'Sales Order',
                    body: 'Sales Order Created for amount above 500'
                    // attachments:[transactionFile]
                });
                
            
            }
            
            }

            
        }
        else
        {
            //Creating Customer Record

            let customerRecord = record.create ({
                type : record.Type.CUSTOMER,
                isDynamic : true
            });
            customerRecord.setValue({
                fieldId : 'companyname',
                value : customerName
            });
            let customerRecordId = customerRecord.save({
                enableSourcing : false,
                ignoreMandatoryFields : true
            });

            // Creating Sales Order
           
            let salesOrderRecord = record.create ({
                type : record.Type.SALES_ORDER,
                isDynamic : true
            });

            salesOrderRecord.setValue({
                fieldId : 'entity',
                value : internalId
            });

            salesOrderRecord.setCurrentSublistValue({
                sublistId : 'item',
                fieldId : 'item',
                value : itemName
            });
            salesOrderRecord.setCurrentSublistValue({
                sublistId : 'item',
                fieldId : 'quantity',
                value : itemquantity
            });
            salesOrderRecord.commitLine ({
                sublistId : 'item'
            });
            let salesRecordId = salesOrderRecord.save({
                enableSourcing : false,
                ignoreMandatoryFields : true
            });
            
            
            
        }
    }
    catch(error)    
    {
        log.debug(error);
    }

        


    return true;

}

    return {
        // pageInit: pageInit,
        fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // sublistChanged: sublistChanged,
        // lineInit: lineInit,
        // validateField: validateField,
        validateLine: validateLine,
        // validateInsert: validateInsert,
        // validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
