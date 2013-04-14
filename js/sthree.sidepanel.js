(function( $ ) {
	
	var defaults = { title_show  : 'Show'
				   , title_hide  : 'Hide'
				   , button_show : '«'
				   , button_hide : '»'
				   , position    : 'Right'
				   };
	
	var methods = {
		
		init : function( options ) {
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
									
									oButton.on('click.SidePanel', {}, function() { $this.SidePanel('toggleHidden'); } );
									$('<li>').append( oButton ).appendTo( oContainer );
									
									oNavButton = $('<a href="#" title="Hide">Hide</a>' );
									oNavButton.on( 'click.AjaxPanel', {}, function() { $this.SidePanel('toggleHidden'); } );
									$('<li>').append(oNavButton).appendTo( $('nav > ul', $this ) );
									
									$this.data('SidePanel', aOptions);
									$this.data('SidePanel.Button', oButton );
									$this.data('SidePanel.Initialised',true);
								}
							  }
							);
		},
		
		toggleHidden : function( oEvent ) {
			if( this.is( ':hidden' ) ) {
				this.SidePanel('show');
			} else {
				this.SidePanel('hide');
			}
			return false;
		},
		
		show : function() {
			var aOptions = this.data('SidePanel')
			  , oButton  = this.data('SidePanel.Button');
			
			this.show(400, function() { 
								oButton.html( aOptions.button_hide )
									   .attr('title', aOptions.title_hide); 
							  } 
						);
			return false;
		},
		
		hide : function() {
			var aOptions = this.data('SidePanel')
			  , oButton  = this.data('SidePanel.Button');
			
			this.hide(400, function() { 
								oButton.html( aOptions.button_show )
								       .attr('title', aOptions.title_show); 
							  } 
						);
			return false;
		},		
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