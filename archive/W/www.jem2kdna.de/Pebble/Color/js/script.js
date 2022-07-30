var config = {
	'bgColor': '',
	'bluetoothIconEnabled': 1,
	'secondHandEnabled': 1,
	'monogram': ''
};

$(document).ready(function() {

	console.log("Document Ready");

	var bgColorPicker = $('#bgColorPicker');
	var bluetoothEnabled = $('#bluetoothEnabled');
	var secondEnabled = $('#secondEnabled');
	var mgText = $('#mgText');

	// check local storage
    if(localStorage.length > 0) {
      console.log("Local Storage exists");
      
      var storedColor, colorSpan;

      if (localStorage.getItem('bgColor') !== null) {
	      storedColor = localStorage.getItem('bgColor');
	      colorSpan = bgColorPicker.siblings().find('.value');
	      bgColorPicker.attr('value', storedColor);
	      colorSpan.css('background-color', storedColor.replace(/^0x/, '#'));
      }
      
      if (localStorage.getItem('bluetoothIconEnabled') !== null) {
		  var bluetoothIconEnabled = localStorage.getItem('bluetoothIconEnabled') != 0 ? true : false;
	  	  if (bluetoothIconEnabled) {
	  	  	bluetoothEnabled.attr('checked');
	  	  }
	  	  else {
	  	  	bluetoothEnabled.attr('checked', null);
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
		config.bluetoothIconEnabled = bluetoothEnabled[0].checked ? 1 : 0;
		config.secondHandEnabled = secondEnabled[0].checked ? 1 : 0;
		config.monogram = mgText[0].value;
		

		// Store values
		localStorage.setItem('bgColor', config.bgColor);
		localStorage.setItem('bluetoothIconEnabled', config.bluetoothIconEnabled);
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