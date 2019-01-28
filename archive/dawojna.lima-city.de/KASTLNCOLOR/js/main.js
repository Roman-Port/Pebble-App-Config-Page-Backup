(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $("#submitButton");

  $submitButton.on("click", function(){
    console.log("Submit");
  
    var return_to = getQueryParam("return_to", "pebblejs://close#");
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $DotColorPicker = $("#DotColorPicker");
  
  if (localStorage.DotColor) {
    $DotColorPicker[0].value = localStorage.DotColor;
  }
}

function getAndStoreConfigData() {
  var $DotColorPicker = $("#DotColorPicker");
  
  var options = {
    DotColor: $DotColorPicker.val()
  };
  
  localStorage.DotColor = options.DotColor;
  
  console.log("got options: " + JSON.stringify(options));
  return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}