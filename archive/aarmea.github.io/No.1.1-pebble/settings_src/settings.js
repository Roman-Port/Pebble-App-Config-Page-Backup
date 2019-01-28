const DEFAULT_SUBMIT_URL = 'pebblejs://close#';

window.onload = function() {
  var submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', onSubmit);

  var config = JSON.parse(getQueryParam('config', '{}'));
  for (key in config) {
    switch(key) {
      case 'SETTINGS_SHOW_DATE':
        document.getElementById('showDate').checked = config[key];
        break;
      default:
        break;
    }
  }
};

function onSubmit() {
  var config = {
    'SETTINGS_SHOW_DATE': document.getElementById('showDate').checked
  };

  var submitUrl = getQueryParam('return_to', DEFAULT_SUBMIT_URL);
  location.href = submitUrl + encodeURIComponent(JSON.stringify(config));
}

// Get query variables
// Pasted from https://developer.pebble.com/guides/pebble-apps/pebblekit-js/app-configuration/
function getQueryParam(variable, defaultValue) {
  // Find all URL parameters
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    // If the query variable parameter is found, decode it to use and return it for use
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}

// Google fonts
WebFontConfig = {
  google: { families: [ 'Ek+Mukta::latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
