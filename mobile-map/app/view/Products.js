Ext.define('Mayfest.view.Products', {
	extend: 'Ext.Carousel',

	xtype: 'productspage',
	
	config: {
		title: 'Product',
		iconCls: 'product',
		
		items: [
			{
				xtype: 'image',
				src: 'resources/images/colors.jpeg'
			},
			{
				xtype: 'image',
				src: 'resources/images/underground.jpeg'
			},
			{
				xtype: 'image',
				src: 'resources/images/athird.jpeg'
			}
		]
	}
});