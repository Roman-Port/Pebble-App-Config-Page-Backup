(function () {
	loadOptions();
	submitHandler();
})();

function submitHandler() {
	var $submitButton = $('#submitButton');

	$submitButton.on('click', function() {
		console.log('Submit');

		var return_to = getQueryParam('return_to', 'pebblejs://close#');
		document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
	});
}


function loadOptions() {
	var $useGPS = $('#useGPS');
	var $weatherLocation = $('#weatherLocation');
	var $shakeforLoHi = $('#shakeforLoHi');
	var $useCelsius = $('#useCelsius');
	var $weatherFrequencySlider = $('#weatherFrequencySlider');
	var $invert = $('#invert');
	var $blinkColon = $('#blinkColon');
	var $hourlyVibrate = $('#hourlyVibrate');
	//var $hideBattery = $('#hideBattery');
	var $displaySeconds = $('#displaySeconds');
	var $weatherReadability = $('#weatherReadability');
	var $vibrateBT = $('#vibrateBT');

	$useGPS.val("0");
	$useGPS.val(localStorage.useGPS);
	$weatherLocation.val(localStorage.weatherLocation);
	$shakeforLoHi.val("0");
	$shakeforLoHi.val(localStorage.shakeforLoHi);
	$useCelsius.val("0");
	$useCelsius.val(localStorage.useCelsius);
	$weatherFrequencySlider.val(localStorage.weatherFrequency);
	$invert.val("0");
	$invert.val(localStorage.invert);	
	$blinkColon.val("0");
	$blinkColon.val(localStorage.blinkColon);	
	$hourlyVibrate.val("0");
	$hourlyVibrate.val(localStorage.hourlyVibrate);
	//$hideBattery.val("0");
	//$hideBattery.val(localStorage.hideBattery);
	//$displaySeconds.val("0");
	//$displaySeconds.val(localStorage.displaySeconds);
	$weatherReadability.val("0");
	$weatherReadability.val(localStorage.weatherReadability);
	$vibrateBT.val("0");
	$vibrateBT.val(localStorage.vibrateBT);

	$useGPS[0].checked = false;
	if (localStorage.useGPS == "1")
		$useGPS[0].checked = true;
	
	$shakeforLoHi[0].checked = false;
	if (localStorage.shakeforLoHi == "1")
		$shakeforLoHi[0].checked = true;
	
	$useCelsius[0].checked = false;
	if (localStorage.useCelsius == "1")
		$useCelsius[0].checked = true;
	
	$invert[0].checked = false;
	if (localStorage.invert == "1")
		$invert[0].checked = true;
	
	$blinkColon[0].checked = false;
	if (localStorage.blinkColon == "1")
		$blinkColon[0].checked = true;
	
	$hourlyVibrate[0].checked = false;
	if (localStorage.hourlyVibrate == "1")
		$hourlyVibrate[0].checked = true;

	//$hideBattery[0].checked = false;
	//if (localStorage.hideBattery == "1")
	//	$hideBattery[0].checked = true;
	
	//$displaySeconds[0].checked = false;
	//if (localStorage.displaySeconds == "1")
	//	$displaySeconds[0].checked = true;

	$weatherReadability[0].checked = false;
	if (localStorage.weatherReadability == "1")
		$weatherReadability[0].checked = true;			
		
	$vibrateBT[0].checked = false;
	if (localStorage.vibrateBT == "1")
		$vibrateBT[0].checked = true;
}

function getAndStoreConfigData() {
	var $useGPS = $('#useGPS');
	var $weatherLocation = $('#weatherLocation');
	var $shakeforLoHi = $('#shakeforLoHi');
	var $useCelsius = $('#useCelsius');
	var $weatherFrequencySlider = $('#weatherFrequencySlider');
	var $invert = $('#invert');
	var $blinkColon = $('#blinkColon');
	var $hourlyVibrate = $('#hourlyVibrate');
	//var $hideBattery = $('#hideBattery');
	//var $displaySeconds = $('#displaySeconds');
	var $weatherReadability = $('#weatherReadability');
	var $vibrateBT = $('#vibrateBT');

	var useGPS = 0;
	var shakeforLoHi = 0;
	var useCelsius = 0;
	var hourlyVibrate = 0;
	var invert = 0;
	var blinkColon = 0;
	var hideBattery = 0;
	var displaySeconds = 0;
	var weatherReadability = 0;
	var vibrateBT = 0;

	if ($useGPS[0].checked)
		useGPS = 1;
	
	if ($shakeforLoHi[0].checked)
		shakeforLoHi = 1;

	if ($useCelsius[0].checked)
		useCelsius = 1;
	
	if ($invert[0].checked)
		invert = 1;		

	if ($blinkColon[0].checked)
		blinkColon = 1;		
	
	if ($hourlyVibrate[0].checked)
		hourlyVibrate = 1;	
	
	//if ($hideBattery[0].checked)
		//hideBattery = 1;
	
	//if ($displaySeconds[0].checked)
	//	displaySeconds = 1;	

	if ($weatherReadability[0].checked)
		weatherReadability = 1;
	
	if ($vibrateBT[0].checked)
		vibrateBT = 1;

	var weatherLocationVal = '';
	if ($weatherLocation.val().length == 5)
		weatherLocationVal = $weatherLocation.val() + ' US';
	else
		weatherLocationVal = $weatherLocation.val();
	
	var options = {
		useGPS: useGPS,
		weatherLocation: weatherLocationVal,
		shakeforLoHi: shakeforLoHi,
		useCelsius: useCelsius,
		weatherFrequency: $weatherFrequencySlider.val(),
		invert: invert,
		blinkColon: blinkColon,
		hourlyVibrate: hourlyVibrate,
		hideBattery: hideBattery,
		displaySeconds: displaySeconds,
		weatherReadability: weatherReadability,
		vibrateBT: vibrateBT
	};
	
	localStorage.useGPS = options.useGPS;
	localStorage.weatherLocation = options.weatherLocation;
	localStorage.shakeforLoHi = options.shakeforLoHi;
	localStorage.useCelsius = options.useCelsius;
	localStorage.weatherFrequency = options.weatherFrequency;
	localStorage.invert = options.invert;
	localStorage.blinkColon = options.blinkColon;
	localStorage.hourlyVibrate = options.hourlyVibrate;
	localStorage.hideBattery = options.hideBattery;
	localStorage.displaySeconds = options.displaySeconds;
	localStorage.weatherReadability = options.weatherReadability;
	localStorage.vibrateBT = options.vibrateBT;

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
