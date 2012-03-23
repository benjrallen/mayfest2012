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
	
	//maxX & maxY are the size of the untiled image, and provide the bounds for the movement
	maxX:		5632,
	maxY:		5632,
	
	
	//initial zooming and dragging functions
	zooming:	false,
	dragging:	false,
	
	//initial map positions
	posX:		2687, // Current position in the map in pixels at the maximum zoom level (5)
	posY:		2304, // The range is 0-67108864 (2^maxZ * tileSize)... actually, it's smaller - ba
	posZ:		3.0, // This can be fractional if we are between zoom levels....
	
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
    mXprev:		0,
    mYprev:		0,
    //pinchScale:	1,
	pinchEndBuffer:	750, //for the pinchend timeout function
	//prevPinchScale: 1,
    //prevDScale:	0, //do not think this is necessary
    dScale:		0,
    scale:		1,
    
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
		var me = this;
		
		var z = me.posZ; // TODO: Round.
		var w = me.canvas.width * Math.pow(2, me.maxZ - z); // Width in level 5 pixels.
		var h = me.canvas.height * Math.pow(2, me.maxZ - z); // Height in level 5 pixels.
		var sz = me.tileSize * Math.pow(2, me.maxZ - z); // Tile size in level 5 pixels.
		
		var xMin = me.posX - w/2; // Corners of the window in level 5 pixels.
		var yMin = me.posY - h/2;
		var xMax = me.posX + w/2;
		var yMax = me.posY + h/2;
		
		
		//instead of clearing the canvas every draw, make the current tile scale to the zoom level
		me.ctx.clearRect(0,0,me.canvas.width,me.canvas.height);
		
		if( me.zooming ){
			//var pS = me.pinchScale;
			//var pDS = me.prevDScale;
			//var dS = me.dScale;
			var cW = me.canvas.width,
			    cH = me.canvas.height;
			
			me.ctx.save();
//	    	me.ctx.translate( -( ( cW * (1+dS) - cW ) / 2 ), -( ( cH * (1+dS) - cH ) / 2 ) );
//		    me.ctx.scale(1+dS, 1+dS);
	    	me.ctx.translate( -( ( cW * ( this.scale ) - cW ) / 2 ), -( ( cH * ( this.scale ) - cH ) / 2 ) );
		    me.ctx.scale( this.scale, this.scale );
		}
		
		
		//console.log( 'RENDER()', me.canvas.width, me.canvas.height, me.tileSize );
		
		// Go through all the tiles we want. If any of them aren't loaded or being loaded, do so.
		
		//console.log('xLoop: '+Math.floor(xMin / sz)+' => '+Math.ceil(xMax / sz));
		//console.log('yLoop: '+Math.floor(yMin / sz)+' => '+Math.ceil(yMax / sz));

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
		
		if( me.zooming )
			me.ctx.restore();
	},
	
    goTo: function(x, y, zoom){
        //console.log('GO TO ' + x + ', ' + y + ', ' + zoom);
        
        //console.log( this.dScale );
        
        if (!x || !y)
            return false;
    
        //if(!zoom){
            this.posX = x;
            this.posY = y;
            
            this.render();
        //} else {
        //    this.posX = x;
        //    this.posY = y;
        //    console.log('OLD CODE RENDERED ZOOM HERE!');
            //me.renderZoom();
        //}
    },
    
    moveTo: function(x,y,z){
        if (!x || !y)
            return false;
        
        var me = this;
        
//        me.targetX = x;
//        me.targetY = y;

        me.targetX = this.checkBoundsX( x );
        me.targetY = this.checkBoundsY( y );
        
        
        me.moving = true;
        
        me.moveTimeoutFunc = function(){
            //var change = Math.floor( me.targetTime / me.targetMove );
            
            if (me.moving) {
                var x = Math.floor( me.posX + ((me.targetX - me.posX) / me.movePx) );
                var y = Math.floor( me.posY + ((me.targetY - me.posY) / me.movePx) );
                
                //console.log(x+', '+y)
                
                me.lastX = me.posX;
                me.lastY = me.posY;
                
                me.goTo(x,y);
                
                if ( me.lastX === x && me.lastY === y ){
                    if(me.arrow){
                        //me.drawArrow(me.canvas.width/2, me.canvas.height/2);
                        console.log('DRAW ARROW!');
                        
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


	onMapInitialize: function( a, b, c ){

		//console.log('MAP INITIALIZE', a, b, c, this.getMapPanel(), this.canvasEl );

		var me = this;
		
		this.getMapPanel().on({
			painted: function(evt, b, c){ me.onMapActivate.call(me); }
			//painted: this.onMapActivate
		});


	},

	onMapFirstActivate: function( panel, newActiveItem, oldActiveItem, eOpts ){
		//prototype a function onto Ext.util.point
		Ext.util.Point.prototype.getMidpointOf = function( point ){
//			var deltaX = this.x - point.x,
//				deltaY = this.y - point.y;
//				
//			return {
//				x: Math.round( deltaX / 2 ),
//				y: Math.round( deltaY / 2 )
//			}

			//var deltaX = this.x - point.x,
			//	deltaY = this.y - point.y;
				
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
		
		//console.log('FIRST MAP ACTIVATE', [ this.canvasEl, this.canvas, this.ctx ] );
	},

	
	onMapActivate: function( panel, newActiveItem, oldActiveItem, eOpts ){
		//only run DOM initialization once.
		if( !this.canvasIsActivated )
			this.onMapFirstActivate.apply( this, arguments );
		
		//console.log('MAP ACTIVATE', this.getMapPanel(), [ this.canvasEl, this.canvas, this.ctx ] );
		
		
		
		//draw something
		this.render();
		
	},
	
	//cache the canvas size / 2 for the bounds checking functions
	halfCanvasWidth:	0,
	halfCanvasHeight:	0,
	
	handleResize: function( e,eOpts ){
		
		var size = this.getMapPanel().element.getSize();
		
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
            this.posZ = 0;
        
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
        
        //me.goTo(evt.midPointX, evt.midPointY);
        //console.log('pstart yeywo!');

		var point1		= evt.touches[0].point,
			point2		= evt.touches[1].point,
            midpoint	= point1.getMidpointOf( point2 );
        
        this.mXprev = midpoint.x;
        this.mYprev = midpoint.y;
//        this.mXprev = evt.midPointX;
//        this.mYprev = evt.midPointY;
        
        this.scale = evt.scale;
        //console.log('PINCHSTART SCALE: '+evt.scale);
	},
		
	onPinch: function( evt, t, o ){

        this.dScale = evt.scale - 1;
        this.scale = evt.scale;

		//I prototyped Ext.util.Point.getMidpointOf( point ) in the this.onMapFirstActivate function
		var point1		= evt.touches[0].point,
			point2		= evt.touches[1].point,
            midpoint	= point1.getMidpointOf( point2 ),
//        	x       	= Math.floor( this.posX - (midpoint.x - this.mXprev) ),
//            y       	= Math.floor( this.posY - (midpoint.y - this.mYprev) );		
        	x       	= Math.floor( this.posX - Math.round( (midpoint.x - this.mXprev) * Math.pow(2, this.maxZ - this.posZ) / this.scale ) ),
            y       	= Math.floor( this.posY - Math.round( (midpoint.y - this.mYprev) * Math.pow(2, this.maxZ - this.posZ) / this.scale ) );		
        
        //this.pinchScale = evt.scale;
        //this.prevDScale = evt.previousDeltaScale;
        
        //me.posZ += evt.previousDeltaScale/me.maxZ
        
        //console.log( this.dScale * this.maxZ + this.posZ + ', ' + this.posZ );
        //console.log( Math.pow( this.dScale, (this.maxZ - this.posZ) - 1 ) + ', ' + this.posZ );
		
		console.log( Math.round( ( Math.log( evt.scale ) / Math.log(2) ) ) + this.posZ );
		
		//Math.pow(2, me.maxZ - z)


//pinchmap.setZoomLevelPoint(Math.round((Math.log(p.scale)/Math.log(2)) + __oldZoom), p.center.x, p.center.y);
		        
        this.goTo(x, y, true);
        
        this.mXprev = midpoint.x;
        this.mYprev = midpoint.y;

	},
		
	onPinchEnd: function( evt, t, o ){
		var me = this;
		
        //var dScale = evt.scale - 1;
        //var cW = me.canvas.width;
        //var cH = me.canvas.height;
        var startPosZ = me.posZ;
        //console.log(dScale);
        
//        console.log([
//        	'pinchEnd',
//        	evt.scale,
//        	this.dScale,
//        	me.posZ
//        ].join(', '));
        
        //me.posZ = Math.round( me.posZ + this.dScale );
        //me.posZ = Math.round( me.dScale * me.maxZ + me.posZ );
        me.posZ = Math.round( ( Math.log( me.scale ) / Math.log(2) ) ) + me.posZ;
        
        if (me.posZ > 5) {
            me.posZ = 5;
        } else if (me.posZ < 0) {
            me.posZ = 0;
        }
        //console.log('after: '+me.posZ);
        
        //me.posX += -( ( cW * (1+dScale/me.maxZ) - cW ) / 2 );
        //me.posY += -( ( cH * (1+dScale/me.maxZ) - cH ) / 2 );
        
        //me.ctx.translate( -( ( cW * (1+dS/me.maxZ) - cW ) / 2 ), -( ( cH * (1+dS/me.maxZ) - cH ) / 2 ) );
//    	if (me.posZ !== startPosZ) {
//    	    //console.log(['_trackEvent', 'Map', 'Zoom : Pinch', startPosZ+' to '+me.posZ]);
//            _gaq.push(['_trackEvent', 'Map', 'Zoom : Pinch', startPosZ+' to '+me.posZ]);
//    	}
        
        var pinchEndToFunc = function(){
            me.zooming = false;
            me.render();
        };
        
        setTimeout(pinchEndToFunc, this.pinchEndBuffer);


//        var dScale = evt.deltaScale;
//        var cW = me.canvas.width;
//        var cH = me.canvas.height;
//        var startPosZ = me.posZ;
//        //console.log(dScale);
//        
//        me.posZ = Math.round( me.posZ + (dScale) );
//        if (me.posZ > 5) {
//            me.posZ = 5;
//        } else if (me.posZ < 0) {
//            me.posZ = 0;
//        }
//        //console.log('after: '+me.posZ);
//        
//        me.posX += -( ( cW * (1+dScale/me.maxZ) - cW ) / 2 );
//        me.posY += -( ( cH * (1+dScale/me.maxZ) - cH ) / 2 );
//        
//        //me.ctx.translate( -( ( cW * (1+dS/me.maxZ) - cW ) / 2 ), -( ( cH * (1+dS/me.maxZ) - cH ) / 2 ) );
////    	if (me.posZ !== startPosZ) {
////    	    //console.log(['_trackEvent', 'Map', 'Zoom : Pinch', startPosZ+' to '+me.posZ]);
////            _gaq.push(['_trackEvent', 'Map', 'Zoom : Pinch', startPosZ+' to '+me.posZ]);
////    	}
//        
//        var pinchEndToFunc = function(){
//            me.zooming = false;
//            me.render();
//        };
//        
//        setTimeout(pinchEndToFunc, this.pinchEndBuffer);
	},
		
//    me.onPinchstart = function(evt, t, o){ 
//        me.zooming = true;
//        globalMoving = false;
//        me.dragging = false;
//        
//        globalMoving = false;
//        clearTimeout(me.moveTimeout);
//        
//        //me.goTo(evt.midPointX, evt.midPointY);
//        //console.log('pstart yeywo!');
//        
//        me.mXprev = evt.midPointX;
//        me.mYprev = evt.midPointY;
//        
//        //console.log('PINCHSTART SCALE: '+evt.scale);
//    };
//    me.onPinchend = function(evt, t, o){ 
//        
//        var dScale = evt.deltaScale;
//        var cW = me.canvas.width;
//        var cH = me.canvas.height;
//        var startPosZ = me.posZ;
//        //console.log(dScale);
//        
//        me.posZ = Math.round( me.posZ + (dScale) );
//        if (me.posZ > 5) {
//            me.posZ = 5;
//        } else if (me.posZ < 0) {
//            me.posZ = 0;
//        }
//        //console.log('after: '+me.posZ);
//        
//        me.posX += -( ( cW * (1+dScale/me.maxZ) - cW ) / 2 );
//        me.posY += -( ( cH * (1+dScale/me.maxZ) - cH ) / 2 );
//        
//        //me.ctx.translate( -( ( cW * (1+dS/me.maxZ) - cW ) / 2 ), -( ( cH * (1+dS/me.maxZ) - cH ) / 2 ) );
//    	if (me.posZ !== startPosZ) {
//    	    //console.log(['_trackEvent', 'Map', 'Zoom : Pinch', startPosZ+' to '+me.posZ]);
//            _gaq.push(['_trackEvent', 'Map', 'Zoom : Pinch', startPosZ+' to '+me.posZ]);
//    	}
//        
//        var pinchEndToFunc = function(){
//            me.zooming = false;
//            me.render();
//        };
//        
//        setTimeout(pinchEndToFunc, 750);
//    }
//    me.onPinch = function(evt, t, o){
//        
//        //var scale   = evt.scale,
//        var scale   = evt.scale,
//            dScale  = evt.deltaScale,
//            mX      = evt.midPointX,
//            mY      = evt.midPointY,
//            x       = Math.floor( me.posX - (mX - me.mXprev) ),
//            y       = Math.floor( me.posY - (mY - me.mYprev) );
//        
//        me.pinchScale = scale;
//        me.prevDScale = evt.previousDeltaScale;
//        me.dScale = evt.deltaScale;
//        //me.posZ += evt.previousDeltaScale/me.maxZ
//            
//        me.goTo(x, y, true);
//        
//        me.mXprev = mX;
//        me.mYprev = mY;
//    };


	onDragStart: function( evt, t, o ){
		this.dragging = true;
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
	
//	checkBounds: function(){
//		
//		//check x min
//		if( this.posX - this.halfCanvasWidth < 0 )
//			this.posX = this.halfCanvasWidth;
//		
//		//check y min
//		if( this.posY - this.halfCanvasHeight < 0 )
//			this.posY = this.halfCanvasHeight;
//			
//		//check x max
//		if( this.maxX - this.halfCanvasWidth < this.posX )
//			this.posX = this.maxX - this.halfCanvasWidth;
//
//		//check y max
//		if( this.maxY - this.halfCanvasHeight < this.posY )
//			this.posY = this.maxY - this.halfCanvasHeight;
//
//	},
	
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
	}
			
});