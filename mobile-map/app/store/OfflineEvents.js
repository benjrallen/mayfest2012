Ext.define('Mayfest.store.OfflineEvents', {
    extend: 'Ext.data.Store',
	requires: ['Ext.data.proxy.LocalStorage'],
	
    config: {
        model: 'Mayfest.model.Event',
		//storeId: 'offlineEventsStore',

        proxy: {
        	type: 'localstorage',
        	id: 'offlineEventsStoreProxy'
        }

    }
});
