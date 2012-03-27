Ext.define('Mayfest.controller.Event', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			eventtabs: {
				selector: 'eventtabs',
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
	
	init: function(){

		Mayfest.ui.EventController = this;

		console.log( 'Event Controller Inited', Mayfest.ui.EventController );

        Ext.getStore('Events').on({
            //scope: this,

            beforeload: this.onBeforeEventsStoreLoad,
            load: this.onEventsStoreLoad
        });


//		Ext.getStore('EventCategories').on({
//			beforeload: this.onEventCategoriesBeforeLoad,
//			load: this.onEventCategoriesLoad
//		});


		this.control({
			'eventtabs': {
				initialize: 'onEventTabsInit',
				activeitemchange: 'onEventTabsActiveItemChange',
				//scope: this
			},
			'categoryselect': {
				change: this.onCatSelectChange
			}
		});



				
		var me = this;
		
		//Set up a template for the leaf
		//	.from method Creates a template from the passed element's value (display:none textarea, preferred) or innerHTML.
		//	Elements defined in index.php
//		Mayfest.ui.templates.attractionLeaf =	Ext.XTemplate.from(
//													Ext.get('attraction-leaf-template'),
//													{
//														getThumbnail: function( thumb ){
//															
//															var atts = thumb['app-thumb'];
//															console.log( 'GET THUMBNAIL', thumb );
//															
//															return '<img src="'+atts[0]+'" width="'+atts[1]+'" height="'+atts[2]+'" />';
//														},
//														hasName: function( first, last ){
//															return ( (first && first !== '') || (last && last !== '') ) ? true : false;
//														},
//														buildName: function( first, last ){
//															//fix those strings
//															var name = false;
//															
//															if( first && first !== '' ){
//																name = first;
//															}
//															if( last && last !== '' ){
//																if ( name ) {
//																	name += ' '+last;
//																} else {
//																	name = last;
//																}
//															}
//															
//															return name || '';
//														}
//													}
//												);
		
	},

//	onEventCategoriesBeforeLoad: function(){
//		console.log('onEventCategoriesBeforeLoad');
//	},
//	
//	onEventCategoriesLoad: function(){
//		console.log('onEventCategoriesLoad');
//		
//		console.log( this );
//	},

	//doesn't really fire cause it loads fast?
	onBeforeEventsStoreLoad: function(){
		console.log('controller.onBeforeEventsStoreLoad');
	},
	
	//to store the days in the system
	eventDays: {},
	eventDayKeys: [],
	currentDay: null,
	
	//Events are ready so make the panels
	onEventsStoreLoad: function(store, records, successful, operation, eOpts){
		//console.log('controller.onEventsStoreLoad', this, store, successful, operation, Mayfest.ui.EventController);		
		
		var items = store.getData().items,
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

				}
			}
			
			//day = null;
			//data = null;
		}
		
		//items = null;
		
		//sort the keys
		eventDayKeys.sort();
		
		console.log('event days', Mayfest.ui.EventController.eventDays, Mayfest.ui.EventController.eventDayKeys);
		
		//add the panels
		Mayfest.ui.EventController.addEventTabs();
		
	},
	
	addEventTabs: function(){
		//now add a panel for each of the days.
		//I am going to iterate and add() each item.  might be more efficient to set up the definitions first and the use setItems to add everything
		console.log( 'add an event panel', this, this.eventDays );
		
		for( var i=0; i < this.eventDayKeys.length; i++ ){
			var key = this.eventDayKeys[i],
				day = this.eventDays[key];
//				options = [
//					{text: 'All Categories', value: -1}
//				];


//				],
//				//store = Ext.create('Mayfest.store.EventList', {
//				store = Ext.create('Ext.data.Store', {
//					model: 'Mayfest.model.Event',
//					
//				});
			
			//set the data in the store
			//store.setData( day.items );
			
			//add in the options for the event categories
//			for ( var id in day.categories )
//				options.push( day.categories[id] );
				
			console.log( key, day );
			
			//add the panels
			this.getEventtabs().add([
				{
					id: key,
//					xtype: 'eventslist',
//					title: Ext.Date.format( day.items[0].data.date, 'D' )

					xtype: 'eventcategorieslist',
					title: Ext.Date.format( day.items[0].data.date, 'D' ),
					items: [

//						{
//				            xtype: 'fieldset',
//				            docked: 'top',
//				            //title: 'Select',
//				            items: [
//				                {
//				                    xtype: 'selectfield',
//				                    cls: 'catSelect',
//				                    label: 'Category',
//				                    options: options
//				                }
//				            ]			
//						},

						{
							xtype: 'eventslist'
							//store: store
						}
					]
					
				}
			]);
		}
		
		
		console.log('panels added', this.getEventtabs(), this.getCategorylists(), Ext.select('.catSelect') );
		
//		//attach some listeners
//		Ext.each( Ext.select('.catSelect').elements, function( item, index, allItems ){
//		
//			var id = Ext.fly( item ).dom.id,
//				select = Ext.getCmp( id );
//			
//			select.on({
//				change: this.onCatSelectChange 
//			});
//
//		}, this);
//				
	},
	
	processEventTabs: function( panel, i, allPanels ){
		console.log( 'process event tabs', this, panel, i );
	},

	onEventTabsActiveItemChange: function( tabPanel, panel, oldPanel ){
		
		//set the current day
		this.currentDay = this.eventDays[ panel.id ];
		//set the items in the store		
		Ext.getStore('EventList').setData( this.currentDay.items );
		//build the category select options
		this.buildCatSelectOptions();
		
		//console.log( 'onEventTabsActiveItemChange', this, tabPanel, panel, oldPanel, this.currentDay.items );
		console.log( 'onEventTabsActiveItemChange', this, tabPanel, panel, oldPanel, this.currentDay.items );
	},

	
	buildCatSelectOptions: function(){
		console.log( 'Build Cat Select Options' );
		
		var options = [
			{text: 'All Categories', value: -1}
		];

		for ( var id in this.currentDay.categories )
			options.push( this.currentDay.categories[id] );

		return this.getCategoryselect().setOptions( options );
	},


	onCatSelectChange: function(select, newValue, oldValue){
		console.log( 'onCatSelectChange', select, newValue, oldValue );
		
		//Ext.getStore('EventList')
	},
	
	onEventTabsInit: function(panel, eOpts){
		console.log('initing event tabs', this, panel, eOpts)
		
	},




