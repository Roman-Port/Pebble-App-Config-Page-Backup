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
  var $MinuteColorPicker = $("#MinuteColorPicker");
  var $BtCheckbox = $("#BtCheckbox");
  var $DateUSCheckbox = $("#DateUSCheckbox");
  var $SecondsCheckbox = $("#SecondsCheckbox");
  
  if (localStorage.MinuteColor) {
    $MinuteColorPicker[0].value = localStorage.MinuteColor;
    $BtCheckbox[0].checked = localStorage.BtVibrate === "1";
    $DateUSCheckbox[0].checked = localStorage.DateFormat2 === "1";
    $SecondsCheckbox[0].checked = localStorage.ShowSeconds === "1";
  }
}

function getAndStoreConfigData() {
  var $MinuteColorPicker = $("#MinuteColorPicker");
  var $BtCheckbox = $("#BtCheckbox");
  var $DateUSCheckbox = $("#DateUSCheckbox");
  var $SecondsCheckbox = $("#SecondsCheckbox");
  
  var options = {
    MinuteColor: $MinuteColorPicker.val(),
    BtVibrate: $BtCheckbox[0].checked ? 1 : 0,
    DateFormat2: $DateUSCheckbox[0].checked ? 1 : 0,
    ShowSeconds: $SecondsCheckbox[0].checked ? 1 : 0
  };
  
  localStorage.MinuteColor = options.MinuteColor;
  localStorage.BtVibrate = options.BtVibrate;
  localStorage.DateFormat2 = options.DateFormat2;
  localStorage.ShowSeconds = options.ShowSeconds;
  
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