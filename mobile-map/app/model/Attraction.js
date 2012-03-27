/**
 * @class Attraction
 * @extends Ext.data.Model
 * 
 * 
 */
Ext.define('Mayfest.model.Attraction', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        	{name: "id",								type: "int"},
        	{name: "content", 							type: "string"},
        	{name: "title",								type: "string"},
        	{name: "mayfest_att_first_name", 			type: "string"},
        	{name: "mayfest_att_last_name", 			type: "string"},
        	{name: "mayfest_att_first_name_partner", 	type: "string"},
        	{name: "mayfest_att_last_name_partner", 	type: "string"},
        	{name: "mayfest_att_city", 					type: "string"},
        	{name: "mayfest_att_state", 				type: "string"},
        	{	name: "mayfest_ml_uid",
        		type: "int"
//        		convert: function(v, record) {
//                    //return parseInt(record.data.funded_amount / record.data.loan_amount * 100, 10);
//                	//console.log('converting', v, record);
//                	return parseInt(v, 10);
//                }
            },
        	
        	{name: "attraction_category",				type: "auto"},
        	{name: "genre",								type: "auto"},
        	{name: "thumbnail",							type: "auto"}


			//should work, but throws known bug
			//	http://www.sencha.com/forum/showthread.php?184392-Conditional-hiding-of-Disclosure-icon-in-list&p=745739&viewfull=1        	
//        	{name: "disclosure",	
//        	 type: "boolean",	
//        	 convert: function( value, record ){
//        		console.log( value, record, record.data.mayfest_ml_uid );
//        		return ( record.data.mayfest_ml_uid ? true : false );
//        	 }
//        	}
        ]
    }       

});
