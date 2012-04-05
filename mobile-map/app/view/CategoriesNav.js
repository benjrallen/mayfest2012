Ext.define('Mayfest.view.CategoriesNav', {
	extend: 'Ext.Toolbar',
	
	xtype: 'catnav',
	
	id: 'catNav',
	
	alias: 'widget.catnav',
	
	config:{
		title: 'cat nav',
		//iconCls: 'star',
		//iconCls: 'list',
		//fullscreen: true,

		docked: 'top',

		items: [
               {
                   xtype: 'button',
                   id: 'catNavBack',
                   text: 'Back',
                   ui: 'back',
                   //align: 'right',
                   //hidden: true,
                   hideAnimation: Ext.os.is.Android ? false : {
                       type: 'fadeOut',
                       duration: 200
                   },
                   showAnimation: Ext.os.is.Android ? false : {
                       type: 'fadeIn',
                       duration: 200
                   }
               }
		]
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