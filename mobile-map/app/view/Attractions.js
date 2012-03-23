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
		
		itemTpl: '{title}',

		//ITEM DISCLOSURE GIVES LITTLE ARROW.  USE THAT TO GET DIRECTLY TO MAP
		//  http://www.sencha.com/forum/archive/index.php/t-152217.html?s=109dcbbce482464eff59cf213791b3d4
		//  control the disclose function in the controller (currently Attraction.js)
		onItemDisclosure: true

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