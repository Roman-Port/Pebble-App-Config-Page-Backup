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
  var $HourColorPicker = $("#HourColorPicker");
  var $BtCheckbox = $("#BtCheckbox");
  var $DateCheckbox = $("#DateCheckbox");
  var $MinutesCheckbox = $("#MinutesCheckbox");
  
  if (localStorage.HourColor1) {
    $HourColorPicker[0].value = localStorage.HourColor1;
    $BtCheckbox[0].checked = localStorage.VibrateBTloss1 === "1";
    $DateCheckbox[0].checked = localStorage.DateFormat1 === "1";
    $MinutesCheckbox[0].checked = localStorage.ShowMinutes1 === "1";
  }
}

function getAndStoreConfigData() {
  var $HourColorPicker = $("#HourColorPicker");
  var $BtCheckbox = $("#BtCheckbox");
  var $DateCheckbox = $("#DateCheckbox");
  var $MinutesCheckbox = $("#MinutesCheckbox");
  
  var options = {
    HourColor1: $HourColorPicker.val(),
    VibrateBTloss1: $BtCheckbox[0].checked ? 1 : 0,
    DateFormat1: $DateCheckbox[0].checked ? 1 : 0,
    ShowMinutes1: $MinutesCheckbox[0].checked ? 1 : 0
  };
  
  localStorage.HourColor1 = options.HourColor1;
  localStorage.VibrateBTloss1 = options.VibrateBTloss1;
  localStorage.DateFormat1 = options.DateFormat1;
  localStorage.ShowMinutes1 = options.ShowMinutes1;
  
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