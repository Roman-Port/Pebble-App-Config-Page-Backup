(function() {
  var options = buildOptions();

  console.log('Showing options: ' + JSON.stringify(Object.keys(options)));

  loadOptions(options);
  submitHandler(options);
})();

function buildOptions() {
  var options = {};
  var neededOpts = getQueryParam('options');

  neededOpts = neededOpts ? neededOpts.split('+') : [];

  $('.app-setting').each(function() {
    var key = $(this).find('input').prop('id');
    if (!neededOpts.length || neededOpts.indexOf(key) > -1) {
      options[key] = $(this).find('input');
    } else {
      $(this).remove();
    }
  });

  return options;
}

function loadOptions(options) {
  if (localStorage.pebbleOptions) {
    var data = JSON.parse(localStorage.pebbleOptions);

    for (var key in data) {
      if (options[key] !== undefined) {
        options[key].prop('checked', data[key]);
      }
    }
  }
}

function submitHandler(options) {
  var submitButton = $('#submitButton');

  submitButton.on('click', function() {
    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getConfig(options)));
  });
}

function getConfig(options) {
  var config = {};

  for (var key in options) {
    config[key] = options[key].prop('checked');
  }

  localStorage.pebbleOptions = JSON.stringify(config);

  console.log('Got config: ' + JSON.stringify(config));
  return config;
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
