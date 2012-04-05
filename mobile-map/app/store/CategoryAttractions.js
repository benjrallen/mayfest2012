Ext.define('Mayfest.store.CategoryAttractions', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Mayfest.model.Attraction',
        //autoLoad: true
        //remoteFilter: true,
		//groupField: 'title'
		//getGroupString: function(record) { return record.get('title') }

		grouper: {
			groupFn: function(record) {
				return record.get('title')[0];
			}
		}
    }
});
