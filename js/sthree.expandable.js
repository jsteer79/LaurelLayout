(function( $ ) {
	
	var methods = {
		
		init : function() {
			return this.each( function() {
								var $this        = $(this)
								  , bInitialised = $this.data('Expandable.Initialised');
								if( !bInitialised ) {
									var oExpandBox = $('<div class="ExpandBox">˅</div>' )
									$this.wrapInner( '<div class="wrapper"></div>' );
									if( $('.wrapper', $this ).height() > $this.height() ) {
										oExpandBox.on( 'click.Expandable', {}, function() { $this.Expandable('toggleBody'); } );
										$this.parent().append( oExpandBox );
										$this.data('Expandable.Button', oExpandBox );
									}
									$this.data('Expandable.Initialised',true);
								}
							  }
							);
		},
		
		toggleBody : function() {
			var $this = $(this)
		      , oExpandBox = $this.data('Expandable.Button');
			if( oExpandBox ) {
				if( $this.hasClass('Expandable') ) {
					$this.removeClass('Expandable');
					oExpandBox.html('˄');
				} else {
					$this.addClass('Expandable');
					oExpandBox.html('˅');
				}
			}
			return false;
		},
	};
	
	$.fn.Expandable = function( method ) {
	    if ( methods[method] ) {
	    	return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.Expandable' );
	    }
	  };
	  
	  $( function() {
		  $('.Expandable').Expandable();
	  } );
	  
})( jQuery );