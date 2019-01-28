var config = {
	'color_a': '',
	'color_b': ''
};

$(document).ready(function() {

	console.log("Document Ready");

	var color_a = $('#color_a');
	var color_b = $('#color_b');

	// check local storage
    if(localStorage.length > 0) {
      console.log("Local Storage exists");

      var storedColor, colorSpan;

      if (localStorage.getItem('color_a') !== null) {
	      storedColor = localStorage.getItem('color_a');
	      colorSpan = color_a.siblings().find('.value');
	      color_a.attr('value', storedColor);
	      colorSpan.css('background-color', storedColor.replace(/^0x/, '#'));
      }
			if (localStorage.getItem('color_b') !== null) {
	      storedColor = localStorage.getItem('color_b');
	      colorSpan = color_b.siblings().find('.value');
	      color_b.attr('value', storedColor);
	      colorSpan.css('background-color', storedColor.replace(/^0x/, '#'));
      }

    }

    // Submit button
	$('#send').on('click', function() {
		// Set options
		config.color_a = color_a[0].value;
		config.color_b = color_b[0].value;

		// Store values
		localStorage.setItem('color_a', config.color_a);
		localStorage.setItem('color_b', config.color_b);

		console.log(config);

		// Close config page and return data
		document.location.href = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(config));
	});

	//Cancel button
	$('#cancel').on('click', function() {
		document.location.href = 'pebblejs://close#success';
	});

});
