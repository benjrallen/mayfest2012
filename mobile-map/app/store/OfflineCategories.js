Ext.define('Mayfest.store.OfflineCategories', {
    extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.LocalStorage'],
	
    config: {
        model: 'Mayfest.model.Category',
		//storeId: 'offlineAttractionsStore',

        proxy: {
        	type: 'localstorage',
        	id: 'offlineCategoriesStoreProxy'
        }

    }
});
