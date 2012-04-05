Ext.define('Mayfest.view.Viewport', {
	//extend: 'Ext.tab.Panel',
	extend: 'Ext.navigation.View',

	//id: 'navigationView',
	xtype: 'navui',
	
	alias: 'widget.ui',
	
	config: {
        autoDestroy: false,
		fullscreen: true,
		//tabBarPosition: 'bottom',	
		//title: 'Main Nav View',	
		//useTitleForBackButtonText: true,		
				
		masked: {
			xtype: 'loadmask',
			message: 'Loading...'
		},

		items: [
			{
				xtype: 'mainui'
			}
		]
	},
	
	initialize: function(){
		//some init code etc...
		this.fireEvent('render');
		this.callParent();
	}
	
	
	//initConfig: function(){
	//	console.log('viewport init', this);
	//}
});