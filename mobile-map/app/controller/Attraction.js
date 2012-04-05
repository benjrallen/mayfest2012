Ext.define('Mayfest.controller.Attraction', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mapButton: {
				selector: '#mapMe'
			},
			categoriespage: {
				selector: 'categoriespage'
				//autoCreate: true
			},
			catnav: {
				selector: 'catnav'
				//autoCreate: true
			},
			catNavBack: {
				selector: '#catNavBack'	
			},
			categorieslist: {
				selector: 'categorieslist'
			}
		},
		control: {
			'#attractionsList' : {
				activate: 'onAttractionsListActivate',
				itemtap: 'onAttractionTap',
				disclose: 'onAttractionDisclosure'
				//refresh: 'onAttractionsListRefresh'
			},
			
			'#attractionLeaf' : {
				show: 'onAttractionLeafShow'
			},
			'#mapMe' : {
				tap: 'onMapMeTap'
			},
			'#catNavBack': {
				tap: 'onCatNavBack'
			}
		}
	},
	
	init: function(){
		//console.log( 'Attractions Controller Inited' );
				
		var me = this;
		
		Mayfest.ui.AttractionController = this;

		
		//Set up a template for the leaf
		//	.from method Creates a template from the passed element's value (display:none textarea, preferred) or innerHTML.
		//	Elements defined in index.php
		Mayfest.ui.templates.attractionLeaf =	Ext.XTemplate.from(
													Ext.get('attraction-leaf-template'),
													{
//														getMapLocation: function(){
//															return Mayfest.ui.currentLocation;
//														},
														getThumbnail: function( thumb ){
															
															var atts = thumb['app-thumb'];
															console.log( 'GET THUMBNAIL', thumb );
															
															return '<img src="'+atts[0]+'" width="'+atts[1]+'" height="'+atts[2]+'" />';
														},
														hasName: function( first, last ){
															return ( (first && first !== '') || (last && last !== '') ) ? true : false;
														},
														buildName: function( first, last ){
															//fix those strings
															var name = false;
															
															if( first && first !== '' ){
																name = first;
															}
															if( last && last !== '' ){
																if ( name ) {
																	name += ' '+last;
																} else {
																	name = last;
																}
															}
															
															return name || '';
														}
													}
												);
		
		
		this.control({
//			categoriespage: {
//				render: this.onCatNavUIRender,
//				show: function(){
//					console.log('navigationview show');
//				},
//				push: this.onCatNavPush,
//				pop: this.onCatNavPop,
//				back: this.onCatNavBack,
//				activeItemChange: this.onCatNavActiveItemChange
//			},
			categorieslist: {
				activate: 'onCatListActivate',
				itemtap: 'onCatTap'
			}
		});
	},


	
	onCatNavUIRender: function(){
		
//		Mayfest.ui.nav = this.getNavui();
//		Mayfest.ui.navBar = Mayfest.ui.nav.getNavigationBar();
//		
//		//hide the navbar initially
//		Mayfest.ui.navBar.hide();
		
		
		console.log( 'onCatNavUIRender!', this, Mayfest.ui );
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

	onCatListActivate: function(list, newActiveItem, oldActiveItem, eOpts){
		console.log('onCatListActivate', this, list, newActiveItem, oldActiveItem, eOpts);
			
		//this is a lot of DOM querying, but it searches for a div printed out in the template, based on the existence of the map location.
		//  if there is none, then the disclosure icon it removed.
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
		
	},

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
			
			console.log( 'last of the list!' );
			
//			var cat_store = Ext.getStore('CategoryAttractions'),
//				//attractions = Ext.getStore('Attractions');
//				attractions = this.getAttractionsByCatID( term_id );
			var attractions = this.getAttractionsByCatID( target.term_id );
				
				//list runs off the following store.
				Ext.getStore('CategoryAttractions').setData( attractions.items );

		                
		        if( !Mayfest.ui.AttractionsList ){
					Mayfest.ui.AttractionsList = Ext.create('Mayfest.view.Attractions');
		        }
		        
		        		        
				//push it into the nav view(shows it);
				this.getCategoriespage().setActiveItem( Mayfest.ui.AttractionsList );
				
				//Mayfest.ui.nav.push( Mayfest.ui.AttractionsList );		
				//this.getCategoriespage().push( Mayfest.ui.AttractionsList );		
				//Mayfest.ui.navBar.show();
		} else {
			console.log('NOT A LEAF' );
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


		console.log( 'DO CAT NAV!', target.term_id, (target.term_id === 0) );

		
	},
	
	onCatTap: function(dataview, index, target, record){
		console.log('onCatTap', this, dataview, index, target, record, record.get('term_id') );
		
		//var term_id = record.get('term_id')
		var term_id = record.data.term_id;

		
		this.pushCatnav( record.data.term_id, record.data.name );

		//DESELECT THE TAPPED ITEM
		//http://stackoverflow.com/questions/5368188/sencha-touch-deselect-list-item
		setTimeout(function(){dataview.deselect(index);},50);
		//alert('HELLO!');
		//dataview.deselect(index);

	},
	
	getAttractionsByCatID: function( cat_id ){
		var store = Ext.getStore('OfflineAttractions'),
			attractions = store.queryBy(function( record, id ){
				if( record.data.attraction_category.length ){
					for (var i=0; i < record.data.attraction_category.length; i++){
						//check the category on the attraction item.  return true to add it to return from query						
						if ( record.data.attraction_category[i].term_id == cat_id ) {
							return true;
						}
						
						//return ( record.data.attraction_category[i].term_id == cat_id ? true : false );
					}
				}
				
				return false;
			});
		
		//console.log( 'getAttractionsByCatID', attractions );
		
		return attractions;
	},


	
	filterCategories: function( parent_id ){
		
		var store = this.getCategorieslist().getStore();
		store.clearFilter();
		store.filter([
			{
				filterFn: function(item) {
					return ( item.get('parent') === parent_id );
				}
			}
		]);

		console.log( 'FILTER CATEGORIES', parent_id, store, store.data.items.length );


		return ( store.data.items.length );
		
	},
	
	//use the disclose event to open directly to the map and stop the itemtap event
	onAttractionDisclosure: function( list, record, target, index, e, eOpts ){
		console.log( 'onAttractionDisclosure DISCLOSE EVENT FIRED', list, record, target, index, e, eOpts );
		
		e.stopPropagation();

        this.currentAttraction = record.data;

        //this.currentAttraction.mapLocation = this.getAttractionLocation();
        Mayfest.ui.currentLocation = this.getAttractionLocation();

		//this.goToMapLocation();
		Mayfest.ui.mapController.goToMapLocation();
	},
	onMapMeTap: function( evt, t, o ){
		//console.log('YOU BETTER FIX THE FACT THAT THE EVENT CALLBACK GETS FIRED TWICE!!!  onMapMeTap', this.currentAttraction);
		
		Mayfest.ui.navBar.hide();

		Mayfest.ui.nav.pop();		
		
		//this.goToMapLocation();
		Mayfest.ui.mapController.goToMapLocation();

	},

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

	onAttractionLeafShow: function(leaf, opts){
		//this.getCatnav().hide();
		
		Mayfest.ui.navBar.show();
		
		//var bttn = this.getMapButton();
		
		Mayfest.ui.currentLocation ?
			this.getMapButton().show() :
			this.getMapButton().hide();
		
		console.log('onAttractionsLEAFShow', this, leaf, this.getMapButton(), Mayfest.ui.currentLocation );
	},
	
	onAttractionsListActivate: function(list, newActiveItem, oldActiveItem, eOpts){
		//console.log('onAttractionsListActivate', this, list, newActiveItem, oldActiveItem, eOpts);
			
		//this is a lot of DOM querying, but it searches for a div printed out in the template, based on the existence of the map location.
		//  if there is none, then the disclosure icon it removed.
		var disclosures = Ext.select('#attractionsList .x-list-disclosure');
		
		if( disclosures.elements.length ){
//			var i = 0;
			
			disclosures.each( function( a, b ){
//				console.log(i+' a disclosure', this, this.getParent().down('.has_location'));
//				i++;
				
				if( !this.getParent().down('.has_location') )
					this.hide();
			});
		}
		
	},

