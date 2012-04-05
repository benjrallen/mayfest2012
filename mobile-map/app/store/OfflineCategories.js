Ext.define('Mayfest.store.OfflineLocations', {
    extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.LocalStorage'],
	
    config: {
        model: 'Mayfest.model.Location',
		//storeId: 'offlineAttractionsStore',

        proxy: {
        	type: 'localstorage',
        	id: 'offlineLocationsStoreProxy'
        }

    }
});
