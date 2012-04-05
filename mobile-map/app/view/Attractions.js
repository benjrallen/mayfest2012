Ext.define('Mayfest.view.Attractions', {
	extend: 'Ext.List',
	
	id: 'attractionsList',
	
	xtype: 'attractionslist',
	
	alias: 'widget.attractionslist',
	
	config:{
		title: 'Attraction',
		//iconCls: 'star',
		//fullscreen: true,
		//html: 'herro',
		
		store: 'CategoryAttractions',
		
		itemTpl: 	'<tpl if="mayfest_ml_uid">'+
						'<div class="has_location"></div>'+
					'</tpl>'+
					'{title}',

//				<tpl if="this.hasName( values.mayfest_att_first_name, values.mayfest_att_last_name )">
//					<div class="field">
//						<label>Name:</label>
//						<span>{[ this.buildName( values.mayfest_att_first_name, values.mayfest_att_last_name ) ]}</span>
//					</div>
//				</tpl>


		grouped: true,
		
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