Ext.define('Mayfest.controller.Event', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			eventtabs: {
				selector: 'eventtabs'
				//autoCreate: true
			},
			categorylists: {
				selector: 'eventcategorieslist'
			},
			categoryselect: {
				selector: '#eventCategorySelect'
			},
			eventslist: {
				selector: 'eventslist'
			}


//		},
//		control: {
//			'#eventTabs' : {
//				initialize: 'onEventTabsInit'
//			}			
		}
	},


	//to store the days in the system
	eventDays: {},
	eventDayKeys: [],
	currentDay: null,
	currentEvent: null,  //used for the leaf and the disclose item
	eventList: null,  //only make one list component for the panels instead of four separate ones

	//offlineStore: null,
	
	init: function(){

		Mayfest.ui.EventController = this;

		//console.log( 'Event Controller Inited', Mayfest.ui.EventController );
	/*	
		var eventsStore = Ext.getStore('Events');
		//this.offlineStore = Ext.getStore('OfflineEvents');

		eventsStore.on({
            load: this.onEventsStoreLoad
		});


		Ext.getStore('OfflineEvents').on({
			load: this.onOfflineEventsLoad
			//addrecords: this.onOfflineEventsAddRecords
		});

		eventsStore.getProxy().on({
			exception: this.onEventsStoreProxyTimeout
		});

		eventsStore = null;
		//eventsStore.load();
	*/	

		Ext.getStore('EventList').on({
			load: this.onListStoreLoad
		});

//        Ext.getStore('OfflineAttractions').on({
//            scope: this,
//            load: this.onAttractionsStoreLoad
//        });


		this.control({
			'eventtabs': {
				//initialize: 'onEventTabsInit',
				activeitemchange: 'onEventTabsActiveItemChange'
				//scope: this
			},
			'categoryselect': {
				change: this.onCatSelectChange
			},
			'eventslist': {
				//updatedata: this.onListUpdateData,
				disclose: this.onListDisclose,
				itemtap: this.onListItemTap 
			}
		});



				
		var me = this;
		
		//Set up a template for the leaf
		//	.from method Creates a template from the passed element's value (display:none textarea, preferred) or innerHTML.
		//	Elements defined in index.php
		Mayfest.ui.templates.eventLeaf =	Ext.XTemplate.from(
												Ext.get('event-leaf-template'),
												{
//													getMapLocation: function(){
//														return Mayfest.ui.currentLocation;
//													},
													getThumbnail: function( thumb ){
														
														var atts = thumb['app-thumb'];
														//console.log( 'GET THUMBNAIL', thumb );
														
														return '<img src="'+atts[0]+'" width="'+atts[1]+'" height="'+atts[2]+'" />';
													},
													getValues: function( values ){
														
														console.log( 'VALUES', values );
													},
													hasDate: function( date ){
														return ( (date && date !== '') ) ? true : false;
													},
													buildDate: function( date ){
														//fix those strings
														if( !date )
															return '';
														
														return Ext.Date.format( date, 'g:ia - D.' );
													},
													buildAttraction: function( attraction_id ){
														var store = Ext.getStore('OfflineAttractions'),
															attraction = store.getById( attraction_id );
																													
														return attraction.data.title;
													}
												}
											);


	},

	offlineAttractionStoreLoaded: false,
	
