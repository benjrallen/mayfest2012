Ext.define('Mayfest.view.CategoryFieldSelect', {
	extend: 'Ext.field.Select',
	
	id: 'categoryFieldSelect',
	
	xtype: 'categoryfieldselect',
	
	alias: 'widget.categoryfieldselect',
	
	config:{
		
		items: [
			{
	            xtype: 'selectfield',
	            label: 'Category'
			}
		]
		
	}
});

/*
					items: [
						{
				            xtype: 'fieldset',
				            //title: 'Select',
				            items: [
				                {
				                    xtype: 'selectfield',
				                    label: 'Category',
				                    options: options
				                }
				            ]			
						},
						{
							xtype: 'panel',
							html: 'herro event panel'
						}
					]
*/