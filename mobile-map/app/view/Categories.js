/*
Ext.define('Mayfest.view.Categories', {
	extend: 'Ext.List',
	
	xtype: 'categoriespage',
	
	id: 'categoriesPage',
	
	alias: 'widget.categorieslist',
	
	config:{
		title: 'Directory',
		//iconCls: 'star',
		iconCls: 'list',
		fullscreen: true,

		detailCard: {
			xtype: 'attractionslist'
		},

		itemTpl:	'<span class="title">{name}</span>',

		
		//grouped: true,
		
		//itemTpl: '{name}',
		
		store: 'OfflineCategories'
	},
	
	initialize: function(){
		//some init code etc...
		this.fireEvent('render');
		this.callParent();
	}
});


*/
Ext.define('Mayfest.view.Categories', {
	extend: 'Ext.Panel',
	//extend: 'Ext.navigation.View',

	//id: 'navigationView',
	xtype: 'categoriespage',
	id: 'categoriesPage',
	alias: 'widget.categoriespage',
	
	config: {
        autoDestroy: false,
		fullscreen: true,
		layout: 'card',
		title: 'Directory',
		iconCls: 'list',
		//tabBarPosition: 'bottom',	
		//title: 'Main Nav View',	
		//useTitleForBackButtonText: true,

		items: [
			{
				xtype: 'catnav'
			},
			{
				xtype: 'categorieslist'
			}
		]
	},
	
	initialize: function(){
		//some init code etc...
		this.fireEvent('render');
		this.callParent();
	}
	
});