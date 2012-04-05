Ext.define('Mayfest.controller.Attraction', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mapButton: {
				selector: '#mapMe'
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