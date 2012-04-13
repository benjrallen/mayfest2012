Ext.define('Mayfest.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			canvasMap: {
				//specifying the ref automatically creates a few functions, including 'getContactForm'
				selector: 'canvasmap'
				//autoCreate: true
			},
			attractionslist: {
				selector: 'categorieslist'
				//autoCreate: true
			},
//			categoriespage: {
//				selector: 'categoriespage'
//				//autoCreate: true
//			},
			navui: {
				selector: 'navui'	
			},
			mainPanel: 'tabpanel',
			mainui: 'mainui'
		}
	},
	
	//used to set handlers on store loading
	onlineStores: [
		'Locations',
		'Attractions',
		'Events',
		'Categories'
	],
	
	//used to track what stores are loaded and take off the loading mask
	offlineStores: [],
	
	init: function(){
		
		Mayfest.ui.MainController = this;


		for ( var i=0; i<this.onlineStores.length; i++ ){
			var name = this.onlineStores[i];

			Ext.getStore('Offline'+name).on({
				load: this.onOfflineStoreLoad,
				scope: this
				//addrecords: this.onOfflineEventsAddRecords
			});

			//if ( navigator.onLine ) {

				var store = Ext.getStore(name);
			
				store.on({
	            	load: this.onOnlineStoreLoad
				});
					
				store.getProxy().on({
					exception: this.onOnlineStoreProxyTimeout
				});
	
				store.load();
				
				store = null;

			//} else {
				//Ext.getStore('Offline'+name).load();
			//}
			
			
			name = null;
		}
		
				
		
		this.control({
			'navui': {
				render: this.onNavUIRender,
//				show: function(){
//					console.log('navigationview show');
//				},
//				push: this.onNavPush,
//				pop: this.onNavPop,
//				activeItemChange: this.onNavActiveItemChange,
				back: this.onNavBack
			},
			'mainPanel': {
				initialize: this.onMainPanelInit
			}
//			'mainui': {
//				activeitemchange: this.onMainActiveItemChange
//			}
		});
		
		//test out auto loading of component in the code.
		//console.log( 'controller init', Mayfest, this.getStores() );
		var me = this;
		//console.log( 'controller init 2', me.getViewport(), Ext.getCmp('viewport'), me.getContactForm(),me.getAttractionslist() );
		//setTimeout( function(){ console.log( 'controller init timeout', me.getViewport(), Ext.getCmp('viewport'), me.getContactForm(),me.getAttractionslist() ); }, 0 );
		
		
		//console.log( Ext.Viewport );
	},

	onMainPanelInit: function(panel){
		Mayfest.ui.mainPanel = panel;
	},

//	onMainActiveItemChange: function( tabpanel, newActiveItem, oldActiveItem, eOpts ){
//		console.log('Main active item change', this, tabpanel, newActiveItem, oldActiveItem, eOpts );	
//		//Mayfest.ui.nav.push( newActiveItem );
//		//console.log( 'main active item', newActiveItem.id, this.getCategoriespage().getNavigationBar() );
//	},
	
	onNavUIRender: function(){
		
		Mayfest.ui.nav = this.getNavui();
		Mayfest.ui.navBar = Mayfest.ui.nav.getNavigationBar();
		
		//hide the navbar initially
		Mayfest.ui.navBar.hide();
		
		
		//console.log( 'onNavUIRender!', this, Mayfest.ui );
	},

//	onNavPush: function(thisView, mixedView){
//		//console.log('onNavPush', thisView, mixedView, this);
//		//alert( 'ON NAV PUSH');
//	},
//	onNavPop: function(thisView, mixedView){
//		console.log('onNavPop', thisView, mixedView, this);
//	},
	onNavBack: function(thisView){
		//console.log('onNavBack', thisView.getActiveItem(), thisView, this);

		//Mayfest.ui.AttractionController.getCatnav().show();
		
		thisView.getActiveItem().id === 'mainUI' ? 
			thisView.getNavigationBar().hide() :
			thisView.getNavigationBar().show();
	},
	
	onOnlineStoreLoad: function(store, records, successful, operation, eOpts){
		//console.log('LOADED onOnlineStoreLoad', this, store, store._storeId, successful, operation);		
		
		if( successful ) {
			//var controller = Mayfest.ui.EventController;
			
			//_storeId provides the storename to append Offline to
			var offlineStore = Ext.getStore('Offline'+store._storeId);
			
			offlineStore.getProxy().clear();
			
			store.each( function(record, i){
				//var id = record.getId();
				record.data.raw_id = record.getId();
				record.phantom = true;
				//offlineStore.add( record );
				//var attraction = offlineStore.add( record );
				//console.log( attraction );
			});
			
			offlineStore.add( records );
			
			offlineStore.sync();
			
			offlineStore.load();
		}
	},

	//define a key in the proxy setup object in the main online store so we can get a reference to it here
	onOnlineStoreProxyTimeout: function ( proxy, response, operation, eOpts ) {
		console.log( 'OFFLINE. PROXY TIMEOUT', proxy, operation );
		//alert('OFFLINE EXCEPTION!');
		//var store = proxy.config.parentStore;
        Ext.getStore('Offline'+proxy.config.parentStore).load();
	},

	onOfflineStoreLoad: function(store, records, successful, operation, eOpts){
		//console.log('on offline store load!', store._storeId, store);
		//var controller = Mayfest.ui.EventController;
		//console.log('controller.onOfflineAttractionsLoad', this, store, records, successful, operation, Mayfest.ui.EventController);		

		//id gets lost when record set to phantom to add to offline store... reset it
		store.each( function(record){
			record.setId( record.data.raw_id );
			//console.log( record.raw.title, record.data.raw_id, record.getId() );
		});
		
		//Mayfest.ui.EventController.offlineAttractionStoreLoaded = true;
		
		switch( store._storeId ){
			case 'OfflineAttractions':
				Mayfest.ui.EventController.offlineAttractionStoreLoaded = true;
				break;
			case 'OfflineLocations':
				//console.log( 'SWITCHED Locations' );
				break;
			case 'OfflineEvents':
				Mayfest.ui.EventController.checkAttractionStoreData();
				break;
			case 'OfflineCategories':
				Mayfest.ui.AttractionController.pushCatnav( 0, 'Directory' );
				//Mayfest.ui.AttractionController.filterCategories(0);
				break;
		}
		
		//track that the store has loaded
		this.offlineStores.push( store._storeId );
		
		//hide the mask?
		if( this.offlineStores.length === this.onlineStores.length )
			this.getNavui().unmask();

		//console.log('storeID', store._storeId, this.offlineStores, ( this.offlineStores.length === this.onlineStores.length ) );

		
		return;

	}
	
});