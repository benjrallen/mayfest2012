Ext.define('Mayfest.view.Attractions', {
	extend: 'Ext.List',
	
	id: 'attractionsList',
	
	xtype: 'attractionslist',
	
	alias: 'widget.attractionslist',
	
	config:{
		//title: 'Attraction',
		//iconCls: 'star',
		//fullscreen: true,
		//html: 'herro',
		
		store: 'CategoryAttractions',
		
		itemTpl: '{title}'

		//grouped: true,
		
		//itemTpl: '{name}',
		
		//store: 'Locations'
	}
	
//	initialize: function(){
//		//some init code etc...
//		this.fireEvent('render');
//		this.callParent();
//	}
});