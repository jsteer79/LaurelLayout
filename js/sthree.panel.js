(function( $ ) {
	
	var methods = {
		
		init : function() {
			return this.each( function() {
								var $this        = $(this)
								  , bInitialised = $this.data('Panel.Initialised');
								if( !bInitialised ) {
									$this.on('click.Panel', 'header', { target: $this }, methods.toggleBody );
									$this.data('Panel.Initialised',true);
								}
							  }
							);
		},
		
		toggleBody : function( oEvent ) {
			var target = $('section', oEvent.data.target );
			if( target.is( ':hidden' ) ) {
				target.slideDown( { done: function() { 
											var iCurrent = oEvent.data.target.parent().scrollTop()
											  , iTarget  = target.position().top
											  , iParent  = oEvent.data.target.parent().position().top;
											oEvent.data.target.parent().scrollTop( iCurrent + ( iTarget - iParent ) );
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