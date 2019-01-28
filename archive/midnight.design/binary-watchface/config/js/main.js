// Get a value from the query string, or a default value if not set
var getQueryParam = function(variableName, defaultValue) {
	var query = location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair[0] === variableName) {
			return decodeURIComponent(pair[1]);
		}
	}
	return defaultValue || false;
};

// Pull the current values from the input fields
var getAndStoreConfigData = function() {
	var options = {
		showDate: $('#showDate')[0].checked,
		showBluetooth: $('#showBluetooth')[0].checked,
		theme: parseInt($('#theme').val())
	};
	
	localStorage['binaryWatchface.showDate'] = options.showDate;
	localStorage['binaryWatchface.showBluetooth'] = options.showBluetooth;
	localStorage['binaryWatchface.theme'] = options.theme;
	
	return options;
};

var loadOptions = function() {
	if (localStorage['binaryWatchface.showDate']) {
		$('#showDate')[0].checked = localStorage['binaryWatchface.showDate'] === 'true';
	}
	if (localStorage['binaryWatchface.showBluetooth']) {
		$('#showBluetooth')[0].checked = localStorage['binaryWatchface.showBluetooth'] === 'true';
	}
	if (localStorage['binaryWatchface.theme']) {
		$('#theme')[0].value = localStorage['binaryWatchface.theme'];
	}
};

(function() {
	loadOptions();
	$('#sendBtn').on('click', function() {
		var return_to = getQueryParam('return_to', 'pebblejs://close#');
		document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
	});
})();

