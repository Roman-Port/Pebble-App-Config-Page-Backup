var config = {
	'bgColor': '',
	'tempUnit': '1',
	'secondHandEnabled': 1,
	'monogram': ''
};

$(document).ready(function() {

	console.log("Document Ready");

	var bgColorPicker = $('#bgColorPicker');
	var tempUnitEnabled = $('#tempUnitEnabled');
	var secondEnabled = $('#secondEnabled');
	var mgText = $('#mgText');
	// check local storage
    if(localStorage.length > 0) {
      console.log("Local Storage exists!");

      var storedColor, colorSpan;

      if (localStorage.getItem('bgColor') !== null) {
	      storedColor = localStorage.getItem('bgColor');
	      colorSpan = bgColorPicker.siblings().find('.value');
	      bgColorPicker.attr('value', storedColor);
	      colorSpan.css('background-color', storedColor.replace(/^0x/, '#'));
      }

			if (localStorage.getItem('tempUnit') !== null) {
      var tempUnit = localStorage.getItem('tempUnit') != 0 ? true : false;;
				if (tempUnit) {
					tempUnitEnabled.attr('checked');
				}
				else {
					tempUnitEnabled.attr('checked', null);
				}
			}

			if (localStorage.getItem('secondHandEnabled') !== null) {
      	  var secondHandEnabled = localStorage.getItem('secondHandEnabled') != 0 ? true : false;
      	  if (secondHandEnabled) {
      	    secondEnabled.attr('checked');
      	  }
      	  else {
      	    secondEnabled.attr('checked', null);
      	  }
      }

			var monogram = localStorage.getItem('monogram');
      document.getElementById('mgText').value = monogram;

    }

    // Submit button
	$('#send').on('click', function() {
		// Set options
		config.bgColor = bgColorPicker[0].value;
		config.tempUnit = tempUnitEnabled[0].checked ? 1 : 0;
		config.secondHandEnabled = secondEnabled[0].checked ? 1 : 0;
		config.monogram = mgText[0].value;

		// Store values
		localStorage.setItem('bgColor', config.bgColor);
		localStorage.setItem('tempUnit', config.tempUnit);
		localStorage.setItem('secondHandEnabled', config.secondHandEnabled);
		localStorage.setItem('monogram', config.monogram);

		console.log(config);

		// Close config page and return data
		document.location.href = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(config));
	});

	//Cancel button
	$('#cancel').on('click', function() {
		document.location.href = 'pebblejs://close#success';
	});

});
