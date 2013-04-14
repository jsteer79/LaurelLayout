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
	return sContent;
};

$( function() {
	$('#ContactCommentary section').endlessScroll( { fireOnce: true
        								   , insertAfter: "#ContactCommentary section > :last"
        								   , content: fGetContent
        								   , intervalFrequency: 5
      									   }
										 );
});