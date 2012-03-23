Ext.define('Mayfest.store.Attractions', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Mayfest.model.Attraction',
        autoLoad: true,
        //remoteFilter: true,

        proxy: {
        	type: 'ajax',
        	//url: '../wp/wp-content/themes/mayfest2012/app_cache/mayfest_map_location.json',
        	url: Mayfest.paths.data() + 'mayfest_attraction.json',
        	reader: {
        		type: 'json'
        	}
        }

    }
});
