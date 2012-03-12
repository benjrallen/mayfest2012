Ext.define('Mayfest.view.Viewport', {
	//extend: 'Ext.tab.Panel',
	extend: 'Ext.navigation.View',

	//id: 'navigationView',
	xtype: 'navui',
	
	alias: 'widget.ui',
	
	config: {
        autoDestroy: false,
		fullscreen: true,
		//tabBarPosition: 'bottom',	
		title: 'Main Nav View',	
		//useTitleForBackButtonText: true,		
		
        navigationBar: {
            //ui: 'sencha',
            items: [
//                {
//                    xtype: 'button',
//                    id: 'editButton',
//                    text: 'Edit',
//                    align: 'right',
//                    hidden: true,
//                    hideAnimation: Ext.os.is.Android ? false : {
//                        type: 'fadeOut',
//                        duration: 200
//                    },
//                    showAnimation: Ext.os.is.Android ? false : {
//                        type: 'fadeIn',
//                        duration: 200
//                    }
//                },
//                {
//                    xtype: 'button',
//                    id: 'saveButton',
//                    text: 'Save',
//                    ui: 'sencha',
//                    align: 'right',
//                    hidden: true,
//                    hideAnimation: Ext.os.is.Android ? false : {
//                        type: 'fadeOut',
//                        duration: 200
//                    },
//                    showAnimation: Ext.os.is.Android ? false : {
//                        type: 'fadeIn',
//                        duration: 200
//                    }
//                }
            ]
        },


		items: [
			{
				xtype: 'mainui'
			}
		]
	},
	
	initialize: function(){
		//some init code etc...
		this.fireEvent('render');
		this.callParent();
	}
	
	
	//initConfig: function(){
	//	console.log('viewport init', this);
	//}
});