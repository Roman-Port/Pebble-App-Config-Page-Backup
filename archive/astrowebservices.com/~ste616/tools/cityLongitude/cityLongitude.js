require( [ "dojo/dom", "dojo/dom-attr", "dojo/dom-construct", "dojo/on", "dojo/dom-class", "dojo/request/xhr",
	   "dojo/window", "dojo/keys" ],
	 function(dom, domAttr, domConstruct, on, domClass, xhr, window, keys) {
	     
	     var getConfigData = function() {
		 var options = {
		     'longitude': Math.floor(parseFloat(domAttr.get('longitude-value', 'value')) * 1e7)
		 };
		 // Save for next launch.
		 localStorage['longitude'] = domAttr.get('longitude-value', 'value');
		 return options;
	     };

	     var getQueryParam = function(variable, defaultValue) {
		 var query = location.search.substring(1);
		 var vars = query.split('&');
		 for (var i = 0; i < vars.length; i++) {
		     var pair = vars[i].split('=');
		     if (pair[0] === variable) {
			 return decodeURIComponent(pair[1]);
		     }
		 }
		 return defaultValue || false;
	     };

	     on(dom.byId('submit-button'), 'click', function(e) {
		 var return_to = getQueryParam('return_to', 'pebblejs://close#');
		 document.location = return_to + encodeURIComponent(JSON.stringify(getConfigData()));
	     });

	     var longitudeHandler_gen = function(lng) {
		 return function() {
		     domAttr.set('longitude-value', 'value', lng);
		     window.scrollIntoView(dom.byId('submit-button'));
		 };
	     };

	     var searchForLocation = function(e) {
		 xhr("http://astrowebservices.com/~ste616/cgi-bin/cityLongitude.pl", {
		     'handleAs': "json",
		     'query': {
			 'location': domAttr.get('input-site-search', 'value')
		     }
		 }).then(function(d) {
		     console.log(d);
		     if (typeof d !== 'undefined' &&
			 typeof d.name !== 'undefined') {
			 domConstruct.empty('location-container');
			 // Show the locations.
			 for (var i = 0; i < d.name.length; i++) {
			     var l = domConstruct.create('label', {
				 'class': "item clickme",
				 'innerHTML': d.name[i]
			     }, dom.byId('location-container'));
			     on(l, 'click', longitudeHandler_gen(d.longitude[i]));
			 }
			 domClass.remove('location-wrapper', 'hidden');
		     } else {
			 domClass.add('location-wrapper', 'hidden');
		     }
		 }, function(de) {
		     console.log('error');
		     console.log(de);
		 });
	     };
	     on(dom.byId('search-button'), 'click', searchForLocation);
	     on(dom.byId('input-site-search'), 'keydown', function(e) {
		 // Check for the enter key.
		 if (e.keyCode === keys.ENTER) {
		     console.log('doing search now');
		     searchForLocation(e);
		 }
	     });

	     if (localStorage['longitude']) {
		 domAttr.set('longitude-value', 'value', localStorage['longitude']);
	     }
	 });
