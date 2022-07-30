var config = {
	'bluetoothIconEnabled': 1,
	'secondHandEnabled': 1,
	'face_png': 'num'
};

$(document).ready(function() {

	console.log("Document Ready");

	var bluetoothEnabled = $('#bluetoothEnabled');
	var secondEnabled = $('#secondEnabled');
	var face = $('#face');;

	// check local storage
    if(localStorage.length > 0) {
      console.log("Local Storage exists");
      
      var faceChk, faceVal;
      
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
      
      if (localStorage.getItem('face_png') !== null) {
          var face_png = localStorage.getItem('face_png');
          if ((face_png) == 'min') {
          	document.getElementById('face0').checked = true;
          }
          if ((face_png) == 'w-o') {
          	document.getElementById('face1').checked = true;
          }
          if ((face_png) == 'pls') {
          	document.getElementById('face2').checked = true;
          }
          if ((face_png) == 'num') {
          	document.getElementById('face3').checked = true;
          }
          if ((face_png) == 'ful') {
          	document.getElementById('face4').checked = true;
          }
          
      	  	
      } 
      
      
    }
    
    // Submit button
	$('#send').on('click', function() {
		// Set options
		config.bluetoothIconEnabled = bluetoothEnabled[0].checked ? 1 : 0;
		config.secondHandEnabled = secondEnabled[0].checked ? 1 : 0;
		if (face0.checked) {
			config.face_png = face0.value;
		}
		if (face1.checked) {
			config.face_png = face1.value;
		}
		if (face2.checked) {
			config.face_png = face2.value;
		}
		if (face3.checked) {
			config.face_png = face3.value;
		}
		if (face4.checked) {
			config.face_png = face4.value;
		}

		// Store values
		localStorage.setItem('bluetoothIconEnabled', config.bluetoothIconEnabled);
		localStorage.setItem('secondHandEnabled', config.secondHandEnabled);
		localStorage.setItem('face_png', config.face_png);
		

		console.log(config);
		
		// Close config page and return data
		document.location.href = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(config));
	});
	
	//Cancel button
	$('#cancel').on('click', function() {
		document.location.href = 'pebblejs://close#success';
	});

});