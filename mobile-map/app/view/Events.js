Ext.define('Mayfest.view.Events', {
	extend: 'Ext.List',
	
	id: 'eventsList',
	
	xtype: 'eventslist',
	
	alias: 'widget.eventslist',
	
	config:{
		//title: 'Attraction',
		//iconCls: 'star',
		fullscreen: true,
		//html: 'herro',
		
		
		//store: 'CategoryEvents',
//		itemTpl: 	'<tpl if="mayfest_attraction_uid">'+
//						'<div class="has_location"></div>'+
//					'</tpl>'+
//					'{title}',
		itemTpl: new Ext.XTemplate(
//			'<tpl if="this.hasLocation( values.mayfest_attraction_uid )">'+
//				'<div class="has_location"></div>'+
//			'</tpl>'+
			'<span class="title">{title}</span>'+
					'{[ this.getEventGenres(values.genre) ]}'+
					'{[ this.getEventAttraction(values.mayfest_attraction_uid) ]}'+
			
//			'<div class="meta">'+
//				'<span class="evtTime">'+
//					'{mayfest_event_time}'+
//				'</span>'+
				//'<span class="evtLoc">'+
					//'{[ this.getEventAttraction(values.mayfest_attraction_uid) ]}'+
				//'</span>'+
				'<div class="clear"></div>',
//			'</div>',
			//'{title}',
			
			{
				compiled: true,
				getEventGenres: function( genre ){
					//console.log('GENRE', genre );
					
					var s = '';
					
					if( !genre.length )
						return s;
					
					for( var i=0; i<genre.length; i++ ){
						if( i > 0 )
							s += ', ';
							
						s += genre[i].name;
					}
					
					return '<span class="evtGen">'+s+'</span>';
				},
				getEventAttraction: function( attraction_id ){
					//console.log( 'ATTRACTION?', this, attraction_id,  Mayfest.ui.EventController.getEventAttraction( attraction_id ) );
					
					var attraction = Mayfest.ui.EventController.getEventAttraction( attraction_id );
					
					return ( attraction ? 
								//'<span class="evtSep">@</span><span class="evtAtt">'+attraction.data.title+'</span>' :
								'<span class="evtAtt">'+attraction.data.title+'</span>' :
								'<span class="evtAtt">?</span>'
							);
				}
				
			}
		),

		
		
		store: 'EventList',
		//store: 'OfflineEvents',

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