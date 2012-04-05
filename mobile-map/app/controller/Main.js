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
//			mainPanel: 'tabpanel',
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
			var name = this.onlineStores[i],
				store = Ext.getStore(name);
			
			store.on({
            	load: this.onOnlineStoreLoad
			});

			Ext.getStore('Offline'+name).on({
				load: this.onOfflineStoreLoad,
				scope: this
				//addrecords: this.onOfflineEventsAddRecords
			});
			

			store.getProxy().on({
				exception: this.onOnlineStoreProxyTimeout
			});
			
			store = null;
			name = null;
		}
		
				
		
		this.control({
//			'categorieslist': {
//				render: this.onCategoriesListRender,
//				//activate: this.onCategoriesListActivate,
//				//show: this.onCategoriesListShow,
//				leafitemtap: this.onCategoriesLeafitemtap,
//				itemtap: this.onCategoriesItemTap,
//				back: this.onCategoriesListBack
//			},
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
//			'mainPanel': {
//				initialize: this.onMainPanelInit
//			},
			'mainui': {
				activeitemchange: this.onMainActiveItemChange
			}
		});
		
		//test out auto loading of component in the code.
		//console.log( 'controller init', Mayfest, this.getStores() );
		var me = this;
		//console.log( 'controller init 2', me.getViewport(), Ext.getCmp('viewport'), me.getContactForm(),me.getAttractionslist() );
		//setTimeout( function(){ console.log( 'controller init timeout', me.getViewport(), Ext.getCmp('viewport'), me.getContactForm(),me.getAttractionslist() ); }, 0 );
		
		
		//console.log( Ext.Viewport );
	},

//	onMainPanelInit: function(panel){
//		Mayfest.ui.mainPanel = panel;
//	},

	onMainActiveItemChange: function( tabpanel, newActiveItem, oldActiveItem, eOpts ){
		console.log('Main active item change', this, tabpanel, newActiveItem, oldActiveItem, eOpts );	
		//Mayfest.ui.nav.push( newActiveItem );
		//console.log( 'main active item', newActiveItem.id, this.getCategoriespage().getNavigationBar() );
	},

//	onCategoriesListBack: function( nestedList, node, lastActiveList, detailCardActive, dataview, eOpts ){
//		//console.log( 'onCategoriesListBack', nestedList, node, lastActiveList, detailCardActive, dataview, eOpts );
//		//console.log( 'more list back', nestedList.getStore() );
//	
//		//nestedList.getStore().sort('name', 'ASC');
//	},
	
	onNavUIRender: function(){
		
		Mayfest.ui.nav = this.getNavui();
		Mayfest.ui.navBar = Mayfest.ui.nav.getNavigationBar();
		
		//hide the navbar initially
		Mayfest.ui.navBar.hide();
		
		
		console.log( 'onNavUIRender!', this, Mayfest.ui );
	},

//	onNavPush: function(thisView, mixedView){
//		console.log('onNavPush', thisView, mixedView, this);
//	},
//	onNavPop: function(thisView, mixedView){
//		console.log('onNavPop', thisView, mixedView, this);
//	},
	onNavBack: function(thisView){
		console.log('onNavBack', thisView.getActiveItem(), thisView, this);

		//Mayfest.ui.AttractionController.getCatnav().show();
		
		thisView.getActiveItem().id === 'mainUI' ? 
			thisView.getNavigationBar().hide() :
			thisView.getNavigationBar().show();
	},
//	onNavActiveItemChange: function(container, newActiveItem, oldActiveItem){
//		console.log('onNavActiveItemChange', this, container, newActiveItem, oldActiveItem);
//	},
//
//	onCategoriesListShow: function(){
//	},
	
//	onCategoriesItemTap: function(nestedList, list, index, target, record, e, eOpts){
//		//e.stopEvent();
//		console.log('categoriesItemTap', this, nestedList, list, index, target, record, e, eOpts);
//	},
//	
//	onCategoriesListRender: function(){
//		console.log( 'onCategoriesListRender!', this, this.getAttractionslist() );
//		
//		//get list
//		var list = this.getAttractionslist();
//		//attach handlers
////		list.on({
////			leafitemtap: this.onAttractionsLeafitemtap
////		});
//	},
	
