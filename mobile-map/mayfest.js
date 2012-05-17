Ext.Loader.setConfig({Ext:"sdk/src",enabled:!0});Ext.define("Ext.overrides.Connection",{override:"Ext.data.Connection",parseStatus:function(a){var c=this.callParent(arguments);if(0===a)c.success=!1;return c}});Ext.ns("Mayfest","Mayfest.paths","Mayfest.ui.nav","Mayfest.ui.navBar","Mayfest.ui.mainPanel","Mayfest.ui.map","Mayfest.ui.mapController","Mayfest.ui.EventController","Mayfest.ui.MainController","Mayfest.ui.AttractionController","Mayfest.ui.templates","Mayfest.ui.currentLocation","Mayfest.times.offlineTimeout");
Mayfest.times.offlineTimeout=25E3;Mayfest.paths.isDeployed=function(){return window.location.href.indexOf("gurustudev")<0&&window.location.href.indexOf("localhost")<0};Mayfest.paths.base=function(){return window.location.href.indexOf("gurustudev")>-1?window.location.href.indexOf("review")>-1?"http://gurustudev.com/review/mayfest2012/":"http://gurustudev.com/~ben/mayfest2012/":window.location.href.indexOf("localhost")>-1?"http://gurustudev.com/~ben/mayfest2012/":"http://www.tulsamayfest.org/"};
Mayfest.paths.data=function(){return Mayfest.paths.base()+"wp/wp-content/themes/mayfest2012/app_cache/"};
Ext.application({name:"Mayfest",requires:["Ext.MessageBox","Mayfest.view.Viewport","Ext.form.FieldSet","Ext.field.Select"],controllers:["Main","Attraction","Map","Event"],views:"Home,Attractions,Categories,CategoriesNav,CategoriesList,EventTabs,EventCategories,Events,Map,AttractionLeaf,MainUI".split(","),models:["Location","Attraction","Event","Category"],stores:"Locations,OfflineLocations,Attractions,OfflineAttractions,EventList,OfflineEvents,Events,Categories,OfflineCategories,CategoryAttractions,CategoryEvents".split(","),viewport:{autoMaximize:!0},
icon:{57:"resources/icons/Icon.png",72:"resources/icons/Icon~ipad.png",114:"resources/icons/Icon@2x.png",144:"resources/icons/Icon~ipad@2x.png"},phoneStartupScreen:"resources/loading/Homescreen.jpg",tabletStartupScreen:"resources/loading/Homescreen~ipad.jpg",launch:function(){Ext.fly("appLoadingIndicator").destroy();Mayfest.root=Ext.create("Mayfest.view.Viewport")},onUpdated:function(){Ext.Msg.confirm("Application Update","This application has just successfully been updated to the latest version. Reload now?",
function(){window.location.reload()})}});Ext.define("Mayfest.model.Attraction",{extend:"Ext.data.Model",config:{fields:[{name:"id",type:"int"},{name:"content",type:"string"},{name:"title",type:"string"},{name:"mayfest_att_first_name",type:"string"},{name:"mayfest_att_last_name",type:"string"},{name:"mayfest_att_first_name_partner",type:"string"},{name:"mayfest_att_last_name_partner",type:"string"},{name:"mayfest_att_city",type:"string"},{name:"mayfest_att_state",type:"string"},{name:"mayfest_ml_uid",type:"int"},{name:"attraction_category",
type:"auto"},{name:"genre",type:"auto"},{name:"thumbnail",type:"auto"},{name:"raw_id",type:"int"}]}});Ext.define("Mayfest.model.Category",{extend:"Ext.data.Model",config:{fields:[{name:"term_id",type:"int"},{name:"term_group",type:"int"},{name:"name",type:"string"},{name:"parent",type:"int"},{name:"slug",type:"string"},{name:"taxonomy",type:"string"},{name:"term_taxonomy_id",type:"int"},{name:"id",type:"int",convert:function(a,c){return c.data.term_id}},{name:"raw_id",type:"int"}]}});Ext.define("Mayfest.model.Event",{extend:"Ext.data.Model",config:{fields:[{name:"id",type:"int"},{name:"content",type:"string"},{name:"title",type:"string"},{name:"mayfest_event_day",type:"string"},{name:"mayfest_event_time",type:"string"},{name:"mayfest_attraction_uid",type:"int"},{name:"date",type:"date",dateFormat:"m-d-Y g:iA",convert:function(a,c){if(c.data.mayfest_event_day&&c.data.mayfest_event_day!==""){var b=c.data.mayfest_event_day;!c.data.mayfest_event_time||c.data.mayfest_event_time===
""?b+=" 12:01AM":b+=" "+c.data.mayfest_event_time;return Ext.Date.parse(b,this._dateFormat)}else return null}},{name:"event_category",type:"auto"},{name:"genre",type:"auto"},{name:"thumbnail",type:"auto"},{name:"raw_id",type:"int"}]}});Ext.define("Mayfest.model.Location",{extend:"Ext.data.Model",config:{fields:[{name:"id",type:"int"},{name:"content",type:"string"},{name:"title",type:"string"},{name:"mayfest_ml_id",type:"string"},{name:"mayfest_ml_type",type:"string"},{name:"mayfest_ml_desc",type:"string"},{name:"mayfest_ml_x",type:"int"},{name:"mayfest_ml_y",type:"int"},{name:"raw_id",type:"int"}]}});Ext.define("Mayfest.store.Attractions",{extend:"Ext.data.Store",config:{model:"Mayfest.model.Attraction",autoLoad:!1,proxy:{type:"ajax",url:Mayfest.paths.data()+"mayfest_attraction.json",reader:{type:"json"},parentStore:"Attractions",timeout:Mayfest.times.offlineTimeout}}});Ext.define("Mayfest.store.OfflineAttractions",{extend:"Ext.data.Store",requires:["Ext.data.proxy.LocalStorage"],config:{model:"Mayfest.model.Attraction",proxy:{type:"localstorage",id:"offlineAttractionsStoreProxy"}}});Ext.define("Mayfest.store.Categories",{extend:"Ext.data.Store",config:{model:"Mayfest.model.Category",autoLoad:!1,proxy:{type:"ajax",url:Mayfest.paths.data()+"attraction_category.json",reader:{type:"json"},parentStore:"Categories",timeout:Mayfest.times.offlineTimeout}}});Ext.define("Mayfest.store.OfflineCategories",{extend:"Ext.data.Store",requires:["Ext.data.proxy.LocalStorage"],config:{model:"Mayfest.model.Category",proxy:{type:"localstorage",id:"offlineCategoriesStoreProxy"}}});Ext.define("Mayfest.store.CategoryAttractions",{extend:"Ext.data.Store",config:{model:"Mayfest.model.Attraction",grouper:{groupFn:function(a){return a.get("title")[0]}}}});Ext.define("Mayfest.store.CategoryEvents",{extend:"Ext.data.Store",config:{model:"Mayfest.model.Event",grouper:{groupFn:function(a){return a.get("title")[0]}}}});Ext.define("Mayfest.store.OfflineEvents",{extend:"Ext.data.Store",requires:["Ext.data.proxy.LocalStorage"],config:{model:"Mayfest.model.Event",proxy:{type:"localstorage",id:"offlineEventsStoreProxy"}}});Ext.define("Mayfest.store.Events",{extend:"Ext.data.Store",config:{model:"Mayfest.model.Event",autoLoad:!1,proxy:{type:"ajax",url:Mayfest.paths.data()+"mayfest_event.json",reader:{type:"json"},parentStore:"Events",timeout:Mayfest.times.offlineTimeout}}});Ext.define("Mayfest.store.EventList",{extend:"Ext.data.Store",config:{model:"Mayfest.model.Event",grouper:{groupFn:function(a){return a.get("mayfest_event_time")}}}});Ext.define("Mayfest.store.Locations",{extend:"Ext.data.Store",config:{model:"Mayfest.model.Location",proxy:{type:"ajax",url:Mayfest.paths.data()+"mayfest_map_location.json",reader:{type:"json"},parentStore:"Locations",timeout:Mayfest.times.offlineTimeout},autoLoad:!1}});Ext.define("Mayfest.store.OfflineLocations",{extend:"Ext.data.Store",requires:["Ext.data.proxy.LocalStorage"],config:{model:"Mayfest.model.Location",proxy:{type:"localstorage",id:"offlineLocationsStoreProxy"}}});Ext.define("Mayfest.view.AttractionLeaf",{extend:"Ext.Panel",xtype:"attractionleaf",alias:"widget.attractionleaf",id:"attractionLeaf",config:{title:"Details",iconCls:"attraction",cls:"attraction",styleHtmlContent:!0,scrollable:{direction:"vertical",directionLock:!0},items:[{xtype:"button",ui:"mayfest round",id:"mapMe",text:"Map",right:"1em",top:"1em"}]}});Ext.define("Mayfest.view.Attractions",{extend:"Ext.List",id:"attractionsList",xtype:"attractionslist",alias:"widget.attractionslist",config:{title:"Attraction",store:"CategoryAttractions",itemTpl:'<tpl if="mayfest_ml_uid"><div class="has_location"></div></tpl>{title}',grouped:!0,onItemDisclosure:!0}});Ext.define("Mayfest.view.Categories",{extend:"Ext.Panel",xtype:"categoriespage",id:"categoriesPage",alias:"widget.categoriespage",config:{autoDestroy:!1,fullscreen:!0,layout:"card",title:"Directory",iconCls:"list",items:[{xtype:"catnav"},{xtype:"categorieslist"}]},initialize:function(){this.fireEvent("render");this.callParent()}});Ext.define("Mayfest.view.CategoriesList",{extend:"Ext.List",xtype:"categorieslist",id:"categoriesList",alias:"widget.categorieslist",config:{title:"Directory",iconCls:"list",fullscreen:!0,detailCard:{xtype:"attractionslist"},itemTpl:'<span class="title">{name}</span>',store:"OfflineCategories"},initialize:function(){this.fireEvent("render");this.callParent()}});Ext.define("Mayfest.view.CategoriesNav",{extend:"Ext.Toolbar",xtype:"catnav",id:"catNav",alias:"widget.catnav",config:{title:"cat nav",docked:"top",items:[{xtype:"button",id:"catNavBack",text:"Back",ui:"back",hideAnimation:Ext.os.is.Android?!1:{type:"fadeOut",duration:200},showAnimation:Ext.os.is.Android?!1:{type:"fadeIn",duration:200}}]},initialize:function(){this.fireEvent("render");this.callParent()}});Ext.define("Mayfest.view.Map",{extend:"Ext.form.Panel",xtype:"canvasmap",id:"canvasMap",config:{title:"Map",iconCls:"maps",fullscreen:!0,scrollable:!1,layout:{type:"vbox"},html:'<canvas id="canvas"></canvas><div id="cNavCont"><div id="zoomIn" class="cNav plus">+</div><div id="zoomOut" class="cNav minus">&minus;</div></div>'}});Ext.define("Mayfest.view.Home",{extend:"Ext.Panel",xtype:"homepanel",config:{fullscreen:!0,title:"Home",iconCls:"mayfest-logo",cls:"home",html:'<div class="line"></div><div class="home-wrap"><div class="logo"><h1>Mayfest Mobile</h1><p>Event Guide, Directory, & Interactive Map</p></div><div class="sponsored-by"><h2>Sponsored by:</h2><a href="http://gurustugroup.com" target="_blank" title="GuRuStu - Branding, Marketing, & Web Design">GuRuStu - Branding, Marketing, & Web Design</a></div></div>'}});Ext.define("Mayfest.view.EventTabs",{extend:"Ext.tab.Panel",xtype:"eventtabs",id:"eventTabs",alias:"widget.eventtabs",config:{fullscreen:!0,tabBarPosition:"top",title:"Events",iconCls:"star",ui:"mayfest",items:[{xtype:"fieldset",docked:"bottom",items:[{xtype:"selectfield",cls:"catSelect",id:"eventCategorySelect",label:"Category"}]}]}});Ext.define("Mayfest.view.Events",{extend:"Ext.List",id:"eventsList",xtype:"eventslist",alias:"widget.eventslist",config:{fullscreen:!0,itemTpl:new Ext.XTemplate('<span class="title">{title}</span>{[ this.getEventGenres(values.genre) ]}{[ this.getEventAttraction(values.mayfest_attraction_uid) ]}<div class="clear"></div>',{compiled:!0,getEventGenres:function(a){var c="";if(!a.length)return c;for(var b=0;b<a.length;b++)b>0&&(c+=", "),c+=a[b].name;return'<span class="evtGen">'+c+"</span>"},getEventAttraction:function(a){return(a=
Mayfest.ui.EventController.getEventAttraction(a))?'<span class="evtAtt">'+a.data.title+"</span>":'<span class="evtAtt">?</span>'}}),store:"EventList",grouped:!0,onItemDisclosure:!0}});Ext.define("Mayfest.view.EventCategories",{extend:"Ext.Panel",xtype:"eventcategorieslist",alias:"widget.eventcategorieslist",config:{fullscreen:!0,layout:"card",cls:"catListPanel"},initialize:function(){this.fireEvent("render");this.callParent()}});Ext.define("Mayfest.view.MainUI",{extend:"Ext.tab.Panel",xtype:"mainui",id:"mainUI",alias:"widget.mainui",config:{fullscreen:!0,tabBarPosition:"bottom",ui:"mayfest",items:[{xtype:"homepanel"},{xtype:"categoriespage"},{xtype:"eventtabs"},{xtype:"canvasmap"}]}});Ext.define("Mayfest.view.Viewport",{extend:"Ext.navigation.View",xtype:"navui",alias:"widget.ui",config:{autoDestroy:!1,fullscreen:!0,masked:{xtype:"loadmask",message:"Loading..."},items:[{xtype:"mainui"}]},initialize:function(){this.fireEvent("render");this.callParent()}});Ext.define("Mayfest.controller.Main",{extend:"Ext.app.Controller",config:{refs:{canvasMap:{selector:"canvasmap"},attractionslist:{selector:"categorieslist"},navui:{selector:"navui"},mainPanel:"tabpanel",mainui:"mainui"}},onlineStores:["Locations","Attractions","Events","Categories"],offlineStores:[],init:function(){Mayfest.ui.MainController=this;for(var a=0;a<this.onlineStores.length;a++){var c=this.onlineStores[a];Ext.getStore("Offline"+c).on({load:this.onOfflineStoreLoad,scope:this});c=Ext.getStore(c);
c.on({load:this.onOnlineStoreLoad});c.getProxy().on({exception:this.onOnlineStoreProxyTimeout});c.load()}this.control({navui:{render:this.onNavUIRender,back:this.onNavBack},mainPanel:{initialize:this.onMainPanelInit}})},onMainPanelInit:function(a){Mayfest.ui.mainPanel=a},onNavUIRender:function(){Mayfest.ui.nav=this.getNavui();Mayfest.ui.navBar=Mayfest.ui.nav.getNavigationBar();Mayfest.ui.navBar.hide()},onNavBack:function(a){a.getActiveItem().id==="mainUI"?a.getNavigationBar().hide():a.getNavigationBar().show()},
onOnlineStoreLoad:function(a,c,b){b&&(b=Ext.getStore("Offline"+a._storeId),b.getProxy().clear(),a.each(function(a){a.data.raw_id=a.getId();a.phantom=!0}),b.add(c),b.sync(),b.load())},onOnlineStoreProxyTimeout:function(a,c,b){console.log("OFFLINE. PROXY TIMEOUT",a,b);Ext.getStore("Offline"+a.config.parentStore).load()},onOfflineStoreLoad:function(a){a.each(function(a){a.setId(a.data.raw_id)});switch(a._storeId){case "OfflineAttractions":Mayfest.ui.EventController.offlineAttractionStoreLoaded=!0;break;
case "OfflineEvents":Mayfest.ui.EventController.checkAttractionStoreData();break;case "OfflineCategories":Mayfest.ui.AttractionController.pushCatnav(0,"Directory")}this.offlineStores.push(a._storeId);this.offlineStores.length===this.onlineStores.length&&this.getNavui().unmask()}});Ext.define("Mayfest.controller.Attraction",{extend:"Ext.app.Controller",config:{refs:{mapButton:{selector:"#mapMe"},categoriespage:{selector:"categoriespage"},catnav:{selector:"catnav"},catNavBack:{selector:"#catNavBack"},categorieslist:{selector:"categorieslist"}},control:{"#attractionsList":{activate:"onAttractionsListActivate",itemtap:"onAttractionTap",disclose:"onAttractionDisclosure"},"#attractionLeaf":{show:"onAttractionLeafShow"},"#mapMe":{tap:"onMapMeTap"},"#catNavBack":{tap:"onCatNavBack"}}},
init:function(){Mayfest.ui.AttractionController=this;Mayfest.ui.templates.attractionLeaf=new Ext.XTemplate('<article id="{id}" class="leaf"><h2>{title}</h2><tpl if="genre.length"><div class="entry-tag field"><tpl for="genre"><span class="tax" term_id="{term_id}">{name}{[ xindex < xcount ? \', \' : \'\' ]}</span></tpl></div></tpl><tpl if="thumbnail != \'\'"><div class="pic">{[ this.getThumbnail( values.thumbnail ) ]}</div></tpl><div class="entry-meta"><tpl if="this.hasName( values.mayfest_att_first_name, values.mayfest_att_last_name )"><div class="field"><label>Name:</label><span>{[ this.buildName( values.mayfest_att_first_name, values.mayfest_att_last_name ) ]}</span></div></tpl><tpl if="this.hasName( values.mayfest_att_first_name_partner, values.mayfest_att_last_name_partner )"><div class="field"><label>Partner:</label><span>{[ this.buildName( values.mayfest_att_first_name_partner, values.mayfest_att_last_name_partner ) ]}</span></div></tpl><tpl if="mayfest_att_city && mayfest_att_city != \'\'"><div class="field"><label>City:</label><span>{mayfest_att_city}</span></div></tpl><tpl if="mayfest_att_city && mayfest_att_city != \'\'"><div class="field"><label>State:</label><span>{mayfest_att_state}</span></div></tpl></div><div class="entry-content">{content}</div></article>',
{getThumbnail:function(a){a=a["app-thumb"];return'<img src="'+a[0]+'" width="'+a[1]+'" height="'+a[2]+'" />'},hasName:function(a,c){return a&&a!==""||c&&c!==""?!0:!1},buildName:function(a,c){var b=!1;a&&a!==""&&(b=a);c&&c!==""&&(b?b+=" "+c:b=c);return b||""}});this.control({categorieslist:{itemtap:"onCatTap"}})},catNavArray:[],onCatNavBack:function(){this.catNavArray.pop();this.doCatnav()},pushCatnav:function(a,c){this.catNavArray.push({term_id:a,title:c});this.doCatnav()},doCatnav:function(){var a=
this.catNavArray[this.catNavArray.length-1],c=this.getCatNavBack();this.getCatnav().setTitle(a.title);if(this.filterCategories(a.term_id))this.getCategoriespage().getActiveItem()!==this.getCategorieslist()&&this.getCategoriespage().setActiveItem(this.getCategorieslist());else{a=this.getAttractionsByCatID(a.term_id);Ext.getStore("CategoryAttractions").setData(a.items);if(!Mayfest.ui.AttractionsList)Mayfest.ui.AttractionsList=Ext.create("Mayfest.view.Attractions");this.getCategoriespage().setActiveItem(Mayfest.ui.AttractionsList)}this.catNavArray.length>
1?(c.setText(this.catNavArray[this.catNavArray.length-2].title),c.show()):c.hide()},onCatTap:function(a,c,b,d){this.pushCatnav(d.data.term_id,d.data.name);setTimeout(function(){a.deselect(c)},50)},getAttractionsByCatID:function(a){return Ext.getStore("OfflineAttractions").queryBy(function(c){if(c.data.attraction_category.length)for(var b=0;b<c.data.attraction_category.length;b++)if(c.data.attraction_category[b].term_id==a)return!0;return!1})},filterCategories:function(a){var c=this.getCategorieslist().getStore();
c.clearFilter();c.filter([{filterFn:function(b){return b.get("parent")===a}}]);return c.data.items.length},onAttractionDisclosure:function(a,c,b,d,e){e.stopPropagation();this.currentAttraction=c.data;Mayfest.ui.currentLocation=this.getAttractionLocation();Mayfest.ui.mapController.goToMapLocation()},onMapMeTap:function(){Mayfest.ui.navBar.hide();Mayfest.ui.nav.pop();Mayfest.ui.mapController.goToMapLocation()},onAttractionLeafShow:function(){Mayfest.ui.navBar.show();Mayfest.ui.currentLocation?this.getMapButton().show():
this.getMapButton().hide()},onAttractionsListActivate:function(){var a=Ext.select("#attractionsList .x-list-disclosure");a.elements.length&&a.each(function(){this.getParent().down(".has_location")||this.hide()})},onAttractionTap:function(a,c,b,d){this.currentAttraction=d.data;Mayfest.ui.currentLocation=this.getAttractionLocation();if(!Mayfest.ui.AttractionLeaf)Mayfest.ui.AttractionLeaf=Ext.create("Mayfest.view.AttractionLeaf");a=Mayfest.ui.AttractionLeaf;a.setHtml(Mayfest.ui.templates.attractionLeaf.apply(this.currentAttraction));
Mayfest.ui.nav.push(a)},getAttractionLocation:function(a){a=a||this.currentAttraction.mayfest_ml_uid;return!a?null:Ext.getStore("OfflineLocations").getById(a)}});Ext.define("Mayfest.controller.Event",{extend:"Ext.app.Controller",config:{refs:{eventtabs:{selector:"eventtabs"},categorylists:{selector:"eventcategorieslist"},categoryselect:{selector:"#eventCategorySelect"},eventslist:{selector:"eventslist"}}},eventDays:{},eventDayKeys:[],currentDay:null,currentEvent:null,eventList:null,init:function(){Mayfest.ui.EventController=this;this.control({eventtabs:{activeitemchange:"onEventTabsActiveItemChange"},categoryselect:{change:this.onCatSelectChange},eventslist:{disclose:this.onListDisclose,
itemtap:this.onListItemTap}});Mayfest.ui.templates.eventLeaf=new Ext.XTemplate('<article id="{id}" class="leaf"><h2>{title}</h2><tpl if="event_category.length"><div class="entry-cat field"><tpl for="event_category"><span class="tax" term_id="{term_id}">{name}{[ xindex < xcount ? \', \' : \'\' ]}</span></tpl><span class="sep">: </span></div></tpl><tpl if="genre.length"><div class="entry-tag field"><tpl for="genre"><span class="tax" term_id="{term_id}">{name}{[ xindex < xcount ? \', \' : \'\' ]}</span></tpl></div></tpl><tpl if="thumbnail != \'\'"><div class="pic">{[ this.getThumbnail( values.thumbnail ) ]}</div></tpl><div class="entry-meta"><tpl if="this.hasDate( values.date )"><div class="field"><label>When:</label><span>{[ this.buildDate( values.date ) ]}</span></div></tpl><tpl if="mayfest_attraction_uid && mayfest_attraction_uid != \'\'"><div class="field"><label>Where:</label><span>{[ this.buildAttraction( values.mayfest_attraction_uid ) ]}</span></div></tpl><tpl if="this.hasName( values.mayfest_att_first_name, values.mayfest_att_last_name )"><div class="field"><label>Name:</label><span>{[ this.buildName( values.mayfest_att_first_name, values.mayfest_att_last_name ) ]}</span></div></tpl><tpl if="this.hasName( values.mayfest_att_first_name_partner, values.mayfest_att_last_name_partner )"><div class="field"><label>Partner:</label><span>{[ this.buildName( values.mayfest_att_first_name_partner, values.mayfest_att_last_name_partner ) ]}</span></div></tpl></div><div class="entry-content">{content}</div></article>',
{getThumbnail:function(a){a=a["app-thumb"];return'<img src="'+a[0]+'" width="'+a[1]+'" height="'+a[2]+'" />'},hasDate:function(a){return a&&a!==""?!0:!1},buildDate:function(a){return!a?"":Ext.Date.format(a,"g:ia - D.")},buildAttraction:function(a){return Ext.getStore("OfflineAttractions").getById(a).data.title}})},offlineAttractionStoreLoaded:!1,checkAttractionStoreData:function(){var a=Mayfest.ui.EventController;if(a.offlineAttractionStoreLoaded)return a.processEventData();else setTimeout(a.checkAttractionStoreData,
25)},processEventData:function(){var a=Ext.getStore("OfflineEvents").getData().items,c=Mayfest.ui.EventController.eventDays,b=Mayfest.ui.EventController.eventDayKeys;if(a&&a.length)for(var d=0;d<a.length;d++){var e=a[d].data;if(e.date&&(b.indexOf(e.mayfest_event_day)<0&&(c[e.mayfest_event_day]={items:[],categories:{}},b.push(e.mayfest_event_day)),c[e.mayfest_event_day].items.push(a[d]),e.event_category&&e.event_category.length))for(var h=0;h<e.event_category.length;h++){var i=e.event_category[h],
f=parseInt(i.term_id,10);c[e.mayfest_event_day].categories[f]||(c[e.mayfest_event_day].categories[f]={text:i.name,value:f})}}b.sort();Mayfest.ui.EventController.addEventTabs()},addEventTabs:function(){if(!this.eventList&&this.eventDayKeys.length)this.eventList=Ext.create("Mayfest.view.Events");for(var a=0;a<this.eventDayKeys.length;a++){var c=this.eventDayKeys[a],b=this.eventDays[c];this.getEventtabs().add([{id:c,xtype:"eventcategorieslist",title:Ext.Date.format(b.items[0].data.date,"D")}])}},onEventTabsActiveItemChange:function(a,
c){this.currentDay=this.eventDays[c.id];Ext.getStore("EventList").setData(this.currentDay.items);this.buildCatSelectOptions();c.add([this.eventList])},buildCatSelectOptions:function(){var a=[{text:"All Categories",value:-1}],c;for(c in this.currentDay.categories)a.push(this.currentDay.categories[c]);this.getCategoryselect().setOptions(a)},onCatSelectChange:function(a,c){var b=c.data.value;Ext.getStore("EventList").clearFilter();b>-1&&Ext.getStore("EventList").filter([{filterFn:function(a){var c=!1;
Ext.each(a.get("event_category"),function(a){a.term_id==b&&(c=!0);return!1});return c}}]);b=null},onListItemTap:function(a,c,b,d){this.currentEvent=d.data;Mayfest.ui.currentLocation=this.getEventLocation();if(!Mayfest.ui.AttractionLeaf)Mayfest.ui.AttractionLeaf=Ext.create("Mayfest.view.AttractionLeaf");a=Mayfest.ui.AttractionLeaf;a.setHtml(Mayfest.ui.templates.eventLeaf.apply(this.currentEvent));Mayfest.ui.nav.push(a)},onListDisclose:function(a,c,b,d,e){e.stopPropagation();this.currentEvent=c.data;
Mayfest.ui.currentLocation=this.getEventLocation();Mayfest.ui.mapController.goToMapLocation()},getEventLocation:function(a){a=a||this.currentEvent.mayfest_attraction_uid;if(!a)return null;a=Ext.getStore("OfflineAttractions").getById(a);return!a.data||!a.data.mayfest_ml_uid?null:Mayfest.ui.AttractionController.getAttractionLocation(a.data.mayfest_ml_uid)},getEventAttraction:function(a){return!a?null:Ext.getStore("OfflineAttractions").getById(a)}});Ext.define("Mayfest.controller.Map",{extend:"Ext.app.Controller",config:{refs:{mapPanel:{selector:"canvasmap"}},control:{mapPanel:{initialize:"onMapInitialize"}}},init:function(){Mayfest.ui.mapController=this;this.guruLogoString=this.pathPre+"0"+this.pathSuf+"img/guruLogoAlpha256.png"},goToMapLocation:function(){if(Mayfest.ui.currentLocation){var a=Mayfest.ui.currentLocation.data;Mayfest.ui.mainPanel.setActiveItem(Mayfest.ui.map);this.arrow=!0;this.arrowDrawn=!1;this.moveTo(a.mayfest_ml_x,a.mayfest_ml_y)}},
pathPre:Mayfest.paths.isDeployed()?"http://i":"http://mayfesti",pathSuf:Mayfest.paths.isDeployed()?".mayfestmobile.com/":".gurustudev.com/",canvasIsActivated:!1,tileSize:256,maxZ:5,minZ:1,maxX:5632,maxY:5632,dragging:!1,posX:2687,posY:2304,posZ:3,canvasEl:null,canvas:null,ctx:null,tiles:{},dragLinger:100,arrow:!1,arrowDrawn:!1,moving:!1,targetX:0,targetY:0,targetTime:2E3,targetMove:Math.floor(1E3/30),lastX:0,lastY:0,movePx:10,moveTimeoutFunc:null,moveTimeout:null,pinchEndBuffer:250,scale:1,prevScale:1,
halfCanvasWidth:0,halfCanvasHeight:0,zooming:!1,zoom:1,guruLogoString:null,getTileString:function(a,c,b){n=this.normaliseIndices(a,c,b);a=n[0];c=n[1];b=n[2];return this.pathPre+this.rand(6)+this.pathSuf+"img/map/tiles/pngbatch/"+b+"_"+a+"_"+c+".png"},rand:function(a){return Math.floor(Math.random()*a)},mod:function(a,c){return(a%c+c)%c},normaliseIndices:function(a,c,b){return[this.mod(a,Math.pow(2,b)),this.mod(c,Math.pow(2,b)),b]},encodeIndex:function(a,c,b){n=this.normaliseIndices(a,c,b);a=n[0];
c=n[1];b=n[2];return a+","+c+","+b},decodeIndex:function(a){return a.split(",",3)},render:function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);this.zooming&&(this.ctx.save(),this.ctx.translate(Math.floor(-1*(this.canvas.width*this.scale-this.canvas.width)/2),Math.floor(-1*(this.canvas.height*this.scale-this.canvas.height)/2)),this.ctx.scale(this.scale,this.scale));this.drawTiles();this.zooming&&this.ctx.restore()},drawTiles:function(){for(var a=this,c=a.posZ,b=a.canvas.width*Math.pow(2,
a.maxZ-c),d=a.canvas.height*Math.pow(2,a.maxZ-c),e=a.tileSize*Math.pow(2,a.maxZ-c),h=a.posX-b/2,i=a.posY-d/2,b=a.posX+b/2,d=a.posY+d/2,f=Math.floor(h/e);f<Math.ceil(b/e);++f)for(var j=Math.floor(i/e);j<Math.ceil(d/e);++j){var k=(f*e-h)/Math.pow(2,a.maxZ-c),l=(j*e-i)/Math.pow(2,a.maxZ-c),g=a.encodeIndex(f,j,c);if(this.tiles[g]&&this.tiles[g].complete)a.ctx.drawImage(a.tiles[g],Math.round(k),Math.round(l));else{if(!a.tiles[g])a.tiles[g]=new Image,a.tiles[g].onerror=function(){this.src=a.guruLogoString},
a.tiles[g].src=a.getTileString(f,j,a.posZ),a.tiles[g].onload=function(){a.render()};a.ctx.fillStyle="#ffffff";a.ctx.fillRect(Math.round(k),Math.round(l),a.tileSize,a.tileSize)}}a.arrowDrawn&&a.drawArrow(a.canvas.width/2,a.canvas.height/2)},goTo:function(a,c){if(!a||!c)return!1;this.posX=a;this.posY=c;this.render()},moveTo:function(a,c){if(!a||!c)return!1;var b=this;b.targetX=this.checkBoundsX(a);b.targetY=this.checkBoundsY(c);b.moving=!0;b.moveTimeoutFunc=function(){if(b.moving){var a=Math.floor(b.posX+
(b.targetX-b.posX)/b.movePx),c=Math.floor(b.posY+(b.targetY-b.posY)/b.movePx);b.lastX=b.posX;b.lastY=b.posY;b.goTo(a,c);if(b.lastX===a&&b.lastY===c){if(b.arrow)b.drawArrow(b.canvas.width/2,b.canvas.height/2),b.arrowDrawn=!0,b.arrow=!1}else return b.moveTimeout=setTimeout(b.moveTimeoutFunc,b.targetMove)}};return b.moveTimeout=setTimeout(b.moveTimeoutFunc,b.targetMove)},drawArrow:function(a,c){if(!a||!c)return!1;var b=a-17,d=c-80;this.ctx.save();this.ctx.beginPath();this.ctx.moveTo(b+33.5,d+43.1);this.ctx.bezierCurveTo(b+
32.7,d+42.6,b+32,d+42.1,b+31.2,d+41.6);this.ctx.bezierCurveTo(b+30.5,d+41.2,b+29.8,d+40.7,b+29,d+40.2);this.ctx.bezierCurveTo(b+29,d+40.2,b+28.1,d+39.7,b+28.1,d+39.7);this.ctx.bezierCurveTo(b+26.1,d+43.4,b+24.1,d+47.2,b+22.3,d+51);this.ctx.bezierCurveTo(b+21.8,d+51.9,b+21.4,d+52.8,b+20.9,d+53.8);this.ctx.bezierCurveTo(b+20.9,d+47.3,b+20.9,d+40.8,b+21.1,d+34.4);this.ctx.bezierCurveTo(b+21.3,d+24.8,b+21.6,d+15.2,b+22,d+5.7);this.ctx.bezierCurveTo(b+22,d+4.8,b+22.1,d+4,b+22.1,d+3.2);this.ctx.bezierCurveTo(b+
19.6,d+2.9,b+17.2,d+2,b+14.7,d+1.7);this.ctx.bezierCurveTo(b+14.5,d+6.7,b+14.3,d+11.7,b+14.2,d+16.8);this.ctx.bezierCurveTo(b+13.8,d+26.3,b+13.6,d+35.8,b+13.6,d+45.3);this.ctx.bezierCurveTo(b+13.5,d+47.3,b+13.5,d+49.3,b+13.6,d+51.2);this.ctx.bezierCurveTo(b+12.8,d+49.6,b+12.1,d+47.9,b+11.4,d+46.2);this.ctx.bezierCurveTo(b+10.4,d+44,b+9.5,d+41.8,b+8.6,d+39.6);this.ctx.bezierCurveTo(b+8.6,d+39.6,b+7.7,d+39.9,b+7.6,d+39.9);this.ctx.bezierCurveTo(b+6.7,d+40.2,b+5.9,d+40.4,b+5.1,d+40.7);this.ctx.bezierCurveTo(b+
4.2,d+41,b+3.4,d+41.2,b+2.6,d+41.5);this.ctx.bezierCurveTo(b+2.6,d+41.5,b+1.5,d+41.9,b+1.5,d+41.9);this.ctx.bezierCurveTo(b+3.2,d+45.8,b+4.8,d+49.7,b+6.5,d+53.6);this.ctx.bezierCurveTo(b+8.2,d+57.5,b+10,d+61.3,b+11.9,d+65);this.ctx.bezierCurveTo(b+13,d+67.1,b+14.1,d+69.1,b+15.3,d+71.1);this.ctx.lineTo(b+19,d+79);this.ctx.lineTo(b+20.9,d+72.8);this.ctx.bezierCurveTo(b+22.2,d+68.9,b+23.8,d+65.1,b+25.5,d+61.3);this.ctx.bezierCurveTo(b+27.3,d+57.5,b+29.2,d+53.7,b+31.1,d+49.9);this.ctx.bezierCurveTo(b+
32.2,d+47.8,b+33.3,d+45.8,b+34.4,d+43.7);this.ctx.bezierCurveTo(b+34.4,d+43.6,b+33.5,d+43.1,b+33.5,d+43.1);this.ctx.closePath();this.ctx.fillStyle="rgb(239, 73, 53)";this.ctx.fill();this.ctx.lineWidth=3;this.ctx.strokeStyle="rgb(255, 255, 255)";this.ctx.stroke();this.ctx.restore()},handleResize:function(){var a=this.getMapPanel().element.getSize();this.canvas.height=a.height;this.canvas.width=a.width;this.halfCanvasWidth=Math.floor(this.canvas.height/2);this.halfCanvasHeight=Math.floor(this.canvas.height/
2);this.render()},onDoubleTap:function(){this.posZ<this.maxZ?this.posZ++:this.posZ=this.minZ;this.render()},onTouchStart:function(){this.moving=!1;clearTimeout(this.moveTimeout)},onPinchStart:function(a){this.zooming=!0;this.dragging=this.moving=!1;clearTimeout(this.moveTimeout);this.midpointPrev=a.touches[0].point.getMidpointOf(a.touches[1].point);this.scale=a.scale;this.prevScale=1;this.arrowDrawn=!1},onPinch:function(a){this.scale=a.scale;var c=a.touches[0].point.getMidpointOf(a.touches[1].point),
b=Math.floor(this.posX-Math.round((c.x-this.midpointPrev.x)*Math.pow(2,this.maxZ-this.posZ)/this.scale)),d=Math.floor(this.posY-Math.round((c.y-this.midpointPrev.y)*Math.pow(2,this.maxZ-this.posZ)/this.scale)),a=Math.round(Math.log(a.scale)/Math.log(2))+this.posZ;a>this.maxZ||a<this.minZ?this.scale=this.prevScale:this.prevScale=this.scale;this.goTo(b,d,!0);this.midpointPrev=c},onPinchEnd:function(){var a=this;a.posZ=Math.round(Math.log(a.scale)/Math.log(2))+a.posZ;if(a.posZ>5)a.posZ=5;else if(a.posZ<
a.minZ)a.posZ=a.minZ;setTimeout(function(){a.zooming=!1;a.render()},this.pinchEndBuffer)},onDragStart:function(){this.dragging=!0;this.arrowDrawn=!1},onDrag:function(a){if(!this.zooming&&this.dragging&&(a.absDeltaX>10||a.absDeltaY>10)){var c=a.previousDeltaY;this.posX-=a.previousDeltaX*Math.pow(2,this.maxZ-this.posZ);this.posY-=c*Math.pow(2,this.maxZ-this.posZ);this.posX=this.checkBoundsX(this.posX);this.posY=this.checkBoundsY(this.posY);this.render()}},checkBoundsX:function(a){return a-this.halfCanvasWidth<
0?this.halfCanvasWidth:this.maxX-this.halfCanvasWidth<a?this.maxX-this.halfCanvasWidth:a},checkBoundsY:function(a){return a-this.halfCanvasHeight<0?this.halfCanvasHeight:this.maxY-this.halfCanvasHeight<a?this.maxY-this.halfCanvasHeight:a},onDragEnd:function(a){this.dragging=!1;var c=this.dragLinger/(this.posZ===0?0.5:this.posZ),b=Math.floor(this.posX-a.previousDeltaX*c),a=Math.floor(this.posY-a.previousDeltaY*c);this.zooming||this.moveTo(b,a)},zoomIn:function(){this.posZ<this.maxZ&&(++this.posZ,this.render())},
zoomOut:function(){this.posZ>this.minZ&&(--this.posZ,this.render())},onMapInitialize:function(a){var c=this;Mayfest.ui.map=a;this.getMapPanel().on({painted:function(){c.onMapActivate.call(c)}})},onMapActivate:function(a,c,b,d){this.canvasIsActivated||this.onMapFirstActivate.apply(this,arguments);this.render()},onMapFirstActivate:function(){var a=this;Ext.util.Point.prototype.getMidpointOf=function(a){return{x:Math.round((this.x+a.x)/2),y:Math.round((this.y+a.y)/2)}};this.canvasIsActivated=!0;this.canvasEl=
Ext.get("canvas");this.canvas=this.canvasEl.dom;this.ctx=this.canvas.getContext("2d");Ext.Viewport.on("resize","handleResize",this,{buffer:0});this.handleResize();this.canvasEl.on({dragstart:this.onDragStart,drag:this.onDrag,dragend:this.onDragEnd,doubletap:this.onDoubleTap,touchstart:this.onTouchStart,pinchstart:this.onPinchStart,pinchend:this.onPinchEnd,pinch:this.onPinch,scope:this});Ext.get("zoomIn").on({tap:function(){a.zoomIn()}});Ext.get("zoomOut").on({tap:function(){a.zoomOut()}})}});
