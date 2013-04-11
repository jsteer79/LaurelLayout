
var fDoSlideOut = function( oEvent ) {
	var $this    = $(this)
	  , oTarget  = $($this.data( 'target' ))
	  , fComplete = function() { 
						if( $this.data('alt') ) {
							var sComplete = $this.html();
							$this.html($this.data('alt'));
							$this.data('alt',sComplete);
						}
					};

	if( oTarget.is( ':hidden' ) ) {
		oTarget.show(400, fComplete);
	} else {
		oTarget.hide(400, fComplete);
	}
	return false;
};

var fGetContent = function() {
	var sContent = '';
	$.ajax( { async		: false 
		    , url 		: 'content.html'
		    , dataType	: 'html'
		    , success	: function ( sData ) {
		    				sContent = sData;
		    			  }
		    }
		  );
	console.log( sContent );
	return sContent;
};

$( function() {
	$(document).on( 'click.Trigger', '.Trigger', fDoSlideOut );
	$('#ContactCommentary section').endlessScroll( { fireOnce: true
        								   , insertAfter: "#ContactCommentary section p:last"
        								   , content: fGetContent
        								   , intervalFrequency: 5
      									   }
										 );
});