//	onCategoriesLeafitemtap: function(me, list, index, item, e){
//		//console.log('leafitemtap', me, list, index, item, e);
//		
//		var store = list.getStore(),
//			record = store.getAt(index),
//			cat_id = record.data.term_id,			
//			cat_store = Ext.getStore('CategoryAttractions'),
//			//attractions = Ext.getStore('Attractions');
//			attractions = this.getAttractionsByCatID( cat_id );
//			//detailCard = me.getDetailCard();
//
//			//console.log( 'CAT_ID', cat_id );
//			
//			//detailCard.setStore( attractions );
//			
//			cat_store.setData( attractions.items );
//			
//		//console.log('leaf item additional', cat_id, store, record, item, attractions, detailCard, cat_store.getData());
//		
//	},
	
//	getAttractionsByCatID: function( cat_id ){
//		var store = Ext.getStore('OfflineAttractions'),
//			attractions = store.queryBy(function( record, id ){
//				if( record.data.attraction_category.length ){
//					for (var i=0; i < record.data.attraction_category.length; i++){
//						//check the category on the attraction item.  return true to add it to return from query						
//						if ( record.data.attraction_category[i].term_id == cat_id ) {
//							return true;
//						}
//						
//						//return ( record.data.attraction_category[i].term_id == cat_id ? true : false );
//					}
//				}
//				
//				return false;
//			});
//		
//		//console.log( 'getAttractionsByCatID', attractions );
//		
//		return attractions;
//	},
	
	//doesn't really fire cause it loads fast?
	onBeforeLocationsStoreLoad: function(){
		console.log('controller.onBeforeLocationsStoreLoad');
	},
	
	//can probably take a lot of this out of use.
	onLocationsStoreLoad: function(store, records, successful, operation, eOpts){
		console.log('controller.onLocationsStoreLoad', store, successful, operation, eOpts);
		
		//Ext.getStore('Attractions').load();

//
//		Ext.each( records, function( item, index, recordsItSelf ){
//			console.log( store.getAt(index) );
//		});
	},

	//doesn't really fire cause it loads fast?
	onBeforeAttractionsStoreLoad: function(){
		console.log('controller.onBeforeAttractionsStoreLoad');
	},
	
	//can probably take a lot of this out of use.
	onAttractionsStoreLoad: function(store, records, successful, operation, eOpts){
		//actually do these first lines
		//Ext.getStore('Events').load();
		
		
		console.log('controller.onAttractionsStoreLoad', store, successful, operation, eOpts);
		//console.log('controller.onAttractionsStoreLoad', store, records, successful, operation, eOpts);

//		Ext.each( records, function( item, index, recordsItSelf ){
//			var uid = store.getAt(index).data.mayfest_ml_uid;
//			
//			console.log( store.getAt(index), Ext.getStore('Locations').getById( uid ) );
//			
//			
//		});

	},

/*		
	//doesn't really fire cause it loads fast?
	onBeforeCategoriesStoreLoad: function(){
		console.log('controller.onBeforeCategoriesStoreLoad');
	},
	
	//can probably take a lot of this out of use.
	onCategoriesStoreLoad: function(store, records, successful, operation, eOpts){
		console.log('controller.onCategoriesStoreLoad', store, records, successful, operation, eOpts);
		
		//store.sort('name', 'ASC')
		//console.log( 'store.getData()', store.getData() );
		
	},
*/
	
	onOnlineStoreLoad: function(store, records, successful, operation, eOpts){
		console.log('LOADED onOnlineStoreLoad', this, store, store._storeId, successful, operation);		
		
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
		console.log( 'OFFLINE!!! PROXY TIMEOUT', proxy, operation );
		
		//var store = proxy.config.parentStore;
        Ext.getStore('Offline'+proxy.config.parentStore).load();
	},

	onOfflineStoreLoad: function(store, records, successful, operation, eOpts){
		console.log('on offline store load!', store._storeId, store);
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
				console.log( 'SWITCHED Locations' );
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

		console.log('storeID', store._storeId, this.offlineStores, ( this.offlineStores.length === this.onlineStores.length ) );

		
		return;

	},
