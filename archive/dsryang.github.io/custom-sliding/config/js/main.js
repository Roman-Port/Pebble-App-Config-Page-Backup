(function() {
	loadOptions();
	saveHandler();
})();

function saveHandler() {
	var $saveButton = $('#saveButton');

	$saveButton.on('click', function() {
		console.log('Saved');

		var return_to = getQueryParam('return_to', 'pebblejs://close#');
		document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
});
}

function loadOptions() {
	var $lightColorPicker = $('#lightColorPicker');
	var $darkColorPicker = $('#darkColorPicker');
	var $timeColorPicker = $('#timeColorPicker');
	var $dateColorPicker = $('#dateColorPicker');

	if (localStorage.lightColor) {
		$lightColorPicker[0].value = localStorage.lightColor;
		$darkColorPicker[0].value = localStorage.darkColor;
		$timeColorPicker[0].value = localStorage.timeColor;
		$dateColorPicker[0].value = localStorage.dateColor;
	}
}

function getAndStoreConfigData() {
	var $lightColorPicker = $('#lightColorPicker');
	var $darkColorPicker = $('#darkColorPicker');
	var $timeColorPicker = $('#timeColorPicker');
	var $dateColorPicker = $('#dateColorPicker');

	var options = {
		lightColor: $lightColorPicker.val(),
		darkColor: $darkColorPicker.val(),
		timeColor: $timeColorPicker.val(),
		dateColor: $dateColorPicker.val(),
	};

	localStorage.lightColor = options.lightColor;
	localStorage.darkColor = options.darkColor;
	localStorage.timeColor = options.timeColor;
	localStorage.dateColor = options.dateColor;

	console.log('Got options: ' + JSON.stringify(options));
	return options;
}

function getQueryParam(variable, defaultValue) {
	var query = location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair[0] === variable) {
			return decodeURIComponent(pair[i]);
		}
	}
	return defaultValue || false;
}