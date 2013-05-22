(function( $ ) {
	
	var methods = {
		init : function() {
			return this.each( function() {
								var $this        = $(this)
								  , bInitialised = $this.data('AjaxPanel.Initialised');
								if( !bInitialised ) {
									var sAjaxSource = $this.data( 'ajax_source' );
									if( !sAjaxSource ) {
										
										
									}
									oButton = $('<a href="#" title="Refresh Panel">Refresh</a>' );
									oButton.on( 'click.AjaxPanel', {}, function() { $this.AjaxPanel('refresh'); } );
									$('<li>').append(oButton).appendTo( $('nav > ul', $this ) );
									$this.data('AjaxPanel.Initialised',true);
									$this.AjaxPanel('refresh');
								}
							  }
							);
		},
		
		refresh : function() {
			var sAjaxSource = this.data( 'ajax_source' );
			if( sAjaxSource ) {
				$('section', this ).html( 'Loading...'  );
				$('section', this ).load( sAjaxSource, function() { $('.Expandable').Expandable(); } );
			}
			return false;
		},
	};
	
	$.fn.AjaxPanel = function( method ) {
	    if ( methods[method] ) {
	    	return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	    	return methods.init.apply( this, arguments );
	    } else {
	    	$.error( 'Method ' +  method + ' does not exist on jQuery.AjaxPanel' );
	    }
	  };
	  
	  $( function() {
		  $('.AjaxPanel').AjaxPanel();
	  } );
})( jQuery );