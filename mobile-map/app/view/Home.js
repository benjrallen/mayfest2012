Ext.define('Mayfest.view.Home', {
	extend: 'Ext.Panel',
	
	xtype: 'homepanel',
	//alias: 'homepanel',
		
	config: {
		fullscreen: true,
		title: 'Home',
		iconCls: 'mayfest-logo',
		cls: 'home',
		//layout: 'fit',
		html: [
			'<div class="line"></div>',
			'<div class="home-wrap">',
				'<div class="logo">',
					'<h1>Mayfest Mobile</h1>',
					'<p>Event Guide, Directory, & Interactive Map</p>',
				'</div>',
				'<div class="sponsored-by">',
					'<h2>Sponsored by:</h2>',
					'<a href="http://gurustugroup.com" target="_blank" title="GuRuStu - Branding, Marketing, & Web Design">GuRuStu - Branding, Marketing, & Web Design</a>',
				'</div>',
			'</div>'
		].join('')
	}
});