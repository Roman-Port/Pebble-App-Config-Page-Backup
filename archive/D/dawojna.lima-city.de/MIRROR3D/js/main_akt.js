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
  var $dateCheckbox = $("#dateCheckbox");
  var $battCheckbox = $("#battCheckbox");
  var $mirrorCheckbox = $("#mirrorCheckbox");
  
  if (localStorage.backgroundColor2) {
    $backgroundColorPicker[0].value = localStorage.backgroundColor2;
    $dateCheckbox[0].checked = localStorage.dateStyle === "1";
    $battCheckbox[0].checked = localStorage.showBattery === "1";
    $mirrorCheckbox[0].checked = localStorage.mirrorDate === "1";
  }
}

function getAndStoreConfigData() {
  var $backgroundColorPicker = $("#backgroundColorPicker");
  var $dateCheckbox = $("#dateCheckbox");
  var $battCheckbox = $("#battCheckbox");
  var $mirrorCheckbox = $("#mirrorCheckbox");
  
  var options = {
    backgroundColor2: $backgroundColorPicker.val(),
    dateStyle: $dateCheckbox[0].checked ? 1 : 0,
    showBattery: $battCheckbox[0].checked ? 1 : 0,
    mirrorDate: $mirrorCheckbox[0].checked ? 1 : 0
  };
  
  localStorage.backgroundColor2 = options.backgroundColor2;
  localStorage.dateStyle = options.dateStyle;
  localStorage.showBattery = options.showBattery;
  localStorage.mirrorDate = options.mirrorDate;
  
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