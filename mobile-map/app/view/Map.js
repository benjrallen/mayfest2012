Ext.define('Mayfest.view.Map', {
	extend: 'Ext.form.Panel',
	
	xtype: 'canvasmap',
	id: 'canvasMap',
	
	config: {
		title: 'Map',
		iconCls: 'maps',
		
		fullscreen: true,
		//width: '100%',
		//height: '100%',
		
//		style: {
//			background: '#f4f',
//			position: 'relative'
//		},
		
		scrollable: false,
		
		layout: {
			type: 'vbox'
		},

		html: '<canvas id="canvas"></canvas>'+
              '<div id="cNavCont">'+
    	        '<div id="zoomIn" class="cNav plus">&plus;</div>'+
				'<div id="zoomOut" class="cNav minus">&minus;</div>'+
			  '</div>'
			  
			  
//		items: [
//			{
//				xtype: 'fieldset',
//				title: 'Contact Us',
//				instruction: 'Email is optional',
//				
//				items: [
//					{
//						xtype: 'textfield',
//						label: 'Name',
//						name: 'name'
//					},
//					{
//						xtype: 'emailfield',
//						label: 'Email',
//						name: 'email'
//					},
//					{
//						xtype: 'textareafield',
//						label: 'Message',
//						name: 'message'
//					}
//				]
//			},
//			{
//				xtype: 'button',
//				ui: 'confirm',
//				text: 'Send',
//				action: 'submitContact'
//			}
//		]
	}
});