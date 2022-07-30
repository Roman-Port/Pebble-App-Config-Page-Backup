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
    var $showSecondsHandCheckbox = $('#showSecondsHandCheckbox');
    var $connectionLostVibeCheckbox = $('#connectionLostVibeCheckbox');
    var $colorReverseCheckbox = $('#colorReverseCheckbox');

  if (localStorage.showSecondsHand ) {
    $showSecondsHandCheckbox[0].checked = localStorage.showSecondsHand == 1 ? true : false;
  }

  if (localStorage.connectionLostVibe ) {
    $connectionLostVibeCheckbox[0].checked = localStorage.connectionLostVibe  == 1 ? true : false;
  }

  if (localStorage.colorReverse ) {
    $colorReverseCheckbox[0].checked = localStorage.colorReverse  == 1 ? true : false;
  }

}

function getAndStoreConfigData() {
  var $showSecondsHandCheckbox = $('#showSecondsHandCheckbox');
  var $connectionLostVibeCheckbox = $('#connectionLostVibeCheckbox');
  var $colorReverseCheckbox = $('#colorReverseCheckbox');

  var options = {
    showSecondsHand: $showSecondsHandCheckbox[0].checked == true ? 1 : 0,
    connectionLostVibe: $connectionLostVibeCheckbox[0].checked == true ? 1 : 0,
    colorReverse: $colorReverseCheckbox[0].checked == true ? 1 : 0
  };

  localStorage.showSecondsHand = options.showSecondsHand;
  localStorage.connectionLostVibe = options.connectionLostVibe;
  localStorage.colorReverse = options.colorReverse;

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