/*		
	//function for Location store load
	//	make it set the data in the offline store
	//	make the controller store the offline store
	onLocationsStoreLoad: function(store, records, successful, operation, eOpts){
			console.log('controller.onLocationsStoreLoad', this, store, successful, operation, Mayfest.ui.EventController);		
		
		if( successful ) {
			//var controller = Mayfest.ui.EventController;
			
			var offlineStore = Ext.getStore('OfflineLocations');
			
			offlineStore.getProxy().clear();
			
			store.each( function(record, i){
//				var id = record.getId();
							
				record.phantom = true;
				//record.setId( id );
//				var attraction = offlineStore.add( record );
//				console.log( attraction );
			});
			
			offlineStore.add( records );
			
			//offlineStore.setData( records );
	
			offlineStore.sync();
			
			offlineStore.load();
		}
	},
	
	//function for the Locationstore proxy exception
	//	make controller store the offline store
	//	fire process event data
	onLocationsStoreProxyTimeout: function ( proxy, response, operation, eOpts ) {        
        console.log('MAIN CONTROLLER THINKS WE ARE OFFLINE');
        Ext.getStore('OfflineAttractions').load();
        //Mayfest.ui.EventController.offlineStore.load();
    },

	//offline store load fires process event data	
	onOfflineLocationsLoad: function(store, records, successful, operation, eOpts){
		var controller = Mayfest.ui.EventController;
		console.log('controller.onOfflineLocationsLoad', this, store, records, successful, operation, Mayfest.ui.EventController);		

		//id gets lost when record set to phantom to add to offline store... reset it
		store.each( function(record){
			//console.log( 'offline', record, record.raw.id );
			
			record.setId( record.raw.id );
		});
		
		return;
	},
	
	
	//function for event store load
	//	make it set the data in the offline store
	//	make the controller store the offline store
	onAttractionsStoreLoad: function(store, records, successful, operation, eOpts){
			console.log('controller.onAttractionsStoreLoad', this, store, successful, operation, Mayfest.ui.EventController);		
		
		if( successful ) {
			//var controller = Mayfest.ui.EventController;
			
			var offlineStore = Ext.getStore('OfflineAttractions');
			
			offlineStore.getProxy().clear();
			
			store.each( function(record, i){
//				var id = record.getId();
							
				record.phantom = true;
				//record.setId( id );
//				var attraction = offlineStore.add( record );
//				console.log( attraction );
			});
			
			offlineStore.add( records );
			
			//offlineStore.setData( records );
	
			offlineStore.sync();
			
			offlineStore.load();
		}
	},
	
	//function for the eventstore proxy exception
	//	make controller store the offline store
	//	fire process event data
	onAttractionsStoreProxyTimeout: function ( proxy, response, operation, eOpts ) {        
        console.log('MAIN CONTROLLER THINKS WE ARE OFFLINE');
        Ext.getStore('OfflineAttractions').load();
        //Mayfest.ui.EventController.offlineStore.load();
    },

	//offline store load fires process event data	
	onOfflineAttractionsLoad: function(store, records, successful, operation, eOpts){
		var controller = Mayfest.ui.EventController;
		console.log('controller.onOfflineAttractionsLoad', this, store, records, successful, operation, Mayfest.ui.EventController);		

		//id gets lost when record set to phantom to add to offline store... reset it
		store.each( function(record){
			//console.log( 'offline', record, record.raw.id );
			
			record.setId( record.raw.id );
		});

		Mayfest.ui.EventController.offlineAttractionStoreLoaded = true;
		
		return;


	}
*/
	
});