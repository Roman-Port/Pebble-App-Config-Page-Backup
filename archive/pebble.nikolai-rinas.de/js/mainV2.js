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
  //var $timeFormatCheckbox = $('#timeFormatCheckbox');
  //var $tempFormat = "('#tempFormat');
  var $langFormatEngl = $('#langFormatEngl');
  var $langFormatSpan = $('#langFormatSpan');
  var $langFormatGer = $('#langFormatGer');
  var $tempFormatCelsius = $('#tempFormatCelsius');
  var $tempFormatFahrenheit = $('#tempFormatFahrenheit');
  var $OWMApiKey = $('#OWMApiKey');

  //if (localStorage.select_time_format == 1) {
  //  $timeFormatCheckbox[0].checked = true;
  //}else{
  //  $timeFormatCheckbox[0].checked = false;
 // }
  
  // Default value
  $langFormatEngl[0].checked = 'true';
  if ( localStorage.select_language == 'e' ) {
    $langFormatEngl[0].checked = 'true';
  }
  if ( localStorage.select_language == 's' ) {
    $langFormatSpan[0].checked = 'true';
  }
  if ( localStorage.select_language == 'g' ) {
    $langFormatGer[0].checked = 'true';
  }


  if (localStorage.select_temp_format) {
      if (localStorage.select_temp_format == 1) {
        $tempFormatFahrenheit[0].checked = 'true';
      }else{
        $tempFormatCelsius[0].checked = 'true';
      }
  }else{
    // Default
    $tempFormatFahrenheit[0].checked = 'true';
  }
  if ( localStorage.set_api_key ) {
   $OWMApiKey[0].value = localStorage.set_api_key;
  }
  //localStorage.select_language = options.select_language;
}

function getAndStoreConfigData() {
  //var $timeFormatCheckbox = $('#timeFormatCheckbox');
  var $langFormatEngl = $('#langFormatEngl');
  var $langFormatSpan = $('#langFormatSpan');
  var $langFormatGer = $('#langFormatGer');
  var $tempFormatCelsius = $('#tempFormatCelsius');
  var $tempFormatFahrenheit = $('#tempFormatFahrenheit');
  var $OWMApiKey = $('#OWMApiKey');

  var $lang_format = 'e';
  if ( $langFormatEngl[0].checked == true ) {
    $lang_format = 'e';
  }
  if ( $langFormatSpan[0].checked == true ) {
    $lang_format = 's';
  }
  if ( $langFormatGer[0].checked == true ) {
    $lang_format = 'g';
  }

  var $temp_format = 1;
  if ( $tempFormatCelsius[0].checked == true ) {
      $temp_format = 0;
  }
  var $time_format = 0;
  //if ( $timeFormatCheckbox[0].checked == true ) {
  //  $time_format = 1;
  //}else{
  //  $time_format = 0;
  // }

  var options = {
    select_time_format: $time_format,
    select_temp_format: $temp_format,
    set_api_key: $OWMApiKey[0].value,
    select_language: $lang_format
  };

  localStorage.select_time_format = options.select_time_format;
  localStorage.select_temp_format = options.select_temp_format;
  localStorage.set_api_key = options.set_api_key;
  localStorage.select_language = options.select_language;

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
