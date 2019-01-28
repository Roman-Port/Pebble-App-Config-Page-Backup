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
	var $hourFont = $('#hourFont');
	var $minutesFont = $('#minutesFont');

	if (localStorage.backgroundColor) {
		$backgroundColorPicker[0].value = localStorage.backgroundColor;
		$hrColorPicker[0].value = localStorage.hrColor;		
		$minColorPicker[0].value = localStorage.minColor;
		$wsdColorPicker[0].value = localStorage.wsdColor;
		
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
	var $hourFont = $('#hourFont');
	var $minutesFont = $('#minutesFont');

	var options = {
		backgroundColor: $backgroundColorPicker.val(),
		hrColor: $hrColorPicker.val(),		
		minColor: $minColorPicker.val(),
		wsdColor: $wsdColorPicker.val(),
		hourFont: $hourFont.val(),
		minutesFont: $minutesFont.val()
	};

	localStorage.backgroundColor = options.backgroundColor;
	localStorage.hrColor = options.hrColor;
	localStorage.minColor = options.minColor;
	localStorage.wsdColor = options.wsdColor;
	localStorage.hourFont = options.hourFont;
	localStorage.minutesFont = options.minutesFont;

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
