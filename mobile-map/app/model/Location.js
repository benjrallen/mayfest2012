/**
 * @class Location
 * @extends Ext.data.Model
 * 
 * 
 */
Ext.define('Mayfest.model.Location', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        	{name: "id",				type: "int"},
        	{name: "content", 			type: "string"},
        	{name: "title",				type: "string"},
        	{name: "mayfest_ml_id", 	type: "string"},
        	{name: "mayfest_ml_type",	type: "string"},
        	{name: "mayfest_ml_desc",	type: "string"},
        	{name: "mayfest_ml_x",		type: "int"},
        	{name: "mayfest_ml_y",		type: "int"},


        	{name: 'raw_id',							type: "int"	}
        	
//			{	name: 'raw_id',
//        		type: 'int',
//        		convert: function(value, record) {
//        			return record.data.id;	
//        		}
//        	}

//            {name: "description",    type: "string", mapping: "description.texts.en"},
//            {name: "image", type: "string", mapping: "image.id", convert: function(value, record) {
//                return "http://kiva.org/img/w80h80/" + value + ".jpg";
//            }},
//            'terms', 'location',
//            {
//                name: 'percent_funded', convert: function(v, record) {
//                    return parseInt(record.data.funded_amount / record.data.loan_amount * 100, 10);
//                }
//            }
        ]
        
//        associations: [
//        	{
//        		type: 'belongsTo',
//        		model: 'Attraction',
//        		foreignKey: 'mayfest_ml_uid',
//        		autoload: true
//        	}
//		]

//        belongsTo: {
//            model: "Mayfest.model.Attraction",
//            primaryKey : 'mayfest_ml_uid',
//            associationKey: 'id',
//            //foreignKey : 'mayfest_ml_uid'
//            //filterProperty: 'query',
////            store: {
////                pageSize       : 20,
////                remoteFilter   : true,
////                clearOnPageLoad: false
////            }
//        }

    }
    
//  
//    setData: function(rawData) {    	
//        var fields = this.fields.items,
//            ln = fields.length,
//            isArray = Ext.isArray(rawData),
//            data = this._data = this.data = {},
//            i, field, name, value, convert, id;
//
//        if (!rawData) {
//            return this;
//        }
//
//        for (i = 0; i < ln; i++) {
//            field = fields[i];
//            name = field.getName();
//            convert = field.getConvert();
//
//            if (isArray) {
//                value = rawData[i];
//            }
//            else {
//                value = rawData[name];
//                if (typeof value == 'undefined') {
//                    value = field.getDefaultValue();
//                }
//            }
//
//            if (convert) {
//                value = convert.call(field, value, this);
//            }
//
//            data[name] = value;
//        }
//
//        id = this.getId();
//     	console.log('setting data', id, this.associations, this );
//        if (this.associations.length && (id || id === 0)) {
//           this.handleInlineAssociationData(rawData);
//        }
//
//        return this;
//    },
//
//  
//    handleInlineAssociationData: function(data) {
//    	console.log('handling associations', data);
//    	
//        var associations = this.associations.items,
//            ln = associations.length,
//            i, association, associationData, reader, proxy, associationKey;
//
//        for (i = 0; i < ln; i++) {
//            association = associations[i];
//            associationKey = association.getAssociationKey();
//            associationData = data[associationKey];
//
//			console.log('inside loop', association, associationKey, associationData);
//
//            if (associationData) {
//                reader = association.getReader();
//                if (!reader) {
//                    proxy = association.getAssociatedModel().getProxy();
//                    // if the associated model has a Reader already, use that, otherwise attempt to create a sensible one
//                    if (proxy) {
//                        reader = proxy.getReader();
//                    } else {
//                        reader = new Ext.data.JsonReader({
//                            model: association.getAssociatedModel()
//                        });
//                    }
//                }
//                association.read(this, reader, associationData);
//            }
//        }
//    }

    
});