//	onAttractionsListRefresh: function( list, eOpts ){
//		console.log('onAttractionsListRefresh', this, list);
//		//console.log( 'list items', list.getItems() );
//	},
	
	onAttractionTap: function(dataview, index, target, record){
		//console.log('onAttractionTap', dataview, index, target, record );
		
        this.currentAttraction = record.data;

        //this.currentAttraction.mapLocation = this.getAttractionLocation();
        
        Mayfest.ui.currentLocation = this.getAttractionLocation();
        
        //console.log('this.currentAttraction.mapLocation', this.currentAttraction.mapLocation);
        //console.log('Mayfest.ui.nav', Mayfest.ui.nav, Mayfest.root.getNavigationBar() );
        
        //var attraction = Ext.getCmp('attractionLeaf');
        
        if( !Mayfest.ui.AttractionLeaf ){
			Mayfest.ui.AttractionLeaf = Ext.create('Mayfest.view.AttractionLeaf');
        }
        
        var view = Mayfest.ui.AttractionLeaf;
        //Mayfest.ui.navBar.titleComponent.setTitle('herro');
        //view.setTitle('herro');
		
		//console.log( 'title?', Mayfest.ui.navBar );
		
		//apply the record's data to the template
		//set the templates returned html for the leaf
		view.setHtml( Mayfest.ui.templates.attractionLeaf.apply( this.currentAttraction ) );
		//push it into the nav view(shows it);
		Mayfest.ui.nav.push( view );		
	},
	
	//pass in map location id or default to currentLocation
	getAttractionLocation: function( attraction_id ){		
		var id = attraction_id || this.currentAttraction.mayfest_ml_uid;
		
		if( !id )
			return null;

		var store = Ext.getStore('OfflineLocations'),
			location = store.getById( id );

		//console.log('getLocationByAttractionID', store, this.currentAttraction, id, this);

		return location;
	}
	
		
});