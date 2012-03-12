Ext.define('Mayfest.controller.Attraction', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
		},
		control: {
			'#attractionsList' : {
				activate: 'onAttractionsListShow',
				itemtap: 'onAttractionTap'
			},
			'#attractionLeaf' : {
				activate: 'onAttractionLeafShow'
			}
		}
	},
	
	init: function(){
		

		console.log( 'Attractions Controller Inited' );
		
		
//		this.control({
//			'categorieslist': {
//				render: this.onCategoriesListRender,
//				show: function(){
//					console.log('categorieslist show');
//				},
//				leafitemtap: this.onCategoriesLeafitemtap,
//				itemtap: this.onCategoriesItemTap
//			}
//		});
		
		//test out auto loading of component in the code.
		//console.log( 'controller init', Mayfest, this.getStores() );
		var me = this;
		//console.log( 'controller init 2', me.getViewport(), Ext.getCmp('viewport'), me.getContactForm(),me.getAttractionslist() );
		//setTimeout( function(){ console.log( 'controller init timeout', me.getViewport(), Ext.getCmp('viewport'), me.getContactForm(),me.getAttractionslist() ); }, 0 );
	},

	onAttractionLeafShow: function(a, b){
		Mayfest.ui.navBar.show();
		console.log('onAttractionsLEAFShow', this, a, b);
	},
	
	onAttractionsListShow: function(a,b){
		console.log('onAttractionsListShow', this, a, b);
	},
	
	onAttractionTap: function(dataview, index, target, record){
		console.log('onAttractionTap', dataview, index, target, record );
		
		//this block from geo congress
        if (this.currentAttraction == record.data) {
            //Ext.getCmp('viewport').setActiveItem(1);
            //return;
        }

        this.currentAttraction = record.data;

        this.currentAttraction.mapLocation = this.getAttractionLocation();
        
        console.log('this.currentAttraction.mapLocation', this.currentAttraction.mapLocation);
        
        //var attraction = Ext.getCmp('attractionLeaf');
        
        if( !Mayfest.ui.AttractionLeaf ){
			Mayfest.ui.AttractionLeaf = Ext.create('Mayfest.view.AttractionLeaf');
        }
        
        var view = Mayfest.ui.AttractionLeaf;
        //view.setData(this.currentAttraction);


		Mayfest.ui.nav.push( view );
		

		console.log( Mayfest.ui.nav.getItems() );

		//view.show();  


//        
//        Ext.getStore('Locations').load({
//            params: {
//                bioguide_id: this.currentLegislator.bioguide_id
//            }
//        });
//
//        var legislator = Ext.getCmp('legislatorTabPanel');
//        Ext.getCmp('splashScreen').animateTo('left');
//
//        if (legislator) {
//            legislator.setData(this.currentLegislator);
//            Ext.getCmp('viewport').setActiveItem(1);
//        } else {
//            Ext.getCmp('viewport').setActiveItem({
//                xclass: 'GeoCon.view.legislator.TabPanel'
//            });
//        }
//
//        Ext.getCmp('legislatorBio').setData(this.currentLegislator);
//        Ext.getCmp('legislatorToolbar').setTitle(this.currentLegislator.title + " " + this.currentLegislator.lastname)
//        Ext.getCmp('legislatorTabPanel').setActiveItem(0);
	},
	
	//pass in map location id or default to currentLocation
	getAttractionLocation: function( attraction_id ){		
		var id = attraction_id || this.currentAttraction.mayfest_ml_uid;
		
		if( !id )
			return null;

		var store = Ext.getStore('Locations'),
			location = store.getById( id );

		//console.log('getLocationByAttractionID', store, this.currentAttraction, id, this);

		return location;
	}
	
		
});