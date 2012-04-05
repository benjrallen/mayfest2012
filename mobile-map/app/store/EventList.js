Ext.define('Mayfest.store.EventList', {
    extend: 'Ext.data.Store',
		
    config: {
        model: 'Mayfest.model.Event',
        //autoLoad: true,
        //remoteFilter: true,
		//rootVisible: false,
		//folderSort: true,

		grouper: {
			groupFn: function(record) {				
				return record.get('mayfest_event_time');
			}
		}


    }
});
