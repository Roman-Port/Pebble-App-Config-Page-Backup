function getConfigData() {

	var radioHandDiamond = document.getElementById('radio-hand-diamond');
	var radioHandTrapezoid = document.getElementById('radio-hand-trapezoid');
	var radioHandRectangle = document.getElementById('radio-hand-rectangle');
	var radioHandPentagon = document.getElementById('radio-hand-pentagon');
	var radioHandRound = document.getElementById('radio-hand-round');
	var radioHandArrow = document.getElementById('radio-hand-arrow');
	var toggleInvert = document.getElementById('toggle-invert');
	var toggleItemSecondhand = document.getElementById('toggle-item-secondhand');
	var toggleItemDate = document.getElementById('toggle-item-date');
	var toggleItemNumber = document.getElementById('toggle-item-number');
	var toggleItemIndex = document.getElementById('toggle-item-index');
	var toggleVibrationTimeSignal = document.getElementById('toggle-vibration-time-signal');
	var toggleVibrationConnection = document.getElementById('toggle-vibration-connection');
	var radioTapNone = document.getElementById('radio-tap-none');
	var radioTapC5 = document.getElementById('radio-tap-c5');
	var radioTapC10 = document.getElementById('radio-tap-c10');
	var timeShift = document.getElementById('time-shift');
	var radio1stdaySunday = document.getElementById('radio-1stday-sunday');
	var radio1stdayMonday = document.getElementById('radio-1stday-monday');

	var options = {
		'radio-hand-diamond': radioHandDiamond.checked,
		'radio-hand-trapezoid': radioHandTrapezoid.checked,
		'radio-hand-rectangle': radioHandRectangle.checked,
		'radio-hand-pentagon': radioHandPentagon.checked,
		'radio-hand-round': radioHandRound.checked,
		'radio-hand-arrow': radioHandArrow.checked,
		'toggle-invert': toggleInvert.checked,
		'toggle-item-secondhand': toggleItemSecondhand.checked,
		'toggle-item-date': toggleItemDate.checked,
		'toggle-item-number': toggleItemNumber.checked,
		'toggle-item-index': toggleItemIndex.checked,
		'toggle-vibration-time-signal': toggleVibrationTimeSignal.checked,
		'toggle-vibration-connection': toggleVibrationConnection.checked,
		'radio-tap-none': radioTapNone.checked,
		'radio-tap-c5': radioTapC5.checked,
		'radio-tap-c10': radioTapC10.checked,
		'time-shift': timeShift.value,
		'radio-1stday-sunday': radio1stdaySunday.checked,
		'radio-1stday-monday': radio1stdayMonday.checked
	};

	// Save for next launch
	localStorage['flag_save'] = 1;
	localStorage['radio-hand-diamond'] = options['radio-hand-diamond'];
	localStorage['radio-hand-trapezoid'] = options['radio-hand-trapezoid'];
	localStorage['radio-hand-rectangle'] = options['radio-hand-rectangle'];
	localStorage['radio-hand-pentagon'] = options['radio-hand-pentagon'];
	localStorage['radio-hand-round'] = options['radio-hand-round'];
	localStorage['radio-hand-arrow'] = options['radio-hand-arrow'];
	localStorage['toggle-invert'] = options['toggle-invert'];
	localStorage['toggle-item-secondhand'] = options['toggle-item-secondhand'];
	localStorage['toggle-item-date'] = options['toggle-item-date'];
	localStorage['toggle-item-number'] = options['toggle-item-number'];
	localStorage['toggle-item-index'] = options['toggle-item-index'];
	localStorage['toggle-vibration-time-signal'] = options['toggle-vibration-time-signal'];
	localStorage['toggle-vibration-connection'] = options['toggle-vibration-connection'];
	localStorage['radio-tap-none'] = options['radio-tap-none'];
	localStorage['radio-tap-c5'] = options['radio-tap-c5'];
	localStorage['radio-tap-c10'] = options['radio-tap-c10'];
	localStorage['time-shift'] = options['time-shift'];
	localStorage['radio-1stday-sunday'] = options['radio-1stday-sunday'];
	localStorage['radio-1stday-monday'] = options['radio-1stday-monday'];

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

	var radioHandDiamond = document.getElementById('radio-hand-diamond');
	var radioHandTrapezoid = document.getElementById('radio-hand-trapezoid');
	var radioHandRectangle = document.getElementById('radio-hand-rectangle');
	var radioHandPentagon = document.getElementById('radio-hand-pentagon');
	var radioHandRound = document.getElementById('radio-hand-round');
	var radioHandArrow = document.getElementById('radio-hand-arrow');
	var toggleInvert = document.getElementById('toggle-invert');
	var toggleItemSecondhand = document.getElementById('toggle-item-secondhand');
	var toggleItemDate = document.getElementById('toggle-item-date');
	var toggleItemNumber = document.getElementById('toggle-item-number');
	var toggleItemIndex = document.getElementById('toggle-item-index');
	var toggleVibrationTimeSignal = document.getElementById('toggle-vibration-time-signal');
	var toggleVibrationConnection = document.getElementById('toggle-vibration-connection');
	var radioTapNone = document.getElementById('radio-tap-none');
	var radioTapC5 = document.getElementById('radio-tap-c5');
	var radioTapC10 = document.getElementById('radio-tap-c10');
	var timeShift = document.getElementById('time-shift');
	var radio1stdaySunday = document.getElementById('radio-1stday-sunday');
	var radio1stdayMonday = document.getElementById('radio-1stday-monday');

	// Load any previously saved configuration, if available
	if(localStorage['flag_save'] == "1") {
		radioHandDiamond.checked = JSON.parse(localStorage['radio-hand-diamond']);
		radioHandTrapezoid.checked = JSON.parse(localStorage['radio-hand-trapezoid']);
		radioHandRectangle.checked = JSON.parse(localStorage['radio-hand-rectangle']);
		radioHandPentagon.checked = JSON.parse(localStorage['radio-hand-pentagon']);
		radioHandRound.checked = JSON.parse(localStorage['radio-hand-round']);
		radioHandArrow.checked = JSON.parse(localStorage['radio-hand-arrow']);
		toggleInvert.checked = JSON.parse(localStorage['toggle-invert']);
		toggleItemSecondhand.checked = JSON.parse(localStorage['toggle-item-secondhand']);
		toggleItemDate.checked = JSON.parse(localStorage['toggle-item-date']);
		toggleItemNumber.checked = JSON.parse(localStorage['toggle-item-number']);
		toggleItemIndex.checked = JSON.parse(localStorage['toggle-item-index']);
		toggleVibrationTimeSignal.checked = JSON.parse(localStorage['toggle-vibration-time-signal']);
		toggleVibrationConnection.checked = JSON.parse(localStorage['toggle-vibration-connection']);
		radioTapNone.checked = JSON.parse(localStorage['radio-tap-none']);
		radioTapC5.checked = JSON.parse(localStorage['radio-tap-c5']);
		radioTapC10.checked = JSON.parse(localStorage['radio-tap-c10']);
		timeShift.value = localStorage['time-shift'];
		radio1stdaySunday.checked = JSON.parse(localStorage['radio-1stday-sunday']);
		radio1stdayMonday.checked = JSON.parse(localStorage['radio-1stday-monday']);
	}

})();
