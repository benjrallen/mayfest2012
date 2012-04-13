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

			//navui is the Viewport
			navui: {
				selector: 'navui'	
			},
			
			//mainnav is the main docked navigation bar on the viewport
			mainnav: 'mainnav',
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
//			'categorieslist': {
//				render: this.onCategoriesListRender,
//				//activate: this.onCategoriesListActivate,
//				//show: this.onCategoriesListShow,
//				leafitemtap: this.onCategoriesLeafitemtap,
//				itemtap: this.onCategoriesItemTap,
//				back: this.onCategoriesListBack
//			},


			//think I can get rid of this control when main bar is set up.
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
			
			'mainnav': {
				render: this.onMainNavRender	
			},
			
			'mainPanel': {
				initialize: this.onMainPanelInit
			},
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

	onMainPanelInit: function(panel){
		Mayfest.ui.mainPanel = panel;
	},

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

// 04 - 13 - started modifying nav	
//	onNavUIRender: function(){
//		
//		//Mayfest.ui.nav = this.getNavui();
//		//Mayfest.ui.navBar = Mayfest.ui.nav.getNavigationBar();
//		
//		//hide the navbar initially
//		//Mayfest.ui.navBar.hide();
//		
//		
//		console.log( 'onNavUIRender!', this, Mayfest.ui );
//	},
//
////	onNavPush: function(thisView, mixedView){
////		//console.log('onNavPush', thisView, mixedView, this);
////		//alert( 'ON NAV PUSH');
////	},
////	onNavPop: function(thisView, mixedView){
////		console.log('onNavPop', thisView, mixedView, this);
////	},
//	onNavBack: function(thisView){
//		//console.log('onNavBack', thisView.getActiveItem(), thisView, this);
//
//		//Mayfest.ui.AttractionController.getCatnav().show();
//		
//		thisView.getActiveItem().id === 'mainUI' ? 
//			thisView.getNavigationBar().hide() :
//			thisView.getNavigationBar().show();
//	},

	mainNavArray: [],
	
	onMainNavRender: function(){
		Mayfest.ui.nav = this.getMainnav();
		Mayfest.ui.navArray = this.mainNavArray;

		console.log( 'onMainNavRender!', this, Mayfest.ui );
	},

	pushMainNav: function( thisPanel, parentPanel, title, term_id){
		
		//do something and push object to this.mainNavArray
		
		
		//then do the mainNav		
	},

	doMainNav: function(){
		
	},



	onNavUIRender: function(){
		
		Mayfest.ui.viewport = this.getNavui();
		//Mayfest.ui.nav = this.getNavui();
		//Mayfest.ui.navBar = Mayfest.ui.nav.getNavigationBar();
		
		//hide the navbar initially
		//Mayfest.ui.navBar.hide();
		
		
		console.log( 'onNavUIRender!', this, Mayfest.ui );
	},


	onCatNavPush: function(thisView, mixedView){
		console.log('onCatNavPush', thisView, mixedView, this);
	},
	onCatNavPop: function(thisView, mixedView){
		console.log('onCatNavPop', thisView, mixedView, this);
	},
	onCatNavBack: function(evt, t, o){
		console.log('onCatNavBack', evt, t, o);

		this.catNavArray.pop();
		
		this.doCatnav();

//		thisView.getActiveItem().id === 'mainUI' ? 
//			thisView.getNavigationBar().hide() :
//			thisView.getNavigationBar().show();
	},
	onCatNavActiveItemChange: function(container, newActiveItem, oldActiveItem){
		console.log('onCatNavActiveItemChange', this, container, newActiveItem, oldActiveItem);
	},

//	onCatListActivate: function(list, newActiveItem, oldActiveItem, eOpts){
//		console.log('onCatListActivate', this, list, newActiveItem, oldActiveItem, eOpts);
//			
//		//this is a lot of DOM querying, but it searches for a div printed out in the template, based on the existence of the map location.
//		//  if there is none, then the disclosure icon it removed.
////		var disclosures = Ext.select('#attractionsList .x-list-disclosure');
////		
////		if( disclosures.elements.length ){
//////			var i = 0;
////			
////			disclosures.each( function( a, b ){
//////				console.log(i+' a disclosure', this, this.getParent().down('.has_location'));
//////				i++;
////				
////				if( !this.getParent().down('.has_location') )
////					this.hide();
////			});
////		}
//		
//	},

//	onAttractionsListRefresh: function( list, eOpts ){
//		console.log('onAttractionsListRefresh', this, list);
//		//console.log( 'list items', list.getItems() );
//	},
	
	catNavArray: [
	
	], 
	
	pushCatnav: function( term_id, title ){
		
		//if( term_id || term_id === 0 ){
			this.catNavArray.push({ 'term_id': term_id, 'title': title });
		//}
		
		this.doCatnav();
		
	},
	
	doCatnav: function(){
		var target = this.catNavArray[ this.catNavArray.length - 1 ],
			button = this.getCatNavBack();
		
		this.getCatnav().setTitle( target.title );
		
				
		if( !this.filterCategories( target.term_id ) ) {
			
			//console.log( 'last of the list!' );
			
			var attractions = this.getAttractionsByCatID( target.term_id );
				
				//list runs off the following store.
				Ext.getStore('CategoryAttractions').setData( attractions.items );

		                
		        if( !Mayfest.ui.AttractionsList ){
					Mayfest.ui.AttractionsList = Ext.create('Mayfest.view.Attractions');
		        }
		        		        
				//push it into view(shows it)
				this.getCategoriespage().setActiveItem( Mayfest.ui.AttractionsList );
				
		} else {
			//console.log('NOT A LEAF' );
			if( this.getCategoriespage().getActiveItem() !== this.getCategorieslist() )
				this.getCategoriespage().setActiveItem( this.getCategorieslist() );
		}
		

		if( this.catNavArray.length > 1 ){
			var last = this.catNavArray[ this.catNavArray.length - 2 ];
			
			button.setText( last.title );
			//if( button.isHidden() )
				button.show();
				
		} else {
			button.hide();
		}


		//console.log( 'DO CAT NAV!', target.term_id, (target.term_id === 0) );

		
	},
	
	onCatTap: function(dataview, index, target, record){
		//console.log('onCatTap', this, dataview, index, target, record, record.get('term_id') );
		
		//var term_id = record.get('term_id')
		var term_id = record.data.term_id;

		
		this.pushCatnav( record.data.term_id, record.data.name );

		//DESELECT THE TAPPED ITEM
		//http://stackoverflow.com/questions/5368188/sencha-touch-deselect-list-item
		setTimeout(function(){dataview.deselect(index);},50);
		//alert('HELLO!');
		//dataview.deselect(index);

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
		//console.log( 'OFFLINE!!! PROXY TIMEOUT', proxy, operation );
		alert('OFFLINE EXCEPTION!');
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