Ext.Loader.setConfig({
	enabled: true
});

Ext.ns('Mayfest', 'Mayfest.paths', 'Mayfest.ui.nav', 'Mayfest.ui.navBar', 'Mayfest.ui.templates');

Mayfest.paths.base = function(){
	if( window.location.href.indexOf( 'gurustudev' ) > -1 ){
		//check for ben's or review repo
		return	( window.location.href.indexOf( 'review' ) > -1 ?
					'http://gurustudev.com/review/mayfest2012/' :
					'http://gurustudev.com/~ben/mayfest2012/'
				);
	} else {
		return 'http://www.tulsamayfest.org/';
	}
};

//Mayfest.data.remotePath = 'http://gurustudev.com/~ben/mayfest2012/wp/wp-content/themes/mayfest2012/app_cache/';
//Mayfest.data.remotePath = function(){
Mayfest.paths.data = function(){
	
	return Mayfest.paths.base() + 'wp/wp-content/themes/mayfest2012/app_cache/';
}

Ext.application({	
	name: 'Mayfest',
	
	controllers: ['Main','Attraction','Map'],

	views: ['Home', 'Products', 'Attractions', 'Categories', 'Map', 'AttractionLeaf', 'MainUI'],
	
	models: ['Location', 'Attraction', 'Event', 'Category'],
	stores: ['Locations', 'Attractions', 'Events', 'Categories', 'CategoryAttractions'],
	
	viewport: {
		//hide the browser bar
		autoMaximize: true,		
	},
	
	launch: function(){
		
		Mayfest.root = Ext.create('Mayfest.view.Viewport');
		
		//Mayfest.root.setActiveItem(2, {type:'slide', direction:'left'});
		
		console.log( 'launch', Mayfest.root.getItems() );
		
		
		
//		Ext.override(Ext.navigation.Bar, {
//		    getNavigationBarProxyProperties: function () {
//		        return {
//		            title: {
//		                left: this.proxy.titleComponent.renderElement.getLeft()
//		            },
//		            backButton: {
//		                left: this.proxy.backButton.renderElement.getLeft(),
//		                width: this.proxy.backButton.renderElement.getWidth()
//		            }
//		        };
//		    }
//		});
	}
});