Ext.define('Mayfest.store.Categories', {
    extend: 'Ext.data.TreeStore',
		
    config: {
        model: 'Mayfest.model.Category',
        //autoLoad: true,
        //remoteFilter: true,
		rootVisible: false,
		folderSort: true,
				
        proxy: {
        	type: 'ajax',
        	//url: '../wp/wp-content/themes/mayfest2012/app_cache/mayfest_map_location.json',
        	url: Mayfest.data.remotePath + 'attraction_category.json',
        	reader: {
        		type: 'json'
        	}
        }
        

    }
});
