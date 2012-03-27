Ext.define('Mayfest.controller.Map', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			mapPanel: {
				selector: 'canvasmap'
			}
		},
		control: {
			mapPanel : {
				initialize: 'onMapInitialize'
			}
		}
	},
	
	init: function(){
		//console.log( 'Attractions Controller Inited' );
				
		var me = this;
		
		Mayfest.ui.mapController = me;
		
		//console.log('Map Controller Init', this.getMapPanel() );
		
	},
	

	//cache it to keep phone from calling this function ten thousand times
	//  TEMPORARY use for development
	basePath: Mayfest.paths.base(),

	//some stuff we only want to run once on activate
	canvasIsActivated: false,

	// "static" variables
	tileSize:	256,
	maxZ:		5, //minimum is 0
	minZ:		1, //not yet in use
	
	//maxX & maxY are the size of the untiled image, and provide the bounds for the movement
	maxX:		5632,
	maxY:		5632,
	
	
	//initial zooming and dragging functions
	zooming:	false,
	dragging:	false,
	
	//initial map positions
	posX:		2687, // Current position in the map in pixels at the maximum zoom level (5)
	posY:		2304, // The range is 0-67108864 (2^maxZ * tileSize)... actually, it's smaller - ba
	posZ:		3, // This can be fractional if we are between zoom levels....
	
	//controller reference to canvas element, get set on render
	canvasEl:	null,
	canvas:		null,
	ctx:		null,
	
	// Used as an associative array. They keys have to be strings, ours will be "xindex,yindex,zindex" e.g. "13,245,12".
	tiles:		{},	

	//how long the drag lingers in the moveTo function on dragEnd
	dragLinger:	100,  //higher number means drag lingers longer, and this number gets divided by the current zoom level (me.posZ);

	//variables for moveTo function
	arrow:		false,
	arrowDrawn: false,
	moving:		false,
	targetX:	0,
	targetY:	0,
	targetTime:	2000,
	targetMove: Math.floor( 1000/30 ),
	lastX:		0,
	lastY:		0,
	
	movePx:		10, //higher number = slower move

	moveTimeoutFunc: null,
	moveTimeout:	 null,

    //for pinching
