Ext.define('Mayfest.view.EventCategories', {
	extend: 'Ext.Panel',
	
	xtype: 'eventcategorieslist',
	
	alias: 'widget.eventcategorieslist',
	
	config:{
		//title: 'Events',
		//iconCls: 'star',
		fullscreen: true,
		
		
		layout: 'card',
		
		
		cls: 'catListPanel'
		
	},
	
	initialize: function(){
		//some init code etc...
		this.fireEvent('render');
		this.callParent();
	}
});