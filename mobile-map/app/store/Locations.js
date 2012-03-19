Ext.define('Mayfest.store.Locations', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Mayfest.model.Location',
        proxy: {
        	type: 'ajax',
        	//url: '../wp/wp-content/themes/mayfest2012/app_cache/mayfest_map_location.json',
        	url: Mayfest.data.remotePath + 'mayfest_map_location.json',
        	reader: {
        		type: 'json'
        	}
        },
        autoLoad: true,
        //remoteFilter: true
    }
});
