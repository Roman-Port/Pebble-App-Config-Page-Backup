jQuery(window).load(function(){
	
	function _supportsHtml5Storage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch(e) {
			return false;
		}
	}
	
	function setStorage(name, value) {
		if (_supportsHtml5Storage()) {
			return localStorage.setItem(name, value)
		} else {
			return jQuery.cookie(name, value);
		}
	}
	
	function getStorage(name) {
		if (_supportsHtml5Storage()) {
			return localStorage.getItem(name)
		} else {
			return jQuery.cookie(name);
		}
	}
	
	jQuery( 'div.nafets_imprint-accept' ).click(function(){
		setStorage( 'nafets_imprint_cookie', 1 );
		jQuery( 'div#nafets_imprint-cookie' ).fadeOut( 'fast' );
	});
	
	if( getStorage( 'nafets_imprint_cookie' ) != 1 ) {
		jQuery( 'div#nafets_imprint-cookie' ).show();
	}
	
});