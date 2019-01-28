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
    var $connectionLostVibeCheckbox = $('#connectionLostVibeCheckbox');

  if (localStorage.connectionLostVibe ) {
    $connectionLostVibeCheckbox[0].checked = localStorage.connectionLostVibe === 'true';
  }
}

function getAndStoreConfigData() {
  var $connectionLostVibeCheckbox = $('#connectionLostVibeCheckbox');

  var options = {
    connectionLostVibe: $connectionLostVibeCheckbox[0].checked
  };

  localStorage.connectionLostVibe = options.connectionLostVibe;

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