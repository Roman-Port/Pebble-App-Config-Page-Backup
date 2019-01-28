(function() {

  loadOptions();
  submitHandler();
})();

function submitHandler() {

  var $submitButton = $('#submitButton');

  $submitButton.on('click', function() {
  
    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  
  var $timeFormatCheckbox = $('#timeFormatCheckbox');

  if (localStorage.asdsSelection) {
  
	var asds_selection_element = document.getElementById('asds_selection');
	asds_selection_element.value = localStorage.asdsSelection;
	
	var clock_location_element = document.getElementById('clock_location');
	clock_location_element.value = localStorage.clockLocation;
	
    $timeFormatCheckbox[0].checked = localStorage.twentyFourHourFormat === 'true';
  }
}

function getAndStoreConfigData() {

  var asds_selection_element = document.getElementById('asds_selection');
  var asds_selection = asds_selection_element.options[asds_selection_element.selectedIndex].value;
  
  var clock_location_element = document.getElementById('clock_location');
  var clock_location = clock_location_element.options[clock_location_element.selectedIndex].value;
  
  var $timeFormatCheckbox = $('#timeFormatCheckbox');

  var options = {
    asdsSelection: asds_selection,
	clockLocation: clock_location,
    twentyFourHourFormat: $timeFormatCheckbox[0].checked
  };

  localStorage.asdsSelection = options.asdsSelection;
  localStorage.clockLocation = options.clockLocation;  
  localStorage.twentyFourHourFormat = options.twentyFourHourFormat;

  //console.log('Got options: ' + JSON.stringify(options));
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