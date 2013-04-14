(function( $ ) {
	
	var methods = {
		
		init : function() {
			return this.each( function() {
								var $this        = $(this)
								  , bInitialised = $this.data('Panel.Initialised');
								if( !bInitialised ) {
									$this.on('click.Panel', 'header', {}, function() { $this.Panel( 'toggleBody' ); } );
									$this.data('Panel.Initialised',true);
								}
							  }
							);
		},
		
		toggleBody : function() {
			var $this = $(this)
			  , target = $('section', this );
			if( target.is( ':hidden' ) ) {
				target.slideDown( { done: function() { 
											var iCurrent = $this.parent().scrollTop()
											  , iTarget  = target.position().top
											  , iParent  = $this.parent().position().top;
											$this.parent().scrollTop( iCurrent + ( iTarget - iParent ) );
								  		  } 
								  } );
			} else {
				target.slideUp();
			}
			return false;
		},
	};
	
	$.fn.Panel = function( method ) {
	    if ( methods[method] ) {
	    	return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.Panel' );
	    }
	  };
	  
	  $( function() {
		  $('.Panel').Panel();
	  } );
	  
})( jQuery );