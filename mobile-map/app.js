/*
http://www.sencha.com/forum/showthread.php?190001-Ajax-request-returns-success-when-no-server-and-when-cross-site-blocked

Ajax request returns success when no server and when cross-site blocked

I am porting a ST1 application and have run into a surprising change in ST2. When I issue an Ext.Ajax.request to a URL and it returns a status of 0, ST2 now considers that to be a success. (ST1 considered it a failure).

It is a bit heavy handed, but this is what I am doing for now. It will go back to ST1 behavior of treating status 0 as a failure.
*/

Ext.define('Ext.overrides.Connection', {
	override: 'Ext.data.Connection',
	
	parseStatus: function(status) {
		var ret_val = this.callParent(arguments);
		
		if(0 === status) {
			ret_val.success = false;
			//console.log('set to fail');
		}
		
		return ret_val;
	}
});





Ext.Loader.setConfig({
	enabled: true
});

Ext.ns('Mayfest', 'Mayfest.paths', 'Mayfest.ui.nav', 'Mayfest.ui.navBar', 'Mayfest.ui.mainPanel', 'Mayfest.ui.map', 'Mayfest.ui.mapController', 'Mayfest.ui.EventController', 'Mayfest.ui.MainController','Mayfest.ui.AttractionController', 'Mayfest.ui.templates', 'Mayfest.ui.currentLocation', 'Mayfest.times.offlineTimeout');

Mayfest.times.offlineTimeout = 2000;

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
	
	controllers: ['Main','Attraction','Map', 'Event'],

	views: [
		'Home', 
		//'Products', 
		'Attractions', 
		'Categories', 
		//'CategoriesListNav',
		'CategoriesNav',
		'CategoriesList', 
		'EventTabs', 
		//'EventCategories',
		'Events', 
		'Map', 
		'AttractionLeaf', 
		'MainUI'
		//'CategoryFieldSelect'
	],
	
	models: ['Location', 'Attraction', 'Event', 'Category'],
	stores: [
		'Locations',
		'OfflineLocations',
		'Attractions', 
		'OfflineAttractions', 
		'EventList', 
		'OfflineEvents', 
		'Events', 
		'Categories', 
		'OfflineCategories', 
		'CategoryAttractions', 
		'CategoryEvents'
	],
	
	viewport: {
		//hide the browser bar
		autoMaximize: true	
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