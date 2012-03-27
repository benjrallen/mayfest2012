Ext.define('Mayfest.view.Events', {
	extend: 'Ext.List',
	
	//id: 'eventsList',
	
	xtype: 'eventslist',
	
	alias: 'widget.eventslist',
	
	config:{
		//title: 'Attraction',
		//iconCls: 'star',
		fullscreen: true,
		//html: 'herro',
		
		
		//store: 'CategoryEvents',
		
		itemTpl: 	'{title}',

		
		
		store: 'EventList',

		//grouped: true,
		
		//provides alphabet on the side
		//indexBar: true,

		//ITEM DISCLOSURE GIVES LITTLE ARROW.  USE THAT TO GET DIRECTLY TO MAP
		//  http://www.sencha.com/forum/archive/index.php/t-152217.html?s=109dcbbce482464eff59cf213791b3d4
		//  control the disclose function in the controller (currently Attraction.js)
		onItemDisclosure: true
		
		//itemTpl: '{name}',
		
		//store: 'Locations'
	}
	
//	initialize: function(){
//		//some init code etc...
//		this.fireEvent('render');
//		this.callParent();
//	}
});