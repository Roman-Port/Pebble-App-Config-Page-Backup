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
  var $englishCheckbox = $("#englishCheckbox");
  var $zeroCheckbox = $("#zeroCheckbox");
  var $battCheckbox = $("#battCheckbox");
  var $frenchCheckbox = $("#frenchCheckbox");
  var $weekCheckbox = $("#weekCheckbox");
  var $BtSelect = $("#BtSelect");
  
  if (localStorage.backgroundColor1) {
    $backgroundColorPicker[0].value = localStorage.backgroundColor1;
    $englishCheckbox[0].checked = localStorage.english1 === "1";
    $zeroCheckbox[0].checked = localStorage.hidezero1 === "1";
    $battCheckbox[0].checked = localStorage.hidebattery1 === "1";
    $frenchCheckbox[0].checked = localStorage.french1 === "1";
    $weekCheckbox[0].checked = localStorage.USWeek1 === "1";
    $BtSelect[0].selectedIndex = localStorage.BtSelect1;
  }
}

function getAndStoreConfigData() {
  var $backgroundColorPicker = $("#backgroundColorPicker");
  var $englishCheckbox = $("#englishCheckbox");
  var $zeroCheckbox = $("#zeroCheckbox");
  var $battCheckbox = $("#battCheckbox");
  var $frenchCheckbox = $("#frenchCheckbox");
  var $weekCheckbox = $("#weekCheckbox");
  var $BtSelect = $("#BtSelect");
  
  var options = {
    backgroundColor1: $backgroundColorPicker.val(),
    english1: $englishCheckbox[0].checked ? 1 : 0,
    hidezero1: $zeroCheckbox[0].checked ? 1 : 0,
    hidebattery1: $battCheckbox[0].checked ? 1 : 0,
    french1: $frenchCheckbox[0].checked ? 1 : 0,
    USWeek1: $weekCheckbox[0].checked ? 1 : 0,
    BtSelect1: $BtSelect[0].selectedIndex
  };
  
  localStorage.backgroundColor1 = options.backgroundColor1;
  localStorage.english1 = options.english1;
  localStorage.hidezero1 = options.hidezero1;
  localStorage.hidebattery1 = options.hidebattery1;
  localStorage.french1 = options.french1;
  localStorage.USWeek1 = options.USWeek1;
  localStorage.BtSelect1 = options.BtSelect1;
  
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