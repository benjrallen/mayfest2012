Ext.define('Mayfest.store.Events', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Mayfest.model.Event',
        autoLoad: true,
        //remoteFilter: true,

        proxy: {
        	type: 'ajax',
        	//url: '../wp/wp-content/themes/mayfest2012/app_cache/mayfest_map_location.json',
        	url: Mayfest.paths.data() + 'mayfest_event.json',
        	reader: {
        		type: 'json'
        	}
        }

    }
});
