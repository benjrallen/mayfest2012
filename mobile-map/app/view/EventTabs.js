Ext.define('Mayfest.view.EventTabs', {
	extend: 'Ext.tab.Panel',
	//extend: 'Ext.navigation.View',

	xtype: 'eventtabs',

	id: 'eventTabs',

	alias: 'widget.eventtabs',
	
	config: {
		fullscreen: true,
		tabBarPosition: 'top',
		title: 'Events',
		iconCls: 'star',
		ui: 'mayfest',
		//iconCls: 'list',
				
		items: [

			{
	            xtype: 'fieldset',
	            docked: 'bottom',
	            //title: 'Select',
	            items: [
	                {
	                    xtype: 'selectfield',
	                    cls: 'catSelect',
			            id: 'eventCategorySelect',
	                    label: 'Category'
	                }
	            ]			
			}


//			{
//				xtype: 'eventcategorieslist',	
//
//				store: 'EventCategories',
//				
//		        displayField: 'name',
//		        
//		        // add a / for folder nodes in title/back button
//		        getTitleTextTpl: function() {
//		            return '{' + this.getDisplayField() + '}<tpl if="leaf !== true"></tpl>';
//		        },
//		        // add a / for folder nodes in the list
//		        getItemTextTpl: function(record) {
//		            return '{'+this.getDisplayField()+'}<tpl if="leaf !== true"></tpl>';
//		        }
//			}


		]
	}
	
	//initConfig: function(){
	//	console.log('viewport init', this);
	//}
});