(function( $ ) {
	
	var defaults = { title_show  : 'Show'
				   , title_hide  : 'Hide'
				   , button_show : '«'
				   , button_hide : '»'
				   , position    : 'Right'
				   };
	
	var methods = {
		
		init : function(options) {
			return this.each( function() {
								var $this        = $(this)
								  , bInitialised = $this.data('SidePanel.Initialised');
								if( !bInitialised ) {
									var aOptions = $.extend( {} , defaults, options, $this.data() )
									  , oButton  = $('<a href="#" class="SidePanelButton"></a>').attr( 'title', aOptions.title_show )
																							    .html( aOptions.button_show )
									  , oContainer = $( '#SidePanelButtonContainer' + aOptions.position );
									
									if( oContainer.size() == 0 ) {
										oContainer = $('<ul>').addClass( 'SidePanelButtonContainer' ).attr( 'id', 'SidePanelButtonContainer' + aOptions.position ).appendTo( 'body' );
									}
									
									oButton.on('click.SidePanel', { target: $this, options: aOptions }, methods.toggleHidden );
									$('<li>').append( oButton ).appendTo( oContainer );
									$this.data('SidePanel.Initialised',true);
								}
							  }
							);
		},
		
		toggleHidden : function( oEvent ) {
			var $this    = $(this)
			  , oTarget  = oEvent.data.target
			  , aOptions = oEvent.data.options;
			if( oTarget.is( ':hidden' ) ) {
				oTarget.show(400, function() { $this.html( aOptions.button_hide ).attr('title', aOptions.title_hide); } );
			} else {
				oTarget.hide(400, function() { $this.html( aOptions.button_show ).attr('title', aOptions.title_show); } );
			}
			return false;
		}
	};
	
	$.fn.SidePanel = function( method ) {
	    if ( methods[method] ) {
	    	return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.SidePanel' );
	    }
	  };
	  
	  $( function() {
		  $('.SidePanelRight').SidePanel();
		  $('.SidePanelLeft').SidePanel( { position: 'Left', button_show: '»', button_hide : '«' } );
	  } );
	  
})( jQuery );