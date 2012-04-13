Ext.define('Mayfest.store.Events', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Mayfest.model.Event',
        autoLoad: false,
        //remoteFilter: true,

        proxy: {
        	type: 'ajax',
        	//url: '../wp/wp-content/themes/mayfest2012/app_cache/mayfest_map_location.json',
        	url: Mayfest.paths.data() + 'mayfest_event.json',
        	reader: {
        		type: 'json'
        	},
			parentStore: 'Events',	        
	        timeout: Mayfest.times.offlineTimeout
        }
        

    }
});
