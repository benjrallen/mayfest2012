Ext.define('Mayfest.view.Viewport', {
	extend: 'Ext.Panel',
	//extend: 'Ext.navigation.View',

	//id: 'navigationView',
	//xtype: 'navui',
	
	//alias: 'widget.navui',
	
	config: {
        autoDestroy: false,
		fullscreen: true,
		layout: 'card',
		//tabBarPosition: 'bottom',	
		//title: 'Main Nav View',	
		//useTitleForBackButtonText: true,		
				
		masked: {
			xtype: 'loadmask',
			message: 'Loading...'
		},

		items: [
			{
				xtype: 'navui'	
			},
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