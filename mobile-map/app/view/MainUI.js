Ext.define('Mayfest.view.MainUI', {
	extend: 'Ext.tab.Panel',
	//extend: 'Ext.navigation.View',

	xtype: 'mainui',

	id: 'mainUI',

	alias: 'widget.mainui',
	
	config: {
		fullscreen: true,
		tabBarPosition: 'bottom',
		
		items: [
			{
				xtype: 'homepanel'
			},
			{
				xtype: 'categoriespage',
				
				//id: 'categoriesList',	        

				store: 'Categories',
				
		        displayField: 'name',
		        
		        // add a / for folder nodes in title/back button
		        getTitleTextTpl: function() {
		            return '{' + this.getDisplayField() + '}<tpl if="leaf !== true"></tpl>';
		        },
		        // add a / for folder nodes in the list
		        getItemTextTpl: function(record) {
		            return '{'+this.getDisplayField()+'}<tpl if="leaf !== true"></tpl>';
		        }
		        
			},
			{
				xtype: 'productspage'	
			},
			{
				xtype: 'canvasmap'
			}
		]
	}
	
	//initConfig: function(){
	//	console.log('viewport init', this);
	//}
});