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
	
	init: function(){

		Mayfest.ui.EventController = this;

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
		Mayfest.ui.templates.eventLeaf =	new Ext.XTemplate(
			'<article id="{id}" class="leaf">'+
				'<h2>{title}</h2>'+
				'<tpl if="event_category.length">'+
					'<div class="entry-cat field">'+
						'<tpl for="event_category">'+
							'<span class="tax" term_id="{term_id}">{name}{[ xindex < xcount ? \', \' : \'\' ]}</span>'+
						'</tpl>'+
						'<span class="sep">: </span>'+
					'</div>'+
				'</tpl>'+
				'<tpl if="genre.length">'+
					'<div class="entry-tag field">'+
						'<tpl for="genre">'+
							'<span class="tax" term_id="{term_id}">{name}{[ xindex < xcount ? \', \' : \'\' ]}</span>'+
						'</tpl>'+
					'</div>'+
				'</tpl>'+
				'<tpl if="thumbnail != \'\'">'+
					'<div class="pic">'+
						'{[ this.getThumbnail( values.thumbnail ) ]}'+
					'</div>'+
				'</tpl>'+
				'<div class="entry-meta">'+
					'<tpl if="this.hasDate( values.date )">'+
						'<div class="field">'+
							'<label>When:</label>'+
							'<span>{[ this.buildDate( values.date ) ]}</span>'+
						'</div>'+
					'</tpl>'+
					'<tpl if="mayfest_attraction_uid && mayfest_attraction_uid != \'\'">'+
						'<div class="field">'+
							'<label>Where:</label>'+
							'<span>{[ this.buildAttraction( values.mayfest_attraction_uid ) ]}</span>'+
						'</div>'+
					'</tpl>'+
					'<tpl if="this.hasName( values.mayfest_att_first_name, values.mayfest_att_last_name )">'+
						'<div class="field">'+
							'<label>Name:</label>'+
							'<span>{[ this.buildName( values.mayfest_att_first_name, values.mayfest_att_last_name ) ]}</span>'+
						'</div>'+
					'</tpl>'+
					'<tpl if="this.hasName( values.mayfest_att_first_name_partner, values.mayfest_att_last_name_partner )">'+
						'<div class="field">'+
							'<label>Partner:</label>'+
							'<span>{[ this.buildName( values.mayfest_att_first_name_partner, values.mayfest_att_last_name_partner ) ]}</span>'+
						'</div>'+
					'</tpl>'+
				'</div>'+
				'<div class="entry-content">'+
					'{content}'+
				'</div>'+
			'</article>',
			{
				getThumbnail: function( thumb ){
					
					var atts = thumb['app-thumb'];
					//console.log( 'GET THUMBNAIL', thumb );
					
					return '<img src="'+atts[0]+'" width="'+atts[1]+'" height="'+atts[2]+'" />';
				},
//				getValues: function( values ){
//					
//					console.log( 'VALUES', values );
//				},
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
	
	//use this to check for the existence of the attractions store data
	checkAttractionStoreData: function(){
		
		var controller = Mayfest.ui.EventController;
		//console.log('controller.onOfflineEventsLoad', this, store, records, successful, operation, Mayfest.ui.EventController);		

		if( controller.offlineAttractionStoreLoaded ){
			
			//console.log('attraction STORE LOADED');
			return controller.processEventData();
		} else {
			//console.log( 'LOOKING!!!!!!!' );
			setTimeout( controller.checkAttractionStoreData, 25 );
		}
	},

	processEventData: function(){
		//console.log( 'process event data', this );

		var items = Ext.getStore('OfflineEvents').getData().items,
			eventDays = Mayfest.ui.EventController.eventDays,
			eventDayKeys = Mayfest.ui.EventController.eventDayKeys;
					
		if ( items && items.length ){
			for ( var i=0; i< items.length; i++ ){
				
				var data = items[i].data;
				
				//console.log( data );
				
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
		//console.log('onListItemTap', dataview, index, target, record );
		
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
		
		//console.log('GET EVENT LOCATION', store, attraction, id);
		
		if( !attraction.data || !attraction.data.mayfest_ml_uid )
			return null;
				
		store = null;
		return Mayfest.ui.AttractionController.getAttractionLocation( attraction.data.mayfest_ml_uid );;
	},

	//eventAttractions: {},
	
	getEventAttraction: function( attraction_id ){
		var id = attraction_id;
		
		//console.log('GET EVENT ATTRACTION', attraction_id);
		
		if( !id )
			return null;
		
		var store = Ext.getStore('OfflineAttractions'),
			attraction = store.getById( id );
		
		//console.log( id, store, attraction );
		
		return attraction;
	}

		
});