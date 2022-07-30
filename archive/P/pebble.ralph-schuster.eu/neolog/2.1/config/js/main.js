(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
	var $submitButton = $('#submitButton');

	$submitButton.on('click', function() {
		console.log('Save');

		var return_to = getQueryParam('return_to', 'pebblejs://close#');
		document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
	});
}

function loadOptions() {
	var $backgroundColorPicker = $('#backgroundColorPicker');
	var $foregroundColorPicker = $('#foregroundColorPicker');
	var $inverseCheckbox = $('#inverseCheckbox');
	var $statusBarCheckbox = $('#statusBarCheckbox');

	if (localStorage.backgroundColor) {
		if ($backgroundColorPicker.length > 0) {
			$backgroundColorPicker[0].value = localStorage.backgroundColor;
			$foregroundColorPicker[0].value = localStorage.foregroundColor;
		} else {
			$inverseCheckbox[0].checked = localStorage.backgroundColor == '0xffffff';
		}
		$statusBarCheckbox[0].checked = localStorage.displayStatusBar === 'true';
	}
}

function getAndStoreConfigData() {
	var $backgroundColorPicker = $('#backgroundColorPicker');
	var $foregroundColorPicker = $('#foregroundColorPicker');
	var $inverseCheckbox = $('#inverseCheckbox');
	var $statusBarCheckbox = $('#statusBarCheckbox');

	var options;
	
	if ($backgroundColorPicker.length > 0) {
		options = {
			backgroundColor: $backgroundColorPicker.val(),
			foregroundColor: $foregroundColorPicker.val(),
			displayStatusBar: $statusBarCheckbox[0].checked
		};
	} else {
		options = {
			backgroundColor: $inverseCheckbox[0].checked ? '0xffffff' : '0x000000',
			foregroundColor: $inverseCheckbox[0].checked ? '0x000000' : '0xffffff',
			displayStatusBar: $statusBarCheckbox[0].checked
		};
	}

	localStorage.backgroundColor = options.backgroundColor;
	localStorage.foregroundColor = options.foregroundColor;
	localStorage.displayStatusBar = options.displayStatusBar;

	console.log('Got options: ' + JSON.stringify(options));
	return options;
}

function getQueryParam(variable, defaultValue) {
	var query = location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair[0] === variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	return defaultValue || false;
}