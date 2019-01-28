(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  $('#submitButton').on('click', function() {
    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  $('#tricolor')[0].checked = getQueryParam("tricolor", 1) != 30;
  $('#showdate')[0].checked = getQueryParam("showdate", 1) != 30;
  $('#format12')[0].checked = getQueryParam("format12", 1) != 30;
}

function getAndStoreConfigData() {
  var options = {
    tricolor: $('#tricolor')[0].checked ? 1 : 30,
    showdate: $('#showdate')[0].checked ? 1 : 30,
    format12: $('#format12')[0].checked ? 1 : 30
  };

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
