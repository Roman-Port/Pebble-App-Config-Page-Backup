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
  var $language_de_radio = $("#language_de_radio");
  var $language_en_radio = $("#language_en_radio");
  var $hourColorPicker = $("#hourColorPicker");
  var $minuteColorPicker = $("#minuteColorPicker");
  var $dateColorPicker = $("#dateColorPicker");

  if (localStorage.hourColor) {
    $language_de_radio[0].checked = localStorage.language_de === "true";
    $language_en_radio[0].checked = localStorage.language_en === "true";
    $hourColorPicker[0].value = localStorage.hourColor;
    $minuteColorPicker[0].value = localStorage.minuteColor;
    $dateColorPicker[0].value = localStorage.dateColor;
  }
}

function getAndStoreConfigData() {
  var $language_de_radio = $("#language_de_radio");
  var $language_en_radio = $("#language_en_radio");
  var $hourColorPicker = $("#hourColorPicker");
  var $minuteColorPicker = $("#minuteColorPicker");
  var $dateColorPicker = $("#dateColorPicker");
  
  var options = {
    language_de: $language_de_radio[0].checked,
    language_en: $language_en_radio[0].checked,
    hourColor: $hourColorPicker.val(),
    minuteColor: $minuteColorPicker.val(),
    dateColor: $dateColorPicker.val()
  };
  
  localStorage.language_de = options.language_de;
  localStorage.language_en = options.language_en;
  localStorage.hourColor = options.hourColor;
  localStorage.minuteColor = options.minuteColor;
  localStorage.dateColor = options.dateColor;
  
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