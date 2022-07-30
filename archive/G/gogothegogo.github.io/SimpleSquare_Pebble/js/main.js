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
  var $timeSize = $('#timeSize');
  var $dateSize = $('#dateSize');
  var $bluetoothAlarm = $('#bluetoothAlarm');
  var $batteryIcon = $('#batteryIcon');
  var $dateFormat = $('#dateFormat');
  var $croatianDate = $('#croatianDate');
  var $colorTimeBackground = $('#colorTimeBackground');
  var $colorTimeText = $('#colorTimeText');
  var $colorDateBackground = $('#colorDateBackground');
  var $colorDateText = $('#colorDateText');

  if (localStorage.colorTheme) {
    $timeSize[0].value = localStorage.timeSize;
    $dateSize[0].value = localStorage.dateSize;
    $bluetoothAlarm[0].value = localStorage.bluetoothAlarm;
    $batteryIcon[0].value = localStorage.batteryIcon;
    $dateFormat[0].value = localStorage.dateFormat;
    $croatianDate[0].checked = localStorage.croatianDate == 1;
    $colorTimeBackground[0].value = localStorage.colorTimeBackground;
    $colorTimeText[0].value = localStorage.colorTimeText;
    $colorDateBackground[0].value = localStorage.colorDateBackground;
    $colorDateText[0].value = localStorage.colorDateText;
  }
}

function getAndStoreConfigData() {
  var $timeSize = $('#timeSize');
  var $dateSize = $('#dateSize');
  var $bluetoothAlarm = $('#bluetoothAlarm');
  var $batteryIcon = $('#batteryIcon');
  var $dateFormat = $('#dateFormat');
  var $croatianDate = $('#croatianDate');
  var $colorTimeBackground = $('#colorTimeBackground');
  var $colorTimeText = $('#colorTimeText');
  var $colorDateBackground = $('#colorDateBackground');
  var $colorDateText = $('#colorDateText');
  
  var options = {
    timeSize: $timeSize.val(),
    dateSize: $dateSize.val(),
    bluetoothAlarm: $bluetoothAlarm.val(),
    batteryIcon: $batteryIcon.val(),
    dateFormat: $dateFormat.val(),
    croatianDate: $croatianDate[0].checked ? 1:0,
    colorTimeBackground: $colorTimeBackground.val(),
    colorTimeText: $colorTimeText.val(),
    colorDateBackground: $colorDateBackground.val(),
    colorDateText: $colorDateText.val()
  };

  localStorage.timeSize = options.timeSize;
  localStorage.dateSize = options.dateSize;
  localStorage.bluetoothAlarm = options.bluetoothAlarm;
  localStorage.batteryIcon = options.batteryIcon;
  localStorage.dateFormat = options.dateFormat;
  localStorage.croatianDate = options.croatianDate;
  localStorage.colorTimeBackground = options.colorTimeBackground;
  localStorage.colorTimeText = options.colorTimeText;
  localStorage.colorDateBackground = options.colorDateBackground;
  localStorage.colorDateText = options.colorDateText;

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
      $('#timeSize')[0].value=3;
      $('#dateSize')[0].value=2;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0xFFFFFF";
      $('#colorDateBackground')[0].value="0x000000";
      $('#colorDateText')[0].value="0xFFFFFF";
    } else if($currentId == "2a") {
      $('#timeSize')[0].value=3;
      $('#dateSize')[0].value=2;
      $('#colorTimeBackground')[0].value="0xFFFFFF";
      $('#colorTimeText')[0].value="0x000000";
      $('#colorDateBackground')[0].value="0x000000";
      $('#colorDateText')[0].value="0xFFFFFF";
    } else if($currentId == "3a") {
      $('#timeSize')[0].value=5;
      $('#dateSize')[0].value=0;
      $('#colorTimeBackground')[0].value="0xFFFFFF";
      $('#colorTimeText')[0].value="0x000000";
      $('#colorDateBackground')[0].value="0xFFFFFF";
      $('#colorDateText')[0].value="0x000000";
    } else if($currentId == "4a") {
      $('#timeSize')[0].value=1;
      $('#dateSize')[0].value=0;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0xFFFFFF";
      $('#colorDateBackground')[0].value="0x000000";
      $('#colorDateText')[0].value="0xFFFFFF";
    } else if($currentId == "5a") {
      $('#timeSize')[0].value=1;
      $('#dateSize')[0].value=1;
      $('#colorTimeBackground')[0].value="0xFFFFFF";
      $('#colorTimeText')[0].value="0x000000";
      $('#colorDateBackground')[0].value="0xFFFFFF";
      $('#colorDateText')[0].value="0x000000";
    } else if($currentId == "1b") {
      $('#timeSize')[0].value=3;
      $('#dateSize')[0].value=2;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0xFFFFFF";
      $('#colorDateBackground')[0].value="0x000000";
      $('#colorDateText')[0].value="0xFFFFFF";
    } else if($currentId == "2b") {
      $('#timeSize')[0].value=3;
      $('#dateSize')[0].value=2;
      $('#colorTimeBackground')[0].value="0xFFFFFF";
      $('#colorTimeText')[0].value="0x000055";
      $('#colorDateBackground')[0].value="0x000055";
      $('#colorDateText')[0].value="0xFFFFFF";
    } else if($currentId == "3b") {
      $('#timeSize')[0].value=5;
      $('#dateSize')[0].value=0;
      $('#colorTimeBackground')[0].value="0xFFFFFF";
      $('#colorTimeText')[0].value="0x00AAAA";
      $('#colorDateBackground')[0].value="0xFFFFFF";
      $('#colorDateText')[0].value="0x00AAAA";
    } else if($currentId == "4b") {
      $('#timeSize')[0].value=5;
      $('#dateSize')[0].value=0;
      $('#colorTimeBackground')[0].value="0x00AAAA";
      $('#colorTimeText')[0].value="0xFFFFFF";
      $('#colorDateBackground')[0].value="0x00AAAA";
      $('#colorDateText')[0].value="0xFFFFFF";
    } else if($currentId == "5b") {
      $('#timeSize')[0].value=1;
      $('#dateSize')[0].value=0;
      $('#colorTimeBackground')[0].value="0x000000";
      $('#colorTimeText')[0].value="0xFF0000";
      $('#colorDateBackground')[0].value="0x000000";
      $('#colorDateText')[0].value="0xFF0000";
    } else if($currentId == "6b") {
      $('#timeSize')[0].value=5;
      $('#dateSize')[0].value=2;
      $('#colorTimeBackground')[0].value="0x00AA55";
      $('#colorTimeText')[0].value="0xFF0000";
      $('#colorDateBackground')[0].value="0xFF0000";
      $('#colorDateText')[0].value="0xFFFF00";
    }
    
    
});
