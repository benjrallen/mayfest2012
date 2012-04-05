Ext.define('Mayfest.store.CategoryEvents', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Mayfest.model.Event',
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
