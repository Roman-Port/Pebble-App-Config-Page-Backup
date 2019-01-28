(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#submitButton');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $minuteCircleColor = $('#minuteCircleColor');
  var $hourCircleColor = $('#hourCircleColor');
  var $showBatteryLoad = $('#showBatteryLoad');
  var $showDigitalDate = $('#showDigitalDate');
  var $showDigitalTime = $('#showDigitalTime');
  var $showShadow = $('#showShadow');

  if (localStorage.minuteCircleColor) {
    $minuteCircleColor[0].value = localStorage.minuteCircleColor;
    $hourCircleColor[0].value = localStorage.hourCircleColor;
    $showBatteryLoad[0].checked = localStorage.showBatteryLoad === 'true';
    $showDigitalDate[0].checked = localStorage.showDigitalDate === 'true';
    $showDigitalTime[0].checked = localStorage.showDigitalTime === 'true';
    $showShadow[0].checked      = localStorage.showShadow === 'true';

  }
}

function getAndStoreConfigData() {
  var $minuteCircleColor = $('#minuteCircleColor');
  var $hourCircleColor = $('#hourCircleColor');
  var $showBatteryLoad = $('#showBatteryLoad');
  var $showDigitalDate = $('#showDigitalDate');
  var $showDigitalTime = $('#showDigitalTime');
  var $showShadow = $('#showShadow');

  var options = {
    minuteCircleColor: $minuteCircleColor.val(),
    hourCircleColor: $hourCircleColor.val(),
    showBatteryLoad: $showBatteryLoad[0].checked,
    showDigitalDate: $showDigitalDate[0].checked,
    showDigitalTime: $showDigitalTime[0].checked,
    showShadow: $showShadow[0].checked
  };

  localStorage.minuteCircleColor = options.minuteCircleColor;
  localStorage.hourCircleColor = options.hourCircleColor;
  localStorage.showBatteryLoad = options.showBatteryLoad;
  localStorage.showDigitalDate = options.showDigitalDate;
  localStorage.showDigitalTime = options.showDigitalTime;
  localStorage.showShadow = options.showShadow;

  console.log('Got options: ' + JSON.stringify(options));
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
