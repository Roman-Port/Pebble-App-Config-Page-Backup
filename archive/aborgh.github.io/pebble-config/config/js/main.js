(function (){
    loadOptions()
    submitHandler();
})();

function submitHandler(){
var $submitButton = $('#submitButton');

$submitButton.on('click' ,function(){
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location =return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
});
}
function loadOptions (){
    var $topColorPicker = $('#topColorPicker');
    var $timeFormatCheckbox = $('#timeFormatCheckbox');
    var $bottomColorPicker = $('#bottomColorPicker');
    var $topTextColorPicker = $('#topTextColorPicker');
    var $bottomTextColorPicker = $('#bottomTextColorPicker');
    var $bluetoothFormatCheckbox = $('#bluetoothFormatCheckbox');
    var $batteryFormatCheckbox = $('#batteryFormatCheckbox');
    var $weekdayFormatCheckbox = $('#weekdayFormatCheckbox');
    var $dateFormatCheckbox = $('#dateFormatCheckbox');
    var $weekdayColorPicker = $('#weekdayColorPicker');
    var $batteryColorPicker = $('#batteryColorPicker');
    var $hourVibrateFormatCheckbox = $('#hourVibrateFormatCheckbox');

    if(localStorage.topColor) {
        $topColorPicker[0].value = localStorage.topColor;
        $timeFormatCheckbox[0].checked = localStorage.twentyFourHourFormat === 'true';
        $bottomColorPicker[0].value = localStorage.bottomColor;
        $topTextColorPicker[0].value = localStorage.topTextColor;
        $bottomTextColorPicker[0].value = localStorage.bottomTextColor;
        $bluetoothFormatCheckbox[0].checked = localStorage.bluetoothVibration === 'true';
        $batteryFormatCheckbox[0].checked = localStorage.showBattery === 'true';
        $weekdayFormatCheckbox[0].checked = localStorage.showWeekday === 'true';
        $dateFormatCheckbox[0].checked = localStorage.dateFormat === 'true';
        $weekdayColorPicker[0].value = localStorage.weekdayColor;
        $batteryColorPicker[0].value = localStorage.batteryColor;
        $hourVibrateFormatCheckbox[0].checked = localStorage.hourVibrate === 'true';
    }

}

function getAndStoreConfigData(){
    var $topColorPicker = $('#topColorPicker');
    var $timeFormatCheckbox = $('#timeFormatCheckbox');
    var $bottomColorPicker = $('#bottomColorPicker');
    var $topTextColorPicker = $('#topTextColorPicker');
    var $bottomTextColorPicker = $('#bottomTextColorPicker');
    var $bluetoothFormatCheckbox = $('#bluetoothFormatCheckbox');
    var $batteryFormatCheckbox = $('#batteryFormatCheckbox');
    var $weekdayFormatCheckbox = $('#weekdayFormatCheckbox');
    var $dateFormatCheckbox = $('#dateFormatCheckbox');
    var $weekdayColorPicker = $('#weekdayColorPicker');
    var $batteryColorPicker = $('#batteryColorPicker');
    var $hourVibrateFormatCheckbox = $('#hourVibrateFormatCheckbox');

    var options = {
        topColor: $topColorPicker.val(),
        twentyFourHourFormat: $timeFormatCheckbox[0].checked,
        bottomColor: $bottomColorPicker.val(),
        topTextColor: $topTextColorPicker.val(),
        bottomTextColor: $bottomTextColorPicker.val(),
        bluetoothVibration: $bluetoothFormatCheckbox[0].checked,
        showBattery: $batteryFormatCheckbox[0].checked,
        showWeekday: $weekdayFormatCheckbox[0].checked,
        dateFormat: $dateFormatCheckbox[0].checked,
        weekdayColor: $weekdayColorPicker.val(),
        batteryColor: $batteryColorPicker.val(),
        hourVibrate: $hourVibrateFormatCheckbox[0].checked

    };

    localStorage.topColor = options.topColor;
    localStorage.twentyFourHourFormat = options.twentyFourHourFormat;
    localStorage.bottomColor = options.bottomColor;
    localStorage.topTextColor = options.topTextColor;
    localStorage.bottomTextColor = options.bottomTextColor;
    localStorage.bluetoothVibration = options.bluetoothVibration;
    localStorage.showBattery = options.showBattery;
    localStorage.showWeekday = options.showWeekday;
    localStorage.dateFormat = options.dateFormat;
    localStorage.weekdayColor = options.weekdayColor;
    localStorage.batteryColor = options.batteryColor;
    localStorage.hourVibrate = options.hourVibrate;

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
