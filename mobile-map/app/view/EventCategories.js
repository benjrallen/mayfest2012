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

//		items: [
//			{
//				xtype: 'eventslist'
//			}
//		]



//		detailCard: {
//			xtype: 'eventslist'
//		}
		
		//grouped: true,
		
		//itemTpl: '{name}',
		
		//store: 'Locations'
		
		
	},
	
	initialize: function(){
		//some init code etc...
		this.fireEvent('render');
		this.callParent();
	}
});