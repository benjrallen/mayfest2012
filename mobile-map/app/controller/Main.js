Ext.define('Mayfest.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			contactForm: {
				//specifying the ref automatically creates a few functions, including 'getContactForm'
				selector: '#contactForm',
				//autoCreate: true
			},
			attractionslist: {
				selector: 'categorieslist',
				//autoCreate: true
			},
			navui: {
				selector: 'navui'	
			},
			mainPanel: 'tabpanel'
		}
	},
	
	init: function(){
		
//        Ext.getStore('Locations').on({
//            scope: this,
//
//            beforeload: this.onBeforeLocationsStoreLoad,
//            load: this.onLocationsStoreLoad
//        });
//		
//        Ext.getStore('Attractions').on({
//            scope: this,
//
//            beforeload: this.onBeforeAttractionsStoreLoad,
//            load: this.onAttractionsStoreLoad
//        });
//		
//        Ext.getStore('Events').on({
//            //scope: this,
//
//            beforeload: this.onBeforeEventsStoreLoad,
//            load: this.onEventsStoreLoad
//        });
//
//        Ext.getStore('Categories').on({
//            //scope: this,
//
//            beforeload: this.onBeforeCategoriesStoreLoad,
//            load: this.onCategoriesStoreLoad
//        });

//		this.control({
//			'button[action=submitContact]': {
//				tap: 'submitContactForm'
//			}
//		});

		
		
		
		this.control({
			'categorieslist': {
				render: this.onCategoriesListRender,
				//activate: this.onCategoriesListActivate,
				//show: this.onCategoriesListShow,
				leafitemtap: this.onCategoriesLeafitemtap,
				itemtap: this.onCategoriesItemTap
			},
			'navui': {
				render: this.onNavUIRender,
				show: function(){
					console.log('navigationview show');
				},
				push: this.onNavPush,
				pop: this.onNavPop,
				back: this.onNavBack,
				activeItemChange: this.onNavActiveItemChange
			}
		});
		
		//test out auto loading of component in the code.
		//console.log( 'controller init', Mayfest, this.getStores() );
		var me = this;
		//console.log( 'controller init 2', me.getViewport(), Ext.getCmp('viewport'), me.getContactForm(),me.getAttractionslist() );
		//setTimeout( function(){ console.log( 'controller init timeout', me.getViewport(), Ext.getCmp('viewport'), me.getContactForm(),me.getAttractionslist() ); }, 0 );
		
		
		console.log( Ext.Viewport );
	},
	
	onNavUIRender: function(){
		
		Mayfest.ui.nav = this.getNavui();
		Mayfest.ui.navBar = Mayfest.ui.nav.getNavigationBar();
		
		//hide the navbar initially
		Mayfest.ui.navBar.hide();
		
		
		console.log( 'onNavUIRender!', this, Mayfest.ui );
	},

	onNavPush: function(thisView, mixedView){
		console.log('onNavPush', thisView, mixedView, this);
	},
	onNavPop: function(thisView, mixedView){
		console.log('onNavPop', thisView, mixedView, this);
	},
	onNavBack: function(thisView){
		console.log('onNavBack', thisView.getActiveItem(), thisView, this);
		
		thisView.getActiveItem().id === 'mainUI' ? 
			thisView.getNavigationBar().hide() :
			thisView.getNavigationBar().show();
		
	},
	onNavActiveItemChange: function(container, newActiveItem, oldActiveItem){
		console.log('onNavActiveItemChange', this, container, newActiveItem, oldActiveItem);
	},

//	onCategoriesListShow: function(){
//	},
	
	onCategoriesItemTap: function(nestedList, list, index, target, record, e, eOpts){
		//e.stopEvent();
		//console.log('categoriesItemTap', this);
	},
	
	onCategoriesListRender: function(){
		console.log( 'onCategoriesListRender!', this, this.getAttractionslist() );
		
		//get list
		var list = this.getAttractionslist();
		//attach handlers
//		list.on({
//			leafitemtap: this.onAttractionsLeafitemtap
//		});
	},
	
	onCategoriesLeafitemtap: function(me, list, index, item, e){
		//console.log('leafitemtap', me, list, index, item, e);
		
		var store = list.getStore(),
			record = store.getAt(index),
			cat_id = record.data.term_id,
			cat_store = Ext.getStore('CategoryAttractions'),
			//attractions = Ext.getStore('Attractions');
			attractions = this.getAttractionsByCatID( cat_id );
			//detailCard = me.getDetailCard();
			
			//detailCard.setStore( attractions );
			
			cat_store.setData( attractions.items );
			
		//console.log('leaf item additional', cat_id, store, record, item, attractions, detailCard, cat_store.getData());
		
	},
	
	getAttractionsByCatID: function( cat_id ){
		var store = Ext.getStore('Attractions'),
			attractions = store.queryBy(function( record, id ){
				if( record.data.attraction_category.length ){
					for (var i=0; i < record.data.attraction_category.length; i++){
						//check the category on the attraction item.  return true to add it to return from query						
						return ( record.data.attraction_category[i].term_id == cat_id ? true : false );
					}
				}
			});
		
		//console.log( 'getAttractionsByCatID', attractions );
		
		return attractions;
	},
	
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
	
	//doesn't really fire cause it loads fast?
	onBeforeEventsStoreLoad: function(){
		console.log('controller.onBeforeEventsStoreLoad');
	},
	
	//can probably take a lot of this out of use.
	onEventsStoreLoad: function(store, records, successful, operation, eOpts){
		console.log('controller.onEventsStoreLoad', store, successful, operation, eOpts);
	},
	
	//doesn't really fire cause it loads fast?
	onBeforeCategoriesStoreLoad: function(){
		console.log('controller.onBeforeCategoriesStoreLoad');
	},
	
	//can probably take a lot of this out of use.
	onCategoriesStoreLoad: function(store, records, successful, operation, eOpts){
		console.log('controller.onCategoriesStoreLoad', store, records, successful, operation, eOpts);
		
		//console.log( 'store.getData()', store.getData() );
		
	},
	
});