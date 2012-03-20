Ext.Loader.setConfig({
	enabled: true
});

Ext.ns('Mayfest', 'Mayfest.data.remotePath', 'Mayfest.ui.nav', 'Mayfest.ui.navBar', 'Mayfest.ui.templates');

Mayfest.data.remotePath = 'http://gurustudev.com/~ben/mayfest2012/wp/wp-content/themes/mayfest2012/app_cache/';

Ext.application({	
	name: 'Mayfest',
	
	controllers: ['Main','Attraction'],

	views: ['Home', 'Products', 'Attractions', 'Categories', 'Contact', 'AttractionLeaf', 'MainUI'],
	
	models: ['Location', 'Attraction', 'Event', 'Category'],
	stores: ['Locations', 'Attractions', 'Events', 'Categories', 'CategoryAttractions'],
	
	launch: function(){
		
		Mayfest.root = Ext.create('Mayfest.view.Viewport');
		
		//Mayfest.root.setActiveItem(2, {type:'slide', direction:'left'});
		
		console.log( 'launch', Mayfest.root.getItems() );
	}
});