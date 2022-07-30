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
	var $backgroundColorPicker = $('#backgroundColorPicker');
	var $hrColorPicker = $('#hrColorPicker');
	var $minColorPicker = $('#minColorPicker');
	var $wdColorPicker = $('#wdColorPicker');
	var $weatherFrequencySlider = $('#weatherFrequencySlider');
	var $useGPS = $('#useGPS');
	var $weatherLocation = $('#weatherLocation');
	var $shakeforLoHi = $('#shakeforLoHi');
	var $useCelsius = $('#useCelsius');
	var $displayPrefix = $('#displayPrefix');
	var $displayDate = $('#displayDate');
	var $weatherDateAlignment = $('#weatherDateAlignment');
	var $hourMinutesAlignment = $('#hourMinutesAlignment');
	var $hourMinutesReadability = $('#hourMinutesReadability');
	var $weatherDateReadability = $('#weatherDateReadability');
	var $vibrateBT = $('#vibrateBT');

	if (localStorage.backgroundColor) {
		$backgroundColorPicker[0].value = localStorage.backgroundColor;
		$hrColorPicker[0].value = localStorage.hrColor;
		$minColorPicker[0].value = localStorage.minColor;
		$wdColorPicker[0].value = localStorage.wdColor;		
		$weatherFrequencySlider.val(localStorage.weatherFrequency);
		$weatherDateAlignment.val("1");
		$weatherDateAlignment.val(localStorage.weatherDateAlignment);
		$hourMinutesAlignment.val("0");
		$hourMinutesAlignment.val(localStorage.hourMinutesAlignment);
		$hourMinutesReadability.val("0");
		$hourMinutesReadability.val(localStorage.hourMinutesReadability);
		$weatherDateReadability.val("0");
		$weatherDateReadability.val(localStorage.weatherDateReadability);
		$useGPS.val("0");
		$useGPS.val(localStorage.useGPS);
		$weatherLocation.val(localStorage.weatherLocation);
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
			
		$displayPrefix[0].checked = false;
		if (localStorage.displayPrefix == "1")
			$displayPrefix[0].checked = true;

		$displayDate[0].checked = false;
		if (localStorage.displayDate == "1")
			$displayDate[0].checked = true;
		
		$hourMinutesReadability[0].checked = false;
		if (localStorage.hourMinutesReadability == "1")
			$hourMinutesReadability[0].checked = true;
		
		$weatherDateReadability[0].checked = false;
		if (localStorage.weatherDateReadability == "1")
			$weatherDateReadability[0].checked = true;
		
		$vibrateBT[0].checked = false;
		if (localStorage.vibrateBT == "1")
			$vibrateBT[0].checked = true;
	}
}

function getAndStoreConfigData() {
	var $backgroundColorPicker = $('#backgroundColorPicker');
	var $hrColorPicker = $('#hrColorPicker');
	var $minColorPicker = $('#minColorPicker');
	var $wdColorPicker = $('#wdColorPicker');	
	var $weatherFrequencySlider = $('#weatherFrequencySlider');
	var $useGPS = $('#useGPS');
	var $weatherLocation = $('#weatherLocation');
	var $shakeforLoHi = $('#shakeforLoHi');
	var $useCelsius = $('#useCelsius');
	var $displayPrefix = $('#displayPrefix');
	var $displayDate = $('#displayDate');	
	var $weatherDateAlignment = $('#weatherDateAlignment');
	var $hourMinutesAlignment = $('#hourMinutesAlignment');
	var $hourMinutesReadability = $('#hourMinutesReadability');
	var $weatherDateReadability = $('#weatherDateReadability');
	var $vibrateBT = $('#vibrateBT');
        
	var useGPS = 0;
	var shake_for_LoHi = 0;
	var use_Celsius = 0;
	var display_Prefix = 0;
	var display_Date = 0;	
	var invert_Colors = 0;
	var hourminutes_readability = 0;
	var weatherdate_readability = 0;
	var vibrateBT = 0;
	if ($useGPS[0].checked)
		useGPS = 1;
	
	if ($shakeforLoHi[0].checked)
		shake_for_LoHi = 1;

	if ($useCelsius[0].checked)
		use_Celsius = 1;

	if ($displayPrefix[0].checked)
		display_Prefix = 1;

	if ($displayDate[0].checked)
		display_Date = 1;
	
	if ($hourMinutesReadability[0].checked)
		hourminutes_readability = 1;

	if ($weatherDateReadability[0].checked)
		weatherdate_readability = 1;

	if ($vibrateBT[0].checked)
		vibrateBT = 1;

	var weatherLocationVal = '';
	if ($weatherLocation.val().length == 5)
		weatherLocationVal = $weatherLocation.val() + ' US';
	else
		weatherLocationVal = $weatherLocation.val();	
		
	var options = {
		backgroundColor: $backgroundColorPicker.val(),
		hrColor: $hrColorPicker.val(),
		minColor: $minColorPicker.val(),
		wdColor: $wdColorPicker.val(),
		weatherFrequency: $weatherFrequencySlider.val(),
		useGPS: useGPS,
		weatherLocation: weatherLocationVal,
		shakeforLoHi: shake_for_LoHi,
		useCelsius: use_Celsius,
        displayPrefix: display_Prefix,
        displayDate: display_Date,
        weatherDateAlignment: $weatherDateAlignment.val(),
        hourMinutesAlignment: $hourMinutesAlignment.val(),
		hourMinutesReadability: hourminutes_readability,
		weatherDateReadability: weatherdate_readability,
		vibrateBT: vibrateBT
	};

	localStorage.backgroundColor = options.backgroundColor;
	localStorage.hrColor = options.hrColor;
	localStorage.minColor = options.minColor;
	localStorage.wdColor = options.wdColor;
	localStorage.weatherFrequency = options.weatherFrequency;
	localStorage.useGPS = options.useGPS;
	localStorage.weatherLocation = options.weatherLocation;
	localStorage.shakeforLoHi = options.shakeforLoHi;
	localStorage.useCelsius = options.useCelsius;
	localStorage.displayPrefix = options.displayPrefix;
	localStorage.displayDate = options.displayDate;	
	localStorage.weatherDateAlignment = options.weatherDateAlignment;
	localStorage.hourMinutesAlignment = options.hourMinutesAlignment;
	localStorage.hourMinutesReadability = options.hourMinutesReadability;
	localStorage.weatherDateReadability = options.weatherDateReadability;
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
