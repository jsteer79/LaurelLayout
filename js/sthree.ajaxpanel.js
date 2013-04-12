(function( $ ) {
	
	var methods = {
		init : function() {
			return this.each( function() {
								var $this        = $(this)
								  , bInitialised = $this.data('AjaxPanel.Initialised');
								if( !bInitialised ) {
									var sAjaxSource = $this.data( 'ajax_source' );
									if( sAjaxSource ) {
										methods.doRefresh( $this, sAjaxSource );
										$('nav > ul', $this ).append( '<li><a class="PanelRefresh" href="#" title="Refresh Panel">Refresh</a></li>' );
										$this.on( 'click.AjaxPanel', '.PanelRefresh', { target: $this }, methods.refresh );
									}
									$this.data('AjaxPanel.Initialised',true);
								}
							  }
							);
		},
		
		refresh : function( oEvent ) {
			$this = oEvent.data.target;
			var sAjaxSource = $this.data( 'ajax_source' );
			if( sAjaxSource ) {
				methods.doRefresh( $this, sAjaxSource );
			}
			return false;
		},
		
		doRefresh : function( oPanel, sUrl ) {
			$('section', oPanel ).html( 'Loading...'  );
			$('section', oPanel ).load( sUrl );
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