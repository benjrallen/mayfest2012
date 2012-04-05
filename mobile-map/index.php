<!DOCTYPE HTML>
<html manifest="app.manifest" lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>Mayfest Mobile Map 2012</title>
    <!--<script id="microloader" type="text/javascript" src="touch/microloader/development.js"></script>-->
	<link rel="stylesheet" href="touch/resources/css/mayfest-map.css" />

<?php /* ?>
    <script type="text/javascript" src="touch/sencha-touch-all.js"></script>
    <script type="text/javascript" src="mayfest.js"></script>
<?php */ ?>

    <script type="text/javascript" src="touch/sencha-touch-all-debug.js"></script>
    <script type="text/javascript" src="app.js"></script>

    <script type="text/javascript" src="app/model/Attraction.js"></script>
    <script type="text/javascript" src="app/model/Category.js"></script>
    <script type="text/javascript" src="app/model/Event.js"></script>
    <script type="text/javascript" src="app/model/Location.js"></script>
    <script type="text/javascript" src="app/store/Attractions.js"></script>
    <script type="text/javascript" src="app/store/OfflineAttractions.js"></script>
    <script type="text/javascript" src="app/store/Categories.js"></script>
    <script type="text/javascript" src="app/store/CategoryAttractions.js"></script>
    <script type="text/javascript" src="app/store/CategoryEvents.js"></script>
    <script type="text/javascript" src="app/store/OfflineEvents.js"></script>
    <script type="text/javascript" src="app/store/Events.js"></script>
    <script type="text/javascript" src="app/store/EventList.js"></script>
    <script type="text/javascript" src="app/store/Locations.js"></script>
    <script type="text/javascript" src="app/store/OfflineLocations.js"></script>
    <script type="text/javascript" src="app/view/AttractionLeaf.js"></script>
    <script type="text/javascript" src="app/view/Attractions.js"></script>
    <script type="text/javascript" src="app/view/Categories.js"></script>
    <script type="text/javascript" src="app/view/Map.js"></script>
    <script type="text/javascript" src="app/view/Home.js"></script>
    <script type="text/javascript" src="app/view/EventTabs.js"></script>
    <script type="text/javascript" src="app/view/Events.js"></script>
    <script type="text/javascript" src="app/view/EventCategories.js"></script>
    <script type="text/javascript" src="app/view/MainUI.js"></script>
    <script type="text/javascript" src="app/view/Viewport.js"></script>
    <script type="text/javascript" src="app/controller/Main.js"></script>
    <script type="text/javascript" src="app/controller/Attraction.js"></script>
    <script type="text/javascript" src="app/controller/Event.js"></script>
    <script type="text/javascript" src="app/controller/Map.js"></script>

</head>
<body>
    <!--<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>-->
    
    <?php /* Here we will use some hidden text areas to contain our Ext.Template's */ ?>
    
	<textarea id="attraction-leaf-template" style="display:none">
		<article id="{id}" class="leaf">
			
			<?php /* ?>

			<tpl if="this.getMapLocation()">
				<button id="mapMe">Map!</button>
			</tpl>
			<?php */ ?>
							
			
			<h2>{title}</h2>
		

			<?php /* ?>
			<tpl if="attraction_category.length">
				<div class="entry-cat field">
					<!--<label>{[ values.attraction_category.length &gt; 1 ? 'Categories' : 'Category' ]}:</label>-->
					<tpl for="attraction_category">
						<span class="tax" term_id="{term_id}">{name}</span>
						{[ xindex &lt; xcount ? '<span class="sep">, </span>' : '' ]}
					</tpl>
				</div>
			</tpl>
			<?php */ ?>

			<tpl if="genre.length">
				<div class="entry-tag field">
					<!--<label>{[ values.genre.length &gt; 1 ? 'Genres' : 'Genre' ]}:</label>-->
					<tpl for="genre">
						<span class="tax" term_id="{term_id}">{name}{[ xindex &lt; xcount ? ', ' : '' ]}</span>
					</tpl>
				</div>
			</tpl>
			

			<tpl if="thumbnail != ''">
				<div class="pic">
					{[ this.getThumbnail( values.thumbnail ) ]}
				</div>
			</tpl>

			<div class="entry-meta">
			
				<tpl if="this.hasName( values.mayfest_att_first_name, values.mayfest_att_last_name )">
					<div class="field">
						<label>Name:</label>
						<span>{[ this.buildName( values.mayfest_att_first_name, values.mayfest_att_last_name ) ]}</span>
					</div>
				</tpl>
				<tpl if="this.hasName( values.mayfest_att_first_name_partner, values.mayfest_att_last_name_partner )">
					<div class="field">
						<label>Partner:</label>
						<span>{[ this.buildName( values.mayfest_att_first_name_partner, values.mayfest_att_last_name_partner ) ]}</span>
					</div>
				</tpl>
				<tpl if="mayfest_att_city && mayfest_att_city != ''">
					<div class="field">
						<label>City:</label>
						<span>{mayfest_att_city}</span>
					</div>
				</tpl>
				<tpl if="mayfest_att_city && mayfest_att_city != ''">
					<div class="field">
						<label>State:</label>
						<span>{mayfest_att_state}</span>
					</div>
				</tpl>
				
			</div>

			
			<div class="entry-content">
				{content}
			</div>
		</article>    
	</textarea>
	
	<textarea id="event-leaf-template" style="display:none">
		<article id="{id}" class="leaf">
			
			<h2>{title}</h2>
			
			<tpl if="event_category.length">
				<div class="entry-cat field">
					<!--<label>{[ values.event_category.length &gt; 1 ? 'Categories' : 'Category' ]}:</label>-->
					<tpl for="event_category">
						<span class="tax" term_id="{term_id}">{name}{[ xindex &lt; xcount ? ', ' : '' ]}</span>
						<span class="sep">: </span>
					</tpl>
				</div>
			</tpl>

			<tpl if="genre.length">
				<div class="entry-tag field">
					<!--<label>{[ values.genre.length &gt; 1 ? 'Genres' : 'Genre' ]}:</label>-->
					<tpl for="genre">
						<span class="tax" term_id="{term_id}">{name}{[ xindex &lt; xcount ? ', ' : '' ]}</span>
					</tpl>
				</div>
			</tpl>

			<tpl if="thumbnail != ''">
				<div class="pic">
					{[ this.getThumbnail( values.thumbnail ) ]}
				</div>
			</tpl>
						
			<div class="entry-meta">
				<tpl if="this.hasDate( values.date )">
					<div class="field">
						<label>When:</label>
						<span>{[ this.buildDate( values.date ) ]}</span>
					</div>
				</tpl>
				<tpl if="mayfest_attraction_uid && mayfest_attraction_uid != ''">
					<div class="field">
						<label>Where:</label>
						<span>{[ this.buildAttraction( values.mayfest_attraction_uid ) ]}</span>
					</div>
				</tpl>

				<tpl if="this.hasName( values.mayfest_att_first_name, values.mayfest_att_last_name )">
					<div class="field">
						<label>Name:</label>
						<span>{[ this.buildName( values.mayfest_att_first_name, values.mayfest_att_last_name ) ]}</span>
					</div>
				</tpl>
				<tpl if="this.hasName( values.mayfest_att_first_name_partner, values.mayfest_att_last_name_partner )">
					<div class="field">
						<label>Partner:</label>
						<span>{[ this.buildName( values.mayfest_att_first_name_partner, values.mayfest_att_last_name_partner ) ]}</span>
					</div>
				</tpl>				
			</div>

			
			<div class="entry-content">
				{content}
			</div>
		</article>    
	</textarea>

</body>
</html>
