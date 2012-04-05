Ext.define('Mayfest.store.Categories', {
    extend: 'Ext.data.Store',
		
    config: {
        model: 'Mayfest.model.Category',
        autoLoad: true,
        //remoteFilter: true,
		//rootVisible: false,
		//folderSort: true,
				
        proxy: {
        	type: 'ajax',
        	//url: '../wp/wp-content/themes/mayfest2012/app_cache/mayfest_map_location.json',
        	url: Mayfest.paths.data() + 'attraction_category.json',
        	reader: {
        		type: 'json'
        	},
        	parentStore: 'Categories',
			timeout: Mayfest.times.offlineTimeout
        }
    }
});


//Ext.define('Mayfest.store.Categories', {
//    extend: 'Ext.data.TreeStore',
//		
//    config: {
//        model: 'Mayfest.model.Category',
//        //autoLoad: true,
//        //remoteFilter: true,
//		rootVisible: false,
//		//folderSort: true,
//				
//        proxy: {
//        	type: 'ajax',
//        	//url: '../wp/wp-content/themes/mayfest2012/app_cache/mayfest_map_location.json',
//        	url: Mayfest.paths.data() + 'attraction_category.json',
//        	reader: {
//        		type: 'json'
//        	}
//        }
//        
//
//    }
//});