//    midpointPrev: {
//    	x: 0,
//    	y: 0
//    },
        
	pinchEndBuffer:	250, //for the pinchend timeout function
    scale:		1,
    prevScale:	1,
    
	//cache the canvas size / 2 for the bounds checking functions
	halfCanvasWidth:	0,
	halfCanvasHeight:	0,
    
    //for zooming
    zooming:	false,
    zoom:		1,	
	

    //watch the url strings here on launch!!
	guruLogoString: "http://mayfestmobile.com/img/guruLogoAlpha256.png",

    //watch the url strings here on launch!!
    getTileString: function(x,y,z){
        n = this.normaliseIndices(x, y, z);
		x = n[0]; y = n[1]; z = n[2];
		
		//random number function for image subdomains for map loading
		
		//var sub = this.rand(5);
		//var url = "http://i"+sub+".mayfestmobile.com/img/map/tiles/pngbatch/" + z + "_" + x + "_" + y + ".png";
		return this.basePath + "mobile-map/img/map/tiles/pngbatch/" + z + "_" + x + "_" + y + ".png";
		        
		//return url;
    },
    
    //random number generator for image subdomains
    rand: function(n){
        return Math.floor(Math.random()*n); // Could this actually return num? What if Math.random() returns 1.0000 (very unlikely but possible?)
    },
    
    mod: function(a,b){
        return ((a % b) + b) % b;
    },
    
    normaliseIndices: function(x,y,z){
        return [this.mod(x, Math.pow(2, z)), this.mod(y, Math.pow(2, z)), z];
    },

    encodeIndex: function(x,y,z){
        n = this.normaliseIndices(x, y, z);
		x = n[0]; y = n[1]; z = n[2];
		return x + "," + y + "," + z;
    },
    
    decodeIndex: function(t){
        return t.split(',', 3);
    },

	//render
	render: function(){
		
		//clear the canvas		
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		
		if( this.zooming ){
			
			this.ctx.save();
			
	    	this.ctx.translate( 
	    		Math.floor( -1 * ( this.canvas.width  * ( this.scale ) - this.canvas.width  ) / 2 ), 
	    		Math.floor( -1 * ( this.canvas.height * ( this.scale ) - this.canvas.height ) / 2 ) 
	    	);
		    
		    //scale the canvas image based on the pinch
		    //	TODO: make this not corp the image when zooming out.
		    this.ctx.scale( this.scale, this.scale );		    
		}
				
		this.drawTiles();
		
			
		if( this.zooming )
			this.ctx.restore();
	},
	
	drawTiles: function(){
		var me = this;
		
		var z = me.posZ; // TODO: Round.
		var w = me.canvas.width * Math.pow(2, me.maxZ - z); // Width in level 5 pixels.
		var h = me.canvas.height * Math.pow(2, me.maxZ - z); // Height in level 5 pixels.
		var sz = me.tileSize * Math.pow(2, me.maxZ - z); // Tile size in level 5 pixels.
		
		var xMin = me.posX - w/2; // Corners of the window in level 5 pixels.
		var yMin = me.posY - h/2;
		var xMax = me.posX + w/2;
		var yMax = me.posY + h/2;

		
		// Go through all the tiles we want. If any of them aren't loaded or being loaded, do so.
				
		for (var x = Math.floor(xMin / sz); x < Math.ceil(xMax / sz); ++x)
		{
			for (var y = Math.floor(yMin / sz); y < Math.ceil(yMax / sz); ++y)
			{
				var xoff = (x * sz - xMin) / Math.pow(2, me.maxZ-z);
				var yoff = (y * sz - yMin) / Math.pow(2, me.maxZ-z);
				var tileKey = me.encodeIndex(x, y, z);
				//console.log(tileKey);
				if (this.tiles[tileKey] && this.tiles[tileKey].complete){				    
					// Round here is **CRUICIAL** otherwise the images are filtered and the performance sucks (more than I would expect but hey).
				    me.ctx.drawImage(me.tiles[tileKey], Math.round(xoff), Math.round(yoff));
				}
				else
				{
					if (!me.tiles[tileKey])
					{
						me.tiles[tileKey] = new Image();
						me.tiles[tileKey].onerror = function(e){
							//console.log(e);
							//console.log('image error');
							//console.log(this);
							this.src = me.guruLogoString;
						};
						me.tiles[tileKey].src = me.getTileString(x, y, me.posZ);
						me.tiles[tileKey].onload = function()
						{
							// TODO: Just render this tile where it should be.
			//				me.ctx.drawImage(me.tiles[tileKey], Math.round(xoff), Math.round(yoff)); // Doesn't work for some reason.
							me.render();
						}
					}
					me.ctx.fillStyle = "#ffffff";
					me.ctx.fillRect(Math.round(xoff), Math.round(yoff), me.tileSize, me.tileSize);
				}
			}
		}
		
		//watch that arrow
		if( me.arrowDrawn )
			me.drawArrow( me.canvas.width/2, me.canvas.height/2 );		
		
	},
	
    goTo: function(x, y, zoom){
        //console.log('GO TO ' + x + ', ' + y + ', ' + zoom);
        
        if (!x || !y)
            return false;
    
        this.posX = x;
        this.posY = y;
        
        this.render();
    },
    
    
    //z not in use.
    moveTo: function(x,y,z){
        if (!x || !y)
            return false;
        
        var me = this;

        me.targetX = this.checkBoundsX( x );
        me.targetY = this.checkBoundsY( y );
        
        me.moving = true;
        
        me.moveTimeoutFunc = function(){
            
            if (me.moving) {
                var x = Math.floor( me.posX + ((me.targetX - me.posX) / me.movePx) );
                var y = Math.floor( me.posY + ((me.targetY - me.posY) / me.movePx) );
                
                //console.log(x+', '+y)
                
                me.lastX = me.posX;
                me.lastY = me.posY;
                
                me.goTo(x,y);
                
                if ( me.lastX === x && me.lastY === y ){
                    if(me.arrow){
                        me.drawArrow( me.canvas.width/2, me.canvas.height/2 );
                        //console.log('DRAW ARROW!');
                        me.arrowDrawn = true;
                        me.arrow = false;
                    }
                    return;
                }
                
                return me.moveTimeout = setTimeout(me.moveTimeoutFunc, me.targetMove);
            }
        };
        
        //console.log('moving yo');
        
        return me.moveTimeout = setTimeout(me.moveTimeoutFunc, me.targetMove);
        //return;
    },


    drawArrow: function(pointX, pointY){
		//console.log( 'drawArrow', pointX, pointY );
    	
        if (!pointX || !pointY)
            return false;
        
        //arrow is 44x80px, approx.
        var me = this,
        	w = 34,
            h = 80,
            x = pointX - w/2,
            y = pointY - h;
        
        // layer1/Path
        me.ctx.save();
        me.ctx.beginPath();
        me.ctx.moveTo(x+33.5, y+43.1);
        me.ctx.bezierCurveTo(x+32.7, y+42.6, x+32.0, y+42.1, x+31.2, y+41.6);
        me.ctx.bezierCurveTo(x+30.5, y+41.2, x+29.8, y+40.7, x+29.0, y+40.2);
        me.ctx.bezierCurveTo(x+29.0, y+40.2, x+28.1, y+39.7, x+28.1, y+39.7);
        me.ctx.bezierCurveTo(x+26.1, y+43.4, x+24.1, y+47.2, x+22.3, y+51.0);
        me.ctx.bezierCurveTo(x+21.8, y+51.9, x+21.4, y+52.8, x+20.9, y+53.8);
        me.ctx.bezierCurveTo(x+20.9, y+47.3, x+20.9, y+40.8, x+21.1, y+34.4);
        me.ctx.bezierCurveTo(x+21.3, y+24.8, x+21.6, y+15.2, x+22.0, y+5.7);
        me.ctx.bezierCurveTo(x+22.0, y+4.8, x+22.1, y+4.0, x+22.1, y+3.2);
        me.ctx.bezierCurveTo(x+19.6, y+2.9, x+17.2, y+2.0, x+14.7, y+1.7);
        me.ctx.bezierCurveTo(x+14.5, y+6.7, x+14.3, y+11.7, x+14.2, y+16.8);
        me.ctx.bezierCurveTo(x+13.8, y+26.3, x+13.6, y+35.8, x+13.6, y+45.3);
        me.ctx.bezierCurveTo(x+13.5, y+47.3, x+13.5, y+49.3, x+13.6, y+51.2);
        me.ctx.bezierCurveTo(x+12.8, y+49.6, x+12.1, y+47.9, x+11.4, y+46.2);
        me.ctx.bezierCurveTo(x+10.4, y+44.0, x+9.5, y+41.8, x+8.6, y+39.6);
        me.ctx.bezierCurveTo(x+8.6, y+39.6, x+7.7, y+39.9, x+7.6, y+39.9);
        me.ctx.bezierCurveTo(x+6.7, y+40.2, x+5.9, y+40.4, x+5.1, y+40.7);
        me.ctx.bezierCurveTo(x+4.2, y+41.0, x+3.4, y+41.2, x+2.6, y+41.5);
        me.ctx.bezierCurveTo(x+2.6, y+41.5, x+1.5, y+41.9, x+1.5, y+41.9);
        me.ctx.bezierCurveTo(x+3.2, y+45.8, x+4.8, y+49.7, x+6.5, y+53.6);
        me.ctx.bezierCurveTo(x+8.2, y+57.5, x+10.0, y+61.3, x+11.9, y+65.0);
        me.ctx.bezierCurveTo(x+13.0, y+67.1, x+14.1, y+69.1, x+15.3, y+71.1);
        me.ctx.lineTo(x+19.0, y+79.0);
        me.ctx.lineTo(x+20.9, y+72.8);
        me.ctx.bezierCurveTo(x+22.2, y+68.9, x+23.8, y+65.1, x+25.5, y+61.3);
        me.ctx.bezierCurveTo(x+27.3, y+57.5, x+29.2, y+53.7, x+31.1, y+49.9);
        me.ctx.bezierCurveTo(x+32.2, y+47.8, x+33.3, y+45.8, x+34.4, y+43.7);
        me.ctx.bezierCurveTo(x+34.4, y+43.6, x+33.5, y+43.1, x+33.5, y+43.1);
        me.ctx.closePath();
        me.ctx.fillStyle = "rgb(239, 73, 53)";
        me.ctx.fill();
        me.ctx.lineWidth = 3.0;
        me.ctx.strokeStyle = "rgb(255, 255, 255)";
        me.ctx.stroke();
        me.ctx.restore();
        /*
        // layer1/Group
        me.ctx.save();

        // layer1/Group/Path
        me.ctx.save();
        me.ctx.beginPath();
        me.ctx.moveTo(x+0.0, y+41.1);
        me.ctx.lineTo(x+10.5, y+41.1);
        me.ctx.lineTo(x+10.5, y+0.0);
        me.ctx.lineTo(x+32.7, y+0.0);
        me.ctx.lineTo(x+32.7, y+41.1);
        me.ctx.lineTo(x+43.4, y+41.1);
        me.ctx.lineTo(x+21.7, y+78.6);
        me.ctx.lineTo(x+0.0, y+41.1);
        me.ctx.closePath();
        me.ctx.fillStyle = "rgb(237, 28, 36)";
        me.ctx.fill();

        // layer1/Group/Path
        me.ctx.beginPath();
        me.ctx.moveTo(x+31.3, y+59.2);
        me.ctx.lineTo(x+40.9, y+42.5);
        me.ctx.lineTo(x+31.3, y+42.5);
        me.ctx.lineTo(x+31.3, y+1.4);
        me.ctx.lineTo(x+12.0, y+1.4);
        me.ctx.lineTo(x+12.0, y+42.5);
        me.ctx.lineTo(x+2.4, y+42.5);
        me.ctx.lineTo(x+12.1, y+59.2);
        me.ctx.lineTo(x+21.7, y+75.8);
        me.ctx.lineTo(x+31.3, y+59.2);
        me.ctx.closePath();
        me.ctx.fill();
        me.ctx.strokeStyle = "rgb(255, 255, 255)";
        me.ctx.stroke();
        me.ctx.restore();
        me.ctx.restore();
        */
    },
	
	handleResize: function( e,eOpts ){
		
		var size = this.getMapPanel().element.getSize();
		
//		this.canvas.height = this.canvasHeight = size.height;
//		this.canvas.width = this.canvasWidth = size.width;
		this.canvas.height = size.height;
		this.canvas.width = size.width;

		this.halfCanvasWidth = Math.floor( this.canvas.height / 2 );
		this.halfCanvasHeight = Math.floor( this.canvas.height / 2 );

		this.render();
		//return;
				
		//console.log( 'RESIZE1', size );		
	},
	
	onDoubleTap: function( evt, t, o ){
		this.posZ < this.maxZ ?
            this.posZ++ :
            this.posZ = this.minZ;
        
        this.render();
        
        //console.log(['_trackEvent', 'Map', 'Zoom : doubletap', this.posZ]);
        //_gaq.push(['_trackEvent', 'Map', 'Zoom : doubletap', this.posZ]);

	},

    onTouchStart: function(){
        this.moving = false;
        clearTimeout(this.moveTimeout);
    },

