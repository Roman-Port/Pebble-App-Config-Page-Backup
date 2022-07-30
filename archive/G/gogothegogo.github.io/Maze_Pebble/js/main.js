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
  var $backgroundType = $('#backgroundType');
  var $shakeWindow = $('#shakeWindow');
  var $bluetoothAlarm = $('#bluetoothAlarm');
  var $batteryIcon = $('#batteryIcon');
  var $dateFormat = $('#dateFormat');
  var $croatianDate = $('#croatianDate');
  var $colorTimeBackground = $('#colorTimeBackground');
  var $colorTimeText = $('#colorTimeText');
  var $colorNotificationText = $('#colorNotificationText');
  var $shakeTimeout = $('#shakeTimeout');

  if (localStorage.backgroundType) {
    $backgroundType[0].value = localStorage.backgroundType;
    $shakeWindow[0].value = localStorage.shakeWindow;
    $bluetoothAlarm[0].value = localStorage.bluetoothAlarm;
    $batteryIcon[0].value = localStorage.batteryIcon;
    $dateFormat[0].value = localStorage.dateFormat;
    $croatianDate[0].checked = localStorage.croatianDate == 1;
    $colorTimeBackground[0].value = localStorage.colorTimeBackground;
    $colorTimeText[0].value = localStorage.colorTimeText;
    $colorNotificationText[0].value = localStorage.colorNotificationText;
    $shakeTimeout[0].value = localStorage.shakeTimeout;
  }
}

function getAndStoreConfigData() {
  var $backgroundType = $('#backgroundType');
  var $shakeWindow = $('#shakeWindow');
  var $bluetoothAlarm = $('#bluetoothAlarm');
  var $batteryIcon = $('#batteryIcon');
  var $dateFormat = $('#dateFormat');
  var $croatianDate = $('#croatianDate');
  var $colorTimeBackground = $('#colorTimeBackground');
  var $colorTimeText = $('#colorTimeText');
  var $colorNotificationText = $('#colorNotificationText');
  var $shakeTimeout = $('#shakeTimeout');
  
  var options = {
    backgroundType: $backgroundType.val(),
    shakeWindow: $shakeWindow.val(),
    bluetoothAlarm: $bluetoothAlarm.val(),
    batteryIcon: $batteryIcon.val(),
    dateFormat: $dateFormat.val(),
    croatianDate: $croatianDate[0].checked ? 1:0,
    colorTimeBackground: $colorTimeBackground.val(),
    colorTimeText: $colorTimeText.val(),
    colorNotificationText: $colorNotificationText.val(),
    shakeTimeout: $shakeTimeout.val()
  };

  localStorage.backgroundType = options.backgroundType;
  localStorage.shakeWindow = options.shakeWindow;
  localStorage.bluetoothAlarm = options.bluetoothAlarm;
  localStorage.batteryIcon = options.batteryIcon;
  localStorage.dateFormat = options.dateFormat;
  localStorage.croatianDate = options.croatianDate;
  localStorage.colorTimeBackground = options.colorTimeBackground;
  localStorage.colorTimeText = options.colorTimeText;
  localStorage.colorNotificationText = options.colorNotificationText;
  localStorage.shakeTimeout = options.shakeTimeout;

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

var $currentId;
$('.preset').click(function(e) {
  $currentId = $(this).attr('id');
  var $prevId = $currentId;
  $('.preset').removeClass('current');
  $(this).addClass('current');
  if($currentId == "1a") {
      $('#backgroundType')[0].value=1;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0x000000";
      $('#colorNotificationText')[0].value="0xFFFFFF";
    } else if($currentId == "2a") {
      $('#backgroundType')[0].value=2;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0x000000";
      $('#colorNotificationText')[0].value="0xFFFFFF";
    } else if($currentId == "3a") {
      $('#backgroundType')[0].value=3;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0x000000";
      $('#colorNotificationText')[0].value="0xFFFFFF";
    } else if($currentId == "4a") {
      $('#backgroundType')[0].value=4;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0x000000";
      $('#colorNotificationText')[0].value="0xFFFFFF";
    } else if($currentId == "5a") {
      $('#backgroundType')[0].value=0;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0x000000";
      $('#colorNotificationText')[0].value="0xFFFFFF";
    } else if($currentId == "1b") {
      $('#backgroundType')[0].value=1;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0x000000";
      $('#colorNotificationText')[0].value="0xFF0000";
    } else if($currentId == "2b") {
      $('#backgroundType')[0].value=2;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0x555555";
      $('#colorNotificationText')[0].value="0xFF0000";
    } else if($currentId == "3b") {
      $('#backgroundType')[0].value=3;
      $('#colorTimeBackground')[0].value="0x00AAAA";
      $('#colorTimeText')[0].value="0x000000";
      $('#colorNotificationText')[0].value="0xFFFFFF";
    } else if($currentId == "4b") {
      $('#backgroundType')[0].value=4;
      $('#colorTimeBackground')[0].value="0x005500";
      $('#colorTimeText')[0].value="0xAA0000";
      $('#colorNotificationText')[0].value="0xFFFFFF";
    } else if($currentId == "5b") {
      $('#backgroundType')[0].value=0;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0xFF0000";
      $('#colorNotificationText')[0].value="0xFFFFFF";
    }
});
