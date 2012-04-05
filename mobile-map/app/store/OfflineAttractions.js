Ext.define('Mayfest.store.OfflineAttractions', {
    extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.LocalStorage'],
	
    config: {
        model: 'Mayfest.model.Attraction',
		//storeId: 'offlineAttractionsStore',

        proxy: {
        	type: 'localstorage',
        	id: 'offlineAttractionsStoreProxy'
        }

    }
});