//PINCH EVENTS HAVE CHANGED IN SENCHA TOUCH 2
/*
	Based on:
                touches: touches,  //array of objects
                	touch[0].pageX = int;
                	touch[0].pageY = int;
                	touch[0].point = {
                		x:  int,
                		y:  int
                	}
                distance: distance,
                	
                scale: 1
*/

	onPinchStart: function( evt, t, o ){
        this.zooming = true;
        this.moving = false;
        this.dragging = false;
        
        clearTimeout(this.moveTimeout);
        
		var point1		= evt.touches[0].point,
			point2		= evt.touches[1].point,
            midpoint	= point1.getMidpointOf( point2 );
        
        //this.mXprev = midpoint.x;
        //this.mYprev = midpoint.y;
        
        this.midpointPrev = midpoint;
        
        this.scale = evt.scale;
        this.prevScale = 1;
        
        //erase the arrow if it is there
        this.arrowDrawn = false;
        //console.log('PINCHSTART SCALE: '+evt.scale);
	},
		
	onPinch: function( evt, t, o ){

        this.scale = evt.scale;

		//I prototyped Ext.util.Point.getMidpointOf( point ) in the this.onMapFirstActivate function
		var point1		= evt.touches[0].point,
			point2		= evt.touches[1].point,
            midpoint	= point1.getMidpointOf( point2 ),
        	x       	= Math.floor( this.posX - Math.round( (midpoint.x - this.midpointPrev.x) * Math.pow(2, this.maxZ - this.posZ) / this.scale ) ),
            y       	= Math.floor( this.posY - Math.round( (midpoint.y - this.midpointPrev.y) * Math.pow(2, this.maxZ - this.posZ) / this.scale ) );		
        
		//put in limit for zooming in
		var currentZ = Math.round( ( Math.log( evt.scale ) / Math.log(2) ) ) + this.posZ;
		if( currentZ > this.maxZ || currentZ < this.minZ ){
			this.scale = this.prevScale;
		} else {
			this.prevScale = this.scale;
		}
				        
        this.goTo(x, y, true);
        
        this.midpointPrev = midpoint;

	},
		
	onPinchEnd: function( evt, t, o ){
		var me = this;
		
//        var startPosZ = me.posZ;

        me.posZ = Math.round( ( Math.log( me.scale ) / Math.log(2) ) ) + me.posZ;
        
        if (me.posZ > 5) {
            me.posZ = 5;
        } else if (me.posZ < me.minZ) {
            me.posZ = me.minZ;
        }
        
//    	if (me.posZ !== startPosZ) {
//    	    //console.log(['_trackEvent', 'Map', 'Zoom : Pinch', startPosZ+' to '+me.posZ]);
//            _gaq.push(['_trackEvent', 'Map', 'Zoom : Pinch', startPosZ+' to '+me.posZ]);
//    	}
        
        var pinchEndToFunc = function(){
        	        	
            me.zooming = false;
            me.render();
        };
        
        setTimeout(pinchEndToFunc, this.pinchEndBuffer);


	},

	onDragStart: function( evt, t, o ){
		this.dragging = true;
        //erase the arrow if it is there
        this.arrowDrawn = false;
	},
	
	onDrag: function( evt, t, o ){
        if (!this.zooming && this.dragging){
            
            if (evt.absDeltaX > 10 || evt.absDeltaY > 10){
        
    		    var dX = evt.previousDeltaX;
    			var dY = evt.previousDeltaY;
    			this.posX -= dX * Math.pow(2, this.maxZ-this.posZ);
    			this.posY -= dY * Math.pow(2, this.maxZ-this.posZ);

				
				this.posX = this.checkBoundsX( this.posX );
				this.posY = this.checkBoundsY( this.posY );

				//console.log( this.posX, this.posY );

    			this.render();
            }
        }
	},
	
	checkBoundsX: function( x ){
		
		//check x min
		if( x - this.halfCanvasWidth < 0 ){
			//console.log('- X bound');
			return this.halfCanvasWidth;
		}
		
		//check x max
		if( this.maxX - this.halfCanvasWidth < x ){
			//console.log('+ X bound');
			return ( this.maxX - this.halfCanvasWidth );
		}
		
		//passed check
		return x;
	},
	
	checkBoundsY: function( y ){
		
		//check y min
		if( y - this.halfCanvasHeight < 0 ){
			//console.log('- Y bound');
			return this.halfCanvasHeight;
		}

		//check y max
		if( this.maxY - this.halfCanvasHeight < y ){
			//console.log('+ Y bound');
			return ( this.maxY - this.halfCanvasHeight );
		}
		
		//passed check
		return y;
	},
		
	onDragEnd: function( evt, t, o ){
        this.dragging = false;
        
        var dX = evt.previousDeltaX,
            dY = evt.previousDeltaY,
            pX = this.posX,
            pY = this.posY, 
            dL = this.dragLinger / (this.posZ === 0 ? 0.5 : this.posZ), //can't divide by 0, duh.
            tX = Math.floor(pX - dX * dL),
            tY = Math.floor(pY - dY * dL);
        
        //console.log('ON DRAG END');
        
        if (!this.zooming){
            //function not defined yet.  temporarily commented out.
            this.moveTo(tX, tY);
        }
	},
	
	zoomIn: function(){
        if (this.posZ < this.maxZ){
            ++this.posZ;
            this.render();
        }
    },
    
    zoomOut: function(){
        if (this.posZ > this.minZ){
            --this.posZ;
            this.render();
        }
    },


	onMapInitialize: function( panel ){

		//console.log('MAP INITIALIZE', a, b, c, this.getMapPanel(), this.canvasEl );

		var me = this;
		
		Mayfest.ui.map = panel;
		
		this.getMapPanel().on({
			painted: function(evt){ me.onMapActivate.call(me); }
			//painted: this.onMapActivate
		});


	},

	
	onMapActivate: function( panel, newActiveItem, oldActiveItem, eOpts ){
		//only run DOM initialization once.
		if( !this.canvasIsActivated )
			this.onMapFirstActivate.apply( this, arguments );
		
		//console.log('MAP ACTIVATE', this.getMapPanel(), [ this.canvasEl, this.canvas, this.ctx ] );
		
		//draw the map
		this.render();
	},

	onMapFirstActivate: function( panel, newActiveItem, oldActiveItem, eOpts ){
		
		var me = this;
		
		//prototype a function onto Ext.util.point
		Ext.util.Point.prototype.getMidpointOf = function( point ){				
			return {
				x: Math.round( (this.x + point.x) / 2 ),
				y: Math.round( (this.y + point.y) / 2 )
			}
		};
		
		//set the flag
		this.canvasIsActivated = true;
		//get reference to elements
		this.canvasEl =	Ext.get('canvas');
		this.canvas = 	this.canvasEl.dom;
		this.ctx = 		this.canvas.getContext('2d'),
		
		//attach orientation change handlers
		//	http://stackoverflow.com/questions/8541485/how-to-handle-orientation-change-in-sencha-touch-v2
		Ext.Viewport.on('resize', 'handleResize', this, { buffer: 0 });

		this.handleResize();

		this.canvasEl.on({
			dragstart	: this.onDragStart,
			drag		: this.onDrag,
			dragend		: this.onDragEnd,
			doubletap	: this.onDoubleTap,
			touchstart	: this.onTouchStart,
			pinchstart	: this.onPinchStart,
			pinchend	: this.onPinchEnd,
			pinch		: this.onPinch,
			
			scope		: this
		});
		
		
		//attach handlers to zoom buttons
        Ext.get('zoomIn').on({ 
        	tap : function(){
			    me.zoomIn();
			    
			    //console.log(['_trackEvent', 'Map', 'Zoom In : Button', me.posZ]);
			    //_gaq.push(['_trackEvent', 'Map', 'Zoom In : Button', me.posZ]);
			}
        });
        Ext.get('zoomOut').on({ 
        	tap : function(){
				me.zoomOut();
				
				//console.log(['_trackEvent', 'Map', 'Zoom Out : Button', me.posZ]);
				//_gaq.push(['_trackEvent', 'Map', 'Zoom Out : Button', me.posZ]);
			}
        });
		
		
		//console.log('FIRST MAP ACTIVATE', [ this.canvasEl, this.canvas, this.ctx ] );
	}
			
});