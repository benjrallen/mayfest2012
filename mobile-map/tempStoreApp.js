Ext.Loader.setConfig({
	enabled: true
});

Ext.ns('W2');


Ext.define('W2.model.LocalSetting',{
    extend:'Ext.data.Model',
    config:{
        fields:['key','value']
    }
});


Ext.define('W2.store.LocalSettings',{
    extend:'Ext.data.Store',
    requires:['Ext.data.proxy.LocalStorage'],
    config:{
        model:'W2.model.LocalSetting',
        storeId:'LocalSettingsStore',
        proxy: {
            type: 'localstorage',
            id  : 'LocalSettingsStoreProxy'
        },
        autoLoad:true
    }
});


var undefined;
Ext.define('W2.controller.Cookie', 
{
    extend: 'Ext.app.Controller',
    config:{
        store:'LocalSettingsStore',
        stores:['LocalSettings']
    },
    
    init: function(){
    	this.setCookie('herro', 'herroValue');
    	this.setCookie('twime', 'twittamy');
    },
    
    applyStore:function(storeId)
    {
        var _store = Ext.StoreManager.lookup(storeId);
        if(!_store)
            {
                _store = Ext.create('W2.store.LocalSettings');
            }
        return _store;
    },
    setCookie : function (c_name,value)
    {
        var model,i = this.getStore().findExact('key',c_name);
        if(value!==undefined)
        {
            if(i!==-1)
                {
                    //update
                    model = this.getStore().getAt(i);
                    model.set('value',value);
                    this.getStore().sync();

                }else{
                    //add
                    this.getStore().add({key:c_name,value:value});
                    this.getStore().sync();

                }
        }else{
            //if exists and new value is undefined remove it
            if(i!==-1)
               this.removeCookie(c_name);
        }
    },
    getCookie : function(c_name)
    {
         var i = this.getStore().findExact('key',c_name);
        if(i!==-1)
        {
            return this.getStore().getAt(i).get('value');
        }
        return undefined;
    },

    removeCookie : function(c_name)
    {
        var i = this.getStore().findExact('key',c_name);
          if(i!==-1)
        {
            this.getStore().removeAt(i);
            this.getStore().sync();
        }
    }
});


Ext.application({	
	name: 'W2',

	
	controllers: ['W2.controller.Cookie'],

	
	models: ['W2.model.LocalSetting'],
	stores: [
		'W2.store.LocalSettings'
	],
	


			
	launch: function(){
		
		//Mayfest.root = Ext.create('Mayfest.view.Viewport');
		
		//Mayfest.root.setActiveItem(2, {type:'slide', direction:'left'});
		
		//console.log( 'launch', Mayfest.root.getItems() );
		
		
		
	}
});