function getConfigData() {

	var radioFontShirousagi = document.getElementById('radio-font-shirousagi');
	var radioFontJiyucho = document.getElementById('radio-font-jiyucho');
	var radioFontMikachan = document.getElementById('radio-font-mikachan');
	var radioFontKtegaki = document.getElementById('radio-font-ktegaki');
	var radioFontHui = document.getElementById('radio-font-hui');
//	var radioFontPuchikuma = document.getElementById('radio-font-puchikuma');
	var toggleInvert = document.getElementById('toggle-invert');
	var toggleIconBattery = document.getElementById('toggle-icon-battery');
	var toggleVibrationTimeSignal = document.getElementById('toggle-vibration-time-signal');
	var toggleVibrationConnection = document.getElementById('toggle-vibration-connection');

	var options = {
		'radio-font-shirousagi': radioFontShirousagi.checked,
		'radio-font-jiyucho': radioFontJiyucho.checked,
		'radio-font-mikachan': radioFontMikachan.checked,
		'radio-font-ktegaki': radioFontKtegaki.checked,
		'radio-font-hui': radioFontHui.checked,
//		'radio-font-puchikuma': radioFontPuchikuma.checked,
		'toggle-invert': toggleInvert.checked,
		'toggle-icon-battery': toggleIconBattery.checked,
		'toggle-vibration-time-signal': toggleVibrationTimeSignal.checked,
		'toggle-vibration-connection': toggleVibrationConnection.checked
	};

	// Save for next launch
	localStorage['flag_save'] = 1;
	localStorage['radio-font-shirousagi'] = options['radio-font-shirousagi'];
	localStorage['radio-font-jiyucho'] = options['radio-font-jiyucho'];
	localStorage['radio-font-mikachan'] = options['radio-font-mikachan'];
	localStorage['radio-font-ktegaki'] = options['radio-font-ktegaki'];
	localStorage['radio-font-hui'] = options['radio-font-hui'];
//	localStorage['radio-font-puchikuma'] = options['radio-font-puchikuma'];
	localStorage['toggle-invert'] = options['toggle-invert'];
	localStorage['toggle-icon-battery'] = options['toggle-icon-battery'];
	localStorage['toggle-vibration-time-signal'] = options['toggle-vibration-time-signal'];
	localStorage['toggle-vibration-connection'] = options['toggle-vibration-connection'];

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

var buttonCancel = document.getElementById('button-cancel');

buttonCancel.addEventListener('click', function() {

//		console.log('Cancel');

	// Set the return URL depending on the runtime environment
	var return_to = getQueryParam('return_to', 'pebblejs://close#');
	document.location = return_to;

});

var buttonSave = document.getElementById('button-save');

buttonSave.addEventListener('click', function() {

//		console.log('Submit');

	// Set the return URL depending on the runtime environment
	var return_to = getQueryParam('return_to', 'pebblejs://close#');
	document.location = return_to + encodeURIComponent(JSON.stringify(getConfigData()));

});

(function() {


	var radioFontShirousagi = document.getElementById('radio-font-shirousagi');
	var radioFontJiyucho = document.getElementById('radio-font-jiyucho');
	var radioFontMikachan = document.getElementById('radio-font-mikachan');
	var radioFontKtegaki = document.getElementById('radio-font-ktegaki');
	var radioFontHui = document.getElementById('radio-font-hui');
//	var radioFontPuchikuma = document.getElementById('radio-font-puchikuma');
	var toggleInvert = document.getElementById('toggle-invert');
	var toggleIconBattery = document.getElementById('toggle-icon-battery');
	var toggleVibrationTimeSignal = document.getElementById('toggle-vibration-time-signal');
	var toggleVibrationConnection = document.getElementById('toggle-vibration-connection');

	// Load any previously saved configuration, if available
	if(localStorage['flag_save'] == "1") {
		radioFontShirousagi.checked = JSON.parse(localStorage['radio-font-shirousagi']);
		radioFontJiyucho.checked = JSON.parse(localStorage['radio-font-jiyucho']);
		radioFontMikachan.checked = JSON.parse(localStorage['radio-font-mikachan']);
		radioFontKtegaki.checked = JSON.parse(localStorage['radio-font-ktegaki']);
		radioFontHui.checked = JSON.parse(localStorage['radio-font-hui']);
//		radioFontPuchikuma.checked = JSON.parse(localStorage['radio-font-puchikuma']);
		toggleInvert.checked = JSON.parse(localStorage['toggle-invert']);
		toggleIconBattery.checked = JSON.parse(localStorage['toggle-icon-battery']);
		toggleVibrationTimeSignal.checked = JSON.parse(localStorage['toggle-vibration-time-signal']);
		toggleVibrationConnection.checked = JSON.parse(localStorage['toggle-vibration-connection']);
	}

})();
