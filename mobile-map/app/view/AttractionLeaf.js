Ext.define('Mayfest.view.AttractionLeaf', {
	extend: 'Ext.Panel',
	
	xtype: 'attractionleaf',
	alias: 'widget.attractionleaf',
	
	id: 'attractionLeaf',
	
	config: {
		//fullscreen: true,
		title: 'Attraction',
		iconCls: 'attraction',
		cls: 'attraction',
				
		html: [
			'<h1>Hey, welcome home</h1>',
			'<p>This is some real html</p>'
		].join('')
	},
	
	
});