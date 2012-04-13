Ext.define('Mayfest.view.AttractionLeaf', {
	extend: 'Ext.Panel',
	
	xtype: 'attractionleaf',
	alias: 'widget.attractionleaf',
	
	id: 'attractionLeaf',
	
	config: {
		//fullscreen: true,
		title: 'Details',
		iconCls: 'attraction',
		cls: 'attraction',
		styleHtmlContent: true,
		scrollable: {
			direction: 'vertical',
			directionLock: true
		},
		items: [
			{
				xtype: 'button',
				ui: 'mayfest round',
				id: 'mapMe',
				text: 'Map',
				right: '1em',
				top: '1em'
			}
		]
				
	}
	
	
});