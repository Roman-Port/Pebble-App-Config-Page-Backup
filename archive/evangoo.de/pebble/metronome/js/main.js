(function() {
  loadOptions()
  submitHandler()
})();

function submitHandler() {
  var $submitButton = $("#submitButton")

  $submitButton.on("click", function() {
    console.log("Submit")

    var return_to = getQueryParam("return_to", "pebblejs://close#")
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()))
  });
}

function loadOptions() {
  var $vibe_duration = $("#vibe_duration")

  if (localStorage.vibe_duration) {
    $vibe_duration[0].value = localStorage.vibe_duration
  }
}

function getAndStoreConfigData() {
  var $vibe_duration = $("#vibe_duration")

  var options = {
    vibe_duration: $vibe_duration.val(),
  };

  localStorage.vibe_duration = options.vibe_duration

  console.log('Got options: ' + JSON.stringify(options))
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
