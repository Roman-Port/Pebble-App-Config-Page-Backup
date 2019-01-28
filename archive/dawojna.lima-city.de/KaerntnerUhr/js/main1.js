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
  var $backgroundColorPicker = $("#backgroundColorPicker");
  var $kaerntenFlag = $("#kaerntenFlag");
  
  if (localStorage.backgroundColor) {
    $backgroundColorPicker[0].value = localStorage.backgroundColor;
    $kaerntenFlag[0].checked = localStorage.kaerntenFlag === "1";
  }
}

function getAndStoreConfigData() {
  var $backgroundColorPicker = $("#backgroundColorPicker");
  var $kaerntenFlag = $("#kaerntenFlag");
  
  var options = {
    backgroundColor: $backgroundColorPicker.val(),
    kaerntenFlag: $kaerntenFlag[0].checked ? 1 : 0
  };
  
  localStorage.backgroundColor = options.backgroundColor;
  localStorage.kaerntenFlag = options.kaerntenFlag;
  
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