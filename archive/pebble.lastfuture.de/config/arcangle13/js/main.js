(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#send');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $colors = $('#colors');
  var $inverse = $('#inverse');
  var $btvibe = $('#btvibe');

  if (localStorage.colors) {
    $colors[0].value = localStorage.colors;
    $inverse.prop("checked", localStorage.inverse === 'true');
    $btvibe.prop("checked", localStorage.btvibe === 'true');
  }
}

function getAndStoreConfigData() {
  var $colors = $('#colors');
  var $inverse = $('#inverse');
  var $btvibe = $('#btvibe');

  var options = {
    colors: parseInt($colors.val()),
    inverse: $inverse.prop("checked"),
    btvibe: $btvibe.prop("checked"),
  };

  localStorage.colors = options.colors;
  localStorage.inverse = options.inverse;
  localStorage.btvibe = options.btvibe;

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