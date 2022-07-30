(function() {
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
  var $timeColorPicker = $('#timeColorPicker');
  var $dateColorPicker = $('#dateColorPicker');
  var $timeFormatCheckbox= $('#timeFormatCheckbox');

  if (localStorage.backgroundColor) {
    $backgroundColorPicker[0].value = localStorage.backgroundColor;
    $timeColorPicker[0].value = localStorage.timeColor;
    $dateColorPicker[0].value = localStorage.dateColor;
    $timeFormatCheckbox[0].checked = localStorage.twentyFourHourFormat === 'true';
  }
}

function getAndStoreConfigData() {
  var $backgroundColorPicker = $('#backgroundColorPicker');
  var $timeColorPicker = $('#timeColorPicker');
  var $dateColorPicker = $('#dateColorPicker');
  var $timeFormatCheckbox= $('#timeFormatCheckbox');

  var options = {
    backgroundColor: $backgroundColorPicker.val(),
    timeColor: $timeColorPicker.val(),
    dateColor: $dateColorPicker.val(),
    twentyFourHourFormat: $timeFormatCheckbox[0].checked
  };
  
  localStorage.backgroundColor = options.backgroundColor;
  localStorage.timeColor = options.timeColor;
  localStorage.dateColor = options.dateColor;
  localStorage.twentyFourHourFormat = options.twentyFourHourFormat;

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
