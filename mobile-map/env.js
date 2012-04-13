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
	//enabled: true
	enabled: false
});

//Ext.ns('Mayfest', 'Mayfest.paths', 'Mayfest.ui.nav', 'Mayfest.ui.navBar', 'Mayfest.ui.mainPanel', 'Mayfest.ui.map', 'Mayfest.ui.mapController', 'Mayfest.ui.EventController', 'Mayfest.ui.MainController','Mayfest.ui.AttractionController', 'Mayfest.ui.templates', 'Mayfest.ui.currentLocation', 'Mayfest.times.offlineTimeout');
Ext.ns('Mayfest', 'Mayfest.paths', 'Mayfest.ui.nav', 'Mayfest.ui.mainPanel', 'Mayfest.ui.map', 'Mayfest.ui.mapController', 'Mayfest.ui.EventController', 'Mayfest.ui.MainController','Mayfest.ui.AttractionController', 'Mayfest.ui.templates', 'Mayfest.ui.currentLocation', 'Mayfest.times.offlineTimeout');

Mayfest.times.offlineTimeout = 10000;

//alert( navigator.onLine );

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
};