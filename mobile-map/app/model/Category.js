/**
 * @class Event
 * @extends Ext.data.Model
 * 
 * 
 */
Ext.define('Mayfest.model.Category', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        	{name: "term_id",			type: "int"},
        	{name: "term_group", 		type: "int"},
        	{name: "name",				type: "string"},
        	{name: "parent", 			type: "int"},
        	{name: "slug", 				type: "string"},
        	{name: "taxonomy", 			type: "string"},
        	{name: "term_taxonomy_id", 	type: "int"},
        	{name: "leaf",				type: "bool"},
        	{name: 'raw_id',							type: "int"	}
//        	{	name: 'raw_id',
//        		type: 'int',
//        		convert: function(value, record) {
//        			return record.data.id;	
//        		}
//        	}
        ]
    }       

});
