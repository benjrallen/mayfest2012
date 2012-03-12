Ext.define('Mayfest.view.Contact', {
	extend: 'Ext.form.Panel',
	
	xtype: 'contactform',
	id: 'contactForm',
	
	config: {
		title: 'Contact Us',
		iconCls: 'user',
		
		layout: {
			type: 'vbox'
		},
		
		items: [
			{
				xtype: 'fieldset',
				title: 'Contact Us',
				instruction: 'Email is optional',
				
				items: [
					{
						xtype: 'textfield',
						label: 'Name',
						name: 'name'
					},
					{
						xtype: 'emailfield',
						label: 'Email',
						name: 'email'
					},
					{
						xtype: 'textareafield',
						label: 'Message',
						name: 'message'
					}
				]
			},
			{
				xtype: 'button',
				ui: 'confirm',
				text: 'Send',
				action: 'submitContact'
			}
		]
	}
});