//	
//	//use the disclose event to open directly to the map and stop the itemtap event
//	onAttractionDisclosure: function( list, record, target, index, e, eOpts ){
//		console.log( 'onAttractionDisclosure DISCLOSE EVENT FIRED', list, record, target, index, e, eOpts );
//		
//		e.stopPropagation();
//
//        this.currentAttraction = record.data;
//
//        this.currentAttraction.mapLocation = this.getAttractionLocation();
//
//		this.goToMapLocation();
//	},
//	onMapMeTap: function( evt, t, o ){
//		//console.log('YOU BETTER FIX THE FACT THAT THE EVENT CALLBACK GETS FIRED TWICE!!!  onMapMeTap', this.currentAttraction);
//		
//		Mayfest.ui.navBar.hide();
//
//		Mayfest.ui.nav.pop();		
//		
//		this.goToMapLocation();
//	},
//
//	goToMapLocation: function(){
//		
//		if( this.currentAttraction.mapLocation ){
//			
//			var location = this.currentAttraction.mapLocation.data;
//			
//			Mayfest.ui.mainPanel.setActiveItem( Mayfest.ui.map );
//			
//			Mayfest.ui.mapController.arrow = true;
//			Mayfest.ui.mapController.arrowDrawn = false;
//			Mayfest.ui.mapController.moveTo( location.mayfest_ml_x, location.mayfest_ml_y );
//
//		}
//
////		Mayfest.ui.nav.push( Mayfest.ui.map );
////		Mayfest.ui.navBar.show();
//	},
//
//	onMapMePress: function( evt, t, o ){
//		console.log('onMapMePress', this);
//	},
//
//	onAttractionLeafShow: function(leaf, opts){
//		Mayfest.ui.navBar.show();
//		//console.log('onAttractionsLEAFShow', this, leaf, nav );
//
//		var bttn = Ext.select('#mapMe');
//
//		if( bttn.elements.length && !leaf.hasBeenActivated ){
//			
//			leaf.hasBeenActivated = true;
//			
//			//think I need to make a reference to current scope
//			var me = this;
//			
//			//set handler on mapMe button
//			Ext.select('#mapMe').each(function(el){
//				el.clearListeners();
//				
//				el.on({
//					//touchstart: me.handlers.onMapMePress,
//					//touchend: me.handlers.onMapMePress,
//					//tap: function(evt, t, o){ me.handlers.onMapMeTap.apply(me, arguments); }
//					touchstart: me.onMapMePress,
//					touchend: me.onMapMePress,
//					tap: function(evt, t, o){ me.onMapMeTap.apply(me, arguments); }
//				});
//			});
//		}
//		console.log('onAttractionsLEAFShow', leaf, bttn);
//
//		
//		
//		
//	},
//	
//	onAttractionsListActivate: function(list, newActiveItem, oldActiveItem, eOpts){
//		console.log('onAttractionsListActivate', this, list, newActiveItem, oldActiveItem, eOpts);
//		
//		
//		//this is a lot of DOM querying, but it searches for a div printed out in the template, based on the existence of the map location.
//		//  if there is none, then the disclosure icon it removed.
//		var disclosures = Ext.select('#attractionsList .x-list-disclosure');
//		
//		if( disclosures.elements.length ){
////			var i = 0;
//			
//			disclosures.each( function( a, b ){
////				console.log(i+' a disclosure', this, this.getParent().down('.has_location'));
////				i++;
//				
//				if( !this.getParent().down('.has_location') )
//					this.hide();
//			});
//		}
//		
//	},
//
//	onAttractionsListRefresh: function( list, eOpts ){
//		console.log('onAttractionsListRefresh', this, list);
//		//console.log( 'list items', list.getItems() );
//	},
//	
//	onAttractionTap: function(dataview, index, target, record){
//		console.log('onAttractionTap', dataview, index, target, record );
//		
//		//this block from geo congress
//        if (this.currentAttraction == record.data) {
//            //Ext.getCmp('viewport').setActiveItem(1);
//            //return;
//        }
//
//        this.currentAttraction = record.data;
//
//        this.currentAttraction.mapLocation = this.getAttractionLocation();
//        
//        //console.log('this.currentAttraction.mapLocation', this.currentAttraction.mapLocation);
//        console.log('Mayfest.ui.nav', Mayfest.ui.nav, Mayfest.root.getNavigationBar() );
//        
//        //var attraction = Ext.getCmp('attractionLeaf');
//        
//        if( !Mayfest.ui.AttractionLeaf ){
//			Mayfest.ui.AttractionLeaf = Ext.create('Mayfest.view.AttractionLeaf');
//        }
//        
//        var view = Mayfest.ui.AttractionLeaf;
//        //Mayfest.ui.navBar.titleComponent.setTitle('herro');
//        //view.setTitle('herro');
//		
//		//console.log( 'title?', Mayfest.ui.navBar );
//		
//		//apply the record's data to the template
//		//set the templates returned html for the leaf
//		view.setHtml( Mayfest.ui.templates.attractionLeaf.apply( this.currentAttraction ) );
//		//push it into the nav view(shows it);
//		Mayfest.ui.nav.push( view );		
//	},
//	
//	//pass in map location id or default to currentLocation
//	getAttractionLocation: function( attraction_id ){		
//		var id = attraction_id || this.currentAttraction.mayfest_ml_uid;
//		
//		if( !id )
//			return null;
//
//		var store = Ext.getStore('Locations'),
//			location = store.getById( id );
//
//		//console.log('getLocationByAttractionID', store, this.currentAttraction, id, this);
//
//		return location;
//	}
	
		
});