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
	var $wsdColorPicker = $('#wsdColorPicker');
	var $weatherFrequencySlider = $('#weatherFrequencySlider');
	var $useGPS = $('#useGPS');
	var $weatherLocation = $('#weatherLocation');
	var $shakeforLoHi = $('#shakeforLoHi');
	var $useCelsius = $('#useCelsius');
	var $hourFont = $('#hourFont');
	var $minutesFont = $('#minutesFont');

	if (localStorage.backgroundColor) {
		$backgroundColorPicker[0].value = localStorage.backgroundColor;
		$hrColorPicker[0].value = localStorage.hrColor;		
		$minColorPicker[0].value = localStorage.minColor;
		$wsdColorPicker[0].value = localStorage.wsdColor;
		$weatherFrequencySlider.val(localStorage.weatherFrequency);
		$useGPS.val("0");
		$useGPS.val(localStorage.useGPS);
		$weatherLocation.val(localStorage.weatherLocation);
		$shakeforLoHi.val("0");
		$shakeforLoHi.val(localStorage.shakeforLoHi);
		$useCelsius.val("0");
		$useCelsius.val(localStorage.useCelsius);

		$useGPS[0].checked = false;
		if (localStorage.useGPS == "1")
			$useGPS[0].checked = true;
		
		$shakeforLoHi[0].checked = false;
		if (localStorage.shakeforLoHi == "1")
			$shakeforLoHi[0].checked = true;
		
		$useCelsius[0].checked = false;
		if (localStorage.useCelsius == "1")
			$useCelsius[0].checked = true;

		$hourFont.val("1");
		$hourFont.val(localStorage.hourFont);	
		
		$minutesFont.val("1");
		$minutesFont.val(localStorage.minutesFont);		
	}
}

function getAndStoreConfigData() {
	var $backgroundColorPicker = $('#backgroundColorPicker');
	var $hrColorPicker = $('#hrColorPicker');
	var $minColorPicker = $('#minColorPicker');
	var $wsdColorPicker = $('#wsdColorPicker');
	var $weatherFrequencySlider = $('#weatherFrequencySlider');
	var $useGPS = $('#useGPS');
	var $weatherLocation = $('#weatherLocation');
	var $shakeforLoHi = $('#shakeforLoHi');
	var $useCelsius = $('#useCelsius');
	var $hourFont = $('#hourFont');
	var $minutesFont = $('#minutesFont');	
	
	var useGPS = 0;
	var shake_for_LoHi = 0;
	var use_Celsius = 0;
	var displayDigitalTime = 0;

	if ($useGPS[0].checked)
		useGPS = 1;
	
	if ($shakeforLoHi[0].checked)
		shake_for_LoHi = 1;

	if ($useCelsius[0].checked)
		use_Celsius = 1;
	
	var weatherLocationVal = '';
	if ($weatherLocation.val().length == 5)
		weatherLocationVal = $weatherLocation.val() + ' US';
	else
		weatherLocationVal = $weatherLocation.val();
	
	var options = {
		backgroundColor: $backgroundColorPicker.val(),
		hrColor: $hrColorPicker.val(),		
		minColor: $minColorPicker.val(),
		wsdColor: $wsdColorPicker.val(),
		weatherFrequency: $weatherFrequencySlider.val(),
		useGPS: useGPS,
		weatherLocation: weatherLocationVal,
		shakeforLoHi: shake_for_LoHi,
		useCelsius: use_Celsius,
		hourFont: $hourFont.val(),
		minutesFont: $minutesFont.val(),
		displayDigitalTime: displayDigitalTime
	};

	localStorage.backgroundColor = options.backgroundColor;
	localStorage.hrColor = options.hrColor;
	localStorage.minColor = options.minColor;
	localStorage.wsdColor = options.wsdColor;
	localStorage.weatherFrequency = options.weatherFrequency;
	localStorage.useGPS = options.useGPS;
	localStorage.weatherLocation = options.weatherLocation;
	localStorage.shakeforLoHi = options.shakeforLoHi;
	localStorage.useCelsius = options.useCelsius;
	localStorage.hourFont = options.hourFont;
	localStorage.minutesFont = options.minutesFont;
	localStorage.displayDigitalTime = options.displayDigitalTime;

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
