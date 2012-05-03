/**
 * @class Event
 * @extends Ext.data.Model
 * 
 * 
 */
Ext.define('Mayfest.model.Event', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        	{name: "id",						type: "int"},
        	{name: "content", 					type: "string"},
        	{name: "title",						type: "string"},
        	{name: "mayfest_event_day", 		type: "string"},
        	{name: "mayfest_event_time", 		type: "string"},
        	{name: "mayfest_attraction_uid",	type: "int"},
        	
        	{	name: 'date',
        		type: 'date',
        		dateFormat: 'm-d-Y g:iA',
        		convert: function(value, record) {
					if( record.data.mayfest_event_day && record.data.mayfest_event_day !== '' ) {                	
                		
                		var dateStr = record.data.mayfest_event_day;
                		
                		//if time is not defined, define it as 12:01 AM
                		!record.data.mayfest_event_time || record.data.mayfest_event_time === '' ?
                			dateStr += ' 12:01AM' :
                			dateStr += ' ' + record.data.mayfest_event_time;
	                	
	                	var dt = Ext.Date.parse(dateStr, this._dateFormat);
	                	
	                	//console.log( 'date converting', this, record, dateStr, dt );
	                	
	                	return dt;
	                	
					} else {
						//console.log( 'date null', record.data.title, record );
						return null;
					}
                }

        	},

//        	{	name: 'raw_id',
//        		type: 'int',
//        		convert: function(value, record) {
//        			return record.data.id;	
//        		}
//        	},

        	{name: "event_category",			type: "auto"},
        	{name: "genre",						type: "auto"},
        	{name: "thumbnail",					type: "auto"},
        	
        	{name: 'raw_id',							type: "int"	}
        ]
    }       

});
