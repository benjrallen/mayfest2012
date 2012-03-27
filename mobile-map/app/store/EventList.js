Ext.define('Mayfest.store.EventList', {
    extend: 'Ext.data.Store',
		
    config: {
        model: 'Mayfest.model.Event',
        //autoLoad: true,
        //remoteFilter: true,
		//rootVisible: false,
		//folderSort: true,

		grouper: {
			groupFn: function(record) {				
				return record.get('mayfest_event_time');
			}
		},

//		data: [
//
//{"id":527,
//"title":"Event with no day, but a time",
//"content":"<p>sorry.  but we don&#8217;t yet have a time for this.<\/p>\n",
//"genre":[{"term_id":"38",
//"name":"Timeless",
//"slug":"timeless",
//"term_group":"0",
//"term_taxonomy_id":"38",
//"taxonomy":"genre",
//"description":"",
//"parent":"0",
//"count":"1"}],
//"event_category":[{"term_id":"32",
//"name":"Performance",
//"slug":"performance",
//"term_group":"0",
//"term_taxonomy_id":"32",
//"taxonomy":"event_category",
//"description":"",
//"parent":"0",
//"count":"10"}],
//"thumbnail":"",
//"mayfest_event_day":"",
//"mayfest_event_time":"7:00PM",
//"mayfest_attraction_uid":"439"},
//{"id":526,
//"title":"Event with no time",
//"content":"<p>hello event<\/p>\n",
//"genre":[{"term_id":"36",
//"name":"Childrens Rock",
//"slug":"childrens-rock",
//"term_group":"0",
//"term_taxonomy_id":"36",
//"taxonomy":"genre",
//"description":"",
//"parent":"0",
//"count":"1"},
//{"term_id":"37",
//"name":"Rhythm &amp; Something Else",
//"slug":"rhythm-something-else",
//"term_group":"0",
//"term_taxonomy_id":"37",
//"taxonomy":"genre",
//"description":"",
//"parent":"0",
//"count":"1"}],
//"event_category":[{"term_id":"33",
//"name":"Gallery Show",
//"slug":"gallery-show",
//"term_group":"0",
//"term_taxonomy_id":"33",
//"taxonomy":"event_category",
//"description":"",
//"parent":"0",
//"count":"5"},
//{"term_id":"32",
//"name":"Performance",
//"slug":"performance",
//"term_group":"0",
//"term_taxonomy_id":"32",
//"taxonomy":"event_category",
//"description":"",
//"parent":"0",
//"count":"10"}],
//"thumbnail":"",
//"mayfest_event_day":"05-19-2012",
//"mayfest_event_time":"",
//"mayfest_attraction_uid":"439"},
//{"id":446,
//"title":"Super Awesome Band",
//"content":"<p>This band is from Timbuktu and they are the best ever.<\/p>\n",
//"genre":[{"term_id":"27",
//"name":"Rock",
//"slug":"rock",
//"term_group":"0",
//"term_taxonomy_id":"27",
//"taxonomy":"genre",
//"description":"",
//"parent":"0",
//"count":"1"},
//{"term_id":"44",
//"name":"Soft Rock",
//"slug":"soft-rock",
//"term_group":"0",
//"term_taxonomy_id":"44",
//"taxonomy":"genre",
//"description":"",
//"parent":"0",
//"count":"1"}],
//"event_category":[{"term_id":"32",
//"name":"Performance",
//"slug":"performance",
//"term_group":"0",
//"term_taxonomy_id":"32",
//"taxonomy":"event_category",
//"description":"",
//"parent":"0",
//"count":"10"}],
//"thumbnail":{"ico":["http:\/\/gurustudev.com\/~ben\/mayfest2012\/wp\/wp-content\/uploads\/2012\/02\/ed_ruscha-20x11.jpg",
//20,
//11,
//true],
//"app-thumb":["http:\/\/gurustudev.com\/~ben\/mayfest2012\/wp\/wp-content\/uploads\/2012\/02\/ed_ruscha-120x66.jpg",
//120,
//66,
//true]},
//"mayfest_event_day":"05-19-2012",
//"mayfest_event_time":"7:30PM",
//"mayfest_attraction_uid":"439"},
//{"id":524,
//"title":"Test Performer",
//"content":"<p>Just some test content<\/p>\n",
//"genre":[{"term_id":"35",
//"name":"Blues",
//"slug":"blues",
//"term_group":"0",
//"term_taxonomy_id":"35",
//"taxonomy":"genre",
//"description":"",
//"parent":"0",
//"count":"2"}],
//"event_category":[{"term_id":"32",
//"name":"Performance",
//"slug":"performance",
//"term_group":"0",
//"term_taxonomy_id":"32",
//"taxonomy":"event_category",
//"description":"",
//"parent":"0",
//"count":"10"}],
//"thumbnail":{"ico":["http:\/\/gurustudev.com\/~ben\/mayfest2012\/wp\/wp-content\/uploads\/2012\/02\/ed_ruscha-20x11.jpg",
//20,
//11,
//true],
//"app-thumb":["http:\/\/gurustudev.com\/~ben\/mayfest2012\/wp\/wp-content\/uploads\/2012\/02\/ed_ruscha-120x66.jpg",
//120,
//66,
//true]},
//"mayfest_event_day":"05-17-2012",
//"mayfest_event_time":"6:00PM",
//"mayfest_attraction_uid":"439"}
//		
//		]
//
				
//        proxy: {
//        	type: 'ajax',
//        	//url: '../wp/wp-content/themes/mayfest2012/app_cache/mayfest_map_location.json',
//        	url: Mayfest.paths.data() + 'event_category.json',
//        	reader: {
//        		type: 'json'
//        	}
//        }
        

    }
});
