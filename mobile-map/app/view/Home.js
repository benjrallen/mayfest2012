Ext.define('Mayfest.view.Home', {
	extend: 'Ext.Panel',
	
	xtype: 'homepanel',
	//alias: 'homepanel',
	
	config: {
		//fullscreen: true,
		title: 'Home',
		iconCls: 'mayfest-logo',
		cls: 'home',
		html: [
			'<h1>Hey, welcome home</h1>',
			'<p>This is some real html</p>'
		].join('')
	}
});