//	onOfflineAttractionsStoreLoad: function(){
//		return this.attractionStoreLoaded = true;
//	},
/*	
	//function for event store load
	//	make it set the data in the offline store
	//	make the controller store the offline store
	onEventsStoreLoad: function(store, records, successful, operation, eOpts){
			console.log('controller.onEventsStoreLoad', this, store, successful, operation, Mayfest.ui.EventController);		
		
		if( successful ) {
			//var controller = Mayfest.ui.EventController;
			console.log('SUCCESSFUL EVENTS LOAD!');		
			
			var offlineStore = Ext.getStore('OfflineEvents');
			
			offlineStore.getProxy().clear();
			
			store.each( function(record, i){				
				record.phantom = true;
				//offlineStore.add( record.data );
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
	onEventsStoreProxyTimeout: function ( proxy, response, operation, eOpts ) {        
        console.log('I THINK WE ARE OFFLINE');
        Ext.getStore('OfflineEvents').load();
    },

	//offline store load fires process event data	
	onOfflineEventsLoad: function(store, records, successful, operation, eOpts){
		//id gets lost when record set to phantom to add to offline store... reset it
		store.each( function(record){
			//console.log( 'offline', record, record.raw.id );
			
			record.setId( record.raw.id );
		});

		
		var controller = Mayfest.ui.EventController;
		console.log('controller.onOfflineEventsLoad', this, store, records, successful, operation, Mayfest.ui.EventController);		

		if( !controller.offlineAttractionStoreLoaded ){
		//if( controller.offlineAttractionStoreLoaded ){
			//return controller.processEventData.apply( this, arguments );
			console.log('attraction STORE LOADED');
			return controller.processEventData();
		} else {
			console.log( 'LOOKING!!!!!!!' );
			var evtArgs = arguments,
				me = this,
				timeoutFunc = function(){
					return controller.onOfflineEventsLoad.apply( me, evtArgs );
				}
				
			setTimeout( timeoutFunc, 25 );
		}
		
		return;


	},
*/	
	//use this to check for the existence of the attractions store data
	checkAttractionStoreData: function(){
		
		var controller = Mayfest.ui.EventController;
		//console.log('controller.onOfflineEventsLoad', this, store, records, successful, operation, Mayfest.ui.EventController);		

		if( controller.offlineAttractionStoreLoaded ){
		//if( controller.offlineAttractionStoreLoaded ){
			//return controller.processEventData.apply( this, arguments );
			console.log('attraction STORE LOADED');
			return controller.processEventData();
		} else {
			console.log( 'LOOKING!!!!!!!' );
//			var args = arguments,
//				me = this,
//				timeoutFunc = function(){
//					return controller.checkAttractionStoreData.apply( me, args );
//				}
//				
//			setTimeout( timeoutFunc, 25 );
			setTimeout( controller.checkAttractionStoreData, 25 );
		}
	},

	processEventData: function(){
		console.log( 'process event data', this );

		var items = Ext.getStore('OfflineEvents').getData().items,
			eventDays = Mayfest.ui.EventController.eventDays,
			eventDayKeys = Mayfest.ui.EventController.eventDayKeys;
					
		if ( items && items.length ){
			for ( var i=0; i< items.length; i++ ){
				
				var data = items[i].data;
				
				//push each separate day into the eventDays array
				if ( data.date ) {
					//create the entry if it doesn't yet exist
					//user Array.prototype.indexOf method.  doesn't exist in IE, but for this application, that doesn't matter
					if( eventDayKeys.indexOf( data.mayfest_event_day ) < 0 ){
						eventDays[ data.mayfest_event_day ] = {
							items: [],
							categories: {}
						};
						eventDayKeys.push( data.mayfest_event_day );
					}

					//put it into the array					
					eventDays[ data.mayfest_event_day ].items.push(items[i]);
					
					//push in the category ids
					if ( data.event_category && data.event_category.length ){						
						for ( var j=0; j < data.event_category.length; j++ ){
							var category = data.event_category[j],
								cat_id = parseInt( category.term_id, 10 );
							//check if category in array yet.
							if( !eventDays[ data.mayfest_event_day ].categories[ cat_id ] )
							//put it in if not
								eventDays[ data.mayfest_event_day ].categories[ cat_id ] = {
									text: category.name,
									value: cat_id
								};
						}
					}
				
					data = null;
				}
			}
			
			//day = null;
			//data = null;
		}
		
		//items = null;
		
		//sort the keys
		eventDayKeys.sort();
		
		//console.log('event days', Mayfest.ui.EventController.eventDays, Mayfest.ui.EventController.eventDayKeys);
		
		//add the panels
		Mayfest.ui.EventController.addEventTabs();
		
		return;
	},
	
		
	addEventTabs: function(){
		//now add a panel for each of the days.
		//I am going to iterate and add() each item.  might be more efficient to set up the definitions first and the use setItems to add everything
		//console.log( 'add an event panel', this, this.eventDays );

		if( !this.eventList && this.eventDayKeys.length )
			this.eventList = Ext.create('Mayfest.view.Events');

		
		for( var i=0; i < this.eventDayKeys.length; i++ ){
			var key = this.eventDayKeys[i],
				day = this.eventDays[key];
				
			//console.log( key, day );
			
			
			//add the panels
			this.getEventtabs().add([
				{
					id: key,
					xtype: 'eventcategorieslist',
					title: Ext.Date.format( day.items[0].data.date, 'D' )
					
				}
			]);
			
			key = null;
			day = null;
		}		
	},
	
	onEventTabsActiveItemChange: function( tabPanel, panel, oldPanel ){
		
		//set the current day
		this.currentDay = this.eventDays[ panel.id ];
		//set the items in the store		
		Ext.getStore('EventList').setData( this.currentDay.items );
				
		//build the category select options
		this.buildCatSelectOptions();

		panel.add([ this.eventList ]);

		
		//console.log( 'onEventTabsActiveItemChange', this, tabPanel, panel, oldPanel, this.currentDay.items );
		
		return;
	},

	
	buildCatSelectOptions: function(){
		//console.log( 'Build Cat Select Options' );
		
		var options = [
			{text: 'All Categories', value: -1}
		];

		for ( var id in this.currentDay.categories )
			options.push( this.currentDay.categories[id] );

		//return this.getCategoryselect().setOptions( options );
		this.getCategoryselect().setOptions( options );
		options = null;
		return;
	},


	onCatSelectChange: function(select, newValue, oldValue){
		
		var value = newValue.data.value;
		
		Ext.getStore('EventList').clearFilter();
		
		if ( value > -1 ) {
			Ext.getStore('EventList').filter([
				{
					filterFn: function(item) {
						var match = false;

						Ext.each( item.get('event_category'), function( cat ){
							if( cat.term_id == value )
								match = true;
								return false;
						});

						return match;
					}
				}
			]);

		}
		
		value = null;
		//console.log( 'onCatSelectChange', select, value, newValue, oldValue );
	},


	onListItemTap: function(dataview, index, target, record){
		console.log('onListItemTap', dataview, index, target, record );
		
        this.currentEvent = record.data;

        //this.currentEvent.mapLocation = this.getEventLocation();
        
        Mayfest.ui.currentLocation = this.getEventLocation();
        
        //console.log('Mayfest.ui.nav', Mayfest.ui.nav, Mayfest.root.getNavigationBar() );
                
        if( !Mayfest.ui.AttractionLeaf ){
			Mayfest.ui.AttractionLeaf = Ext.create('Mayfest.view.AttractionLeaf');
        }
        
        var view = Mayfest.ui.AttractionLeaf;
		//apply the record's data to the template
		//set the templates returned html for the leaf
		view.setHtml( Mayfest.ui.templates.eventLeaf.apply( this.currentEvent ) );
		//push it into the nav view(shows it);
		Mayfest.ui.nav.push( view );
		
		view = null;
		return;
	},

	//use the disclose event to open directly to the map and stop the itemtap event
	onListDisclose: function( list, record, target, index, e, eOpts ){
		//console.log( 'onListDisclose DISCLOSE EVENT FIRED', list, record, target, index, e, eOpts );
		
		e.stopPropagation();
		
		this.currentEvent = record.data;
		
		//this.currentEvent.mapLocation = this.getEventLocation();

		Mayfest.ui.currentLocation = this.getEventLocation();
		//console.log( 'onListDisclose DISCLOSE EVENT FIRED', this.currentEvent );
		
		Mayfest.ui.mapController.goToMapLocation();
	},

	getEventLocation: function( attraction_id ){		
		var id = attraction_id || this.currentEvent.mayfest_attraction_uid;

		if( !id )
			return null;
			
		var store = Ext.getStore('OfflineAttractions'),
			attraction = store.getById( id );
		
		console.log('GET EVENT LOCATION', store, attraction, id);
		
		if( !attraction.data || !attraction.data.mayfest_ml_uid )
			return null;
				
		store = null;
		return Mayfest.ui.AttractionController.getAttractionLocation( attraction.data.mayfest_ml_uid );;
	},

//	onListUpdateData: function( list, newData ){
//		console.log(' on list UPDATE DATA ', list, newData );
//		
//	},

	onListStoreLoad: function( store, records, success, operation ){
		//console.log('ON LIST STORE LOAD', store, records, success, operation );

		var tabParent = Mayfest.ui.EventController.getEventtabs(),
			//active = tabParent.getActiveItem(),
			id = tabParent.observableId;


		//console.log('LIST LOAD', Mayfest.ui.EventController.getEventtabs().getActiveItem().select('#eventsList .x-list-disclosure'));
		//console.log('LIST LOAD', Ext.select( Mayfest.ui.EventController.getEventtabs().getActiveItem().select('#eventsList .x-list-disclosure'));
		//console.log('LIST LOAD', id);

		

	},
	
//	onEventTabsInit: function(panel, eOpts){
//		console.log('initing event tabs', this, panel, eOpts)
//		
//	},
	
	getEventAttraction: function( attraction_id ){
		var id = attraction_id;
		
		if( !id )
			return null;
		
		var store = Ext.getStore('Attractions'),
			attraction = store.getById( id );
		
		//console.log( id, store, attraction );
		
		return attraction;
	}

		
});