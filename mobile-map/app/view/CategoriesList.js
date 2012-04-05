
Ext.define('Mayfest.view.CategoriesList', {
	extend: 'Ext.List',
	
	xtype: 'categorieslist',
	
	id: 'categoriesList',
	
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



//Ext.define('Mayfest.view.Categories', {
//	extend: 'Ext.NestedList',
//	
//	xtype: 'categoriespage',
//	
//	alias: 'widget.categorieslist',
//	
//	config:{
//		title: 'Directory',
//		//iconCls: 'star',
//		iconCls: 'list',
//		fullscreen: true,
//
//		detailCard: {
//			xtype: 'attractionslist'
//		}
//		
//		//grouped: true,
//		
//		//itemTpl: '{name}',
//		
//		//store: 'Locations'
//	},
//	
//	initialize: function(){
//		//some init code etc...
//		this.fireEvent('render');
//		this.callParent();
//	}
//});