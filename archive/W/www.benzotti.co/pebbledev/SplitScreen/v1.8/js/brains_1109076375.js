// Items
var $batteryColor = $('#batteryColor');
var $hourColor = $('#hourColor');
var $minuteColor = $('#minuteColor');
var $secondsColor = $('#secondsColor');
var $dateColor = $('#dateColor');
var $mainBackgroundColor = $('#mainBackgroundColor');
var $panelTextColor = $('#panelTextColor');
var $panelBackgroundColor = $('#panelBackgroundColor');

var $panelConfig = $('input[name=panelConfig]:checked');

var $fontType = $('#fontType');
var $iconType = $('#iconType');

var $timeSize = $('input[name=timeSize]:checked');

var $timeConfig = $('#timeConfig');
var $timeSeparator = $('#timeSeparator');
var $timeFormat = $('#timeFormat');

var $dateFormat = $('#dateFormat');

var $weatherUnit = $('#weatherUnit');
var $weatherCheck = $('#weatherCheck');
var $weatherSummary = $('#weatherSummary');
var $weatherSource = $('#weatherSource');
var $fapiKey = $('#fapiKey');
var $oapiKey = $('#oapiKey');
var $wuapiKey = $('#wuapiKey');
var $manualLocation = $('#manualLocation');

var $showForecast = $('#showForecast');
var $showBattery = $('#showBattery');
var $btDisconnect = $('#btDisconnect');
var $lowBatteryWarning = $('#lowBatteryWarning');

var $finalApi;



// Storage
var $currentConfig = localStorage.panelConfig;
var $currentTimeSize = localStorage.timeSize;
var $currentDateFormat = localStorage.dateFormat;
var $currentWeatherUpdate = localStorage.weatherCheck;
var $currentLocation = localStorage.manualLocation;
var $currentWeatherSource = localStorage.weatherSource;
var $currentFontType = localStorage.fontType;
var $currentWeatherSummary = localStorage.weatherSummary;
var $currentFapiKey = localStorage.fapiKey;
var $currentOapiKey = localStorage.oapiKey;
var $currentWuapiKey = localStorage.wuapiKey;
var $currentTimeSeparator = localStorage.timeSeparator;
var $currentIconType = localStorage.iconType;
var $currentWeatherUnit = localStorage.weatherUnit;


$(document).ready(function() {

  // console.log('localStorage Contents [ready]: ' + JSON.stringify(localStorage));
// localStorage.clear();

var $presetsOptions = JSON.parse(localStorage.getItem('preset'));
    if($presetsOptions != null && $presetsOptions.length > 0) {
      for(i = 1; i <= $presetsOptions.length; i++) {
        $('.container .presets').append('<li class="' + (i - 1) + '"><span onClick="usePreset(' + (i - 1) + ')"><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].batteryColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].hourColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].minuteColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].secondsColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].dateColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].mainBackgroundColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].panelTextColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].panelBackgroundColor.replace('0x', '') + '">&nbsp;</a></span><span class="del" onClick="deletePreset(' + (i - 1) + ')"><i class="fa fa-times"></i></span></li>');
      }
    } else {
      $('.container .presets').html('<li>No Presets Saved</li>');
    }

    if($currentLocation != null) {
      $('input[name="manualLocation"]').val($currentLocation);
    }
    if($currentFapiKey != null) {
      $('input[name="fapiKey"]').val($currentFapiKey);
    }
    if($currentOapiKey != null) {
      $('input[name="oapiKey"]').val($currentOapiKey);
    }
    if($currentWuapiKey != null) {
      $('input[name="wuapiKey"]').val($currentWuapiKey);
    }

    setChecked('input', 'timeSeparator', $currentTimeSeparator, 'checked');
    setChecked('input', 'timeSize', $currentTimeSize, 'checked');
    setChecked('input', 'panelConfig', $currentConfig, 'checked');
    setChecked('option', 'fontType', $currentFontType, 'selected');
    setChecked('option', 'dateFormat', $currentDateFormat, 'selected');
    setChecked('option', 'weatherSource', $currentWeatherSource, 'selected');
    setChecked('option', 'weatherUpdate', $currentWeatherUpdate, 'selected');
    setChecked('option', 'weatherSummary', $currentWeatherSummary, 'selected');
    setChecked('option', 'iconType', $currentIconType, 'selected');
    setChecked('option', 'weatherUnit', $currentWeatherUnit, 'selected');

    function setChecked(type, name, val, prop) {
            $(type + '[name=' + name + '][value=' + val + ']').prop(prop, true);
    }

    var $weatherSourceValue = $('#weatherSource option:selected').val();
    switch($weatherSourceValue) {
      case 'forecastio':
      $('.fapiKey-item').removeClass('hide').addClass('show');
      $('.oapiKey-item').removeClass('show').addClass('hide');
      $('.wuapiKey-item').removeClass('show').addClass('hide');
      break;
      case 'openweathermap':
      $('.fapiKey-item').removeClass('show').addClass('hide');
      $('.oapiKey-item').removeClass('hide').addClass('show');
      $('.wuapiKey-item').removeClass('show').addClass('hide');
      break;
      case 'weatherunderground':
      $('.fapiKey-item').removeClass('show').addClass('hide');
      $('.oapiKey-item').removeClass('show').addClass('hide');
      $('.wuapiKey-item').removeClass('hide').addClass('show');
      break;
    };

    $('#weatherSource').change(function() {
        var val = $(this).val();
        switch(val) {
          case 'forecastio':
          $('.fapiKey-item').removeClass('hide').addClass('show');
          $('.oapiKey-item').removeClass('show').addClass('hide');
          $('.wuapiKey-item').removeClass('show').addClass('hide');
          break;
          case 'openweathermap':
          $('.fapiKey-item').removeClass('show').addClass('hide');
          $('.oapiKey-item').removeClass('hide').addClass('show');
          $('.wuapiKey-item').removeClass('show').addClass('hide');
          break;
          case 'weatherunderground':
          $('.fapiKey-item').removeClass('show').addClass('hide');
          $('.oapiKey-item').removeClass('show').addClass('hide');
          $('.wuapiKey-item').removeClass('hide').addClass('show');
          break;
        };
    });

    switch($weatherSource.val()) {
      case 'forecastio':
      $finalApi = $fapiKey;
      break;
      case 'openweathermap':
      $finalApi = $oapiKey;
      break;
      case 'weatherunderground':
      $finalApi = $wuapiKey;
      break;
    };

    var $currentId;

$('.preset').click(function(e) {
     $currentId = $(this).attr('id');
     console.log('Current ID: ' + $currentId);
     var $prevId = $currentId;
     $('.preset').removeClass('current');
     $(this).addClass('current');
     switch($currentId) {
       case '1':
       $batteryColor[0].value = '0x0055FF';
       $hourColor[0].value = '0x555555';
       $minuteColor[0].value = '0xAAAAAA';
       $secondsColor[0].value = '0x555555';
       $dateColor[0].value = '0x555555';
       $mainBackgroundColor[0].value = '0xFFFFFF';
       $panelTextColor[0].value = '0x555555';
       $panelBackgroundColor[0].value = '0xFFFFFF';
       break;
       case '2':
       $batteryColor[0].value = '0x00FF00';
       $hourColor[0].value = '0xFFFFFF';
       $minuteColor[0].value = '0xFF5500';
       $secondsColor[0].value = '0xFFFFFF';
       $dateColor[0].value = '0x00AAFF';
       $mainBackgroundColor[0].value = '0x000000';
       $panelTextColor[0].value = '0xFF00AA';
       $panelBackgroundColor[0].value = '0x000000';
       break;
       case '3':
       $batteryColor[0].value = '0xAA5555';
       $hourColor[0].value = '0x550000';
       $minuteColor[0].value = '0xAAAAAA';
       $secondsColor[0].value = '0x555555';
       $dateColor[0].value = '0xAAAAAA';
       $mainBackgroundColor[0].value = '0xAA0000';
       $panelTextColor[0].value = '0x550000';
       $panelBackgroundColor[0].value = '0xAA5555';
       break;
       case '4':
       $batteryColor[0].value = '0x00AAAA';
       $hourColor[0].value = '0xAAAAAA';
       $minuteColor[0].value = '0xAAAAAA';
       $secondsColor[0].value = '0x555555';
       $dateColor[0].value = '0xAAAAAA';
       $mainBackgroundColor[0].value = '0x005555';
       $panelTextColor[0].value = '0xAAAAAA';
       $panelBackgroundColor[0].value = '0x005555';
       break;
       case '5':
       $batteryColor[0].value = '0x55FFFF';
       $hourColor[0].value = '0x0055AA';
       $minuteColor[0].value = '0xAAFFFF';
       $secondsColor[0].value = '0xAAFFFF';
       $dateColor[0].value = '0x55FFFF';
       $mainBackgroundColor[0].value = '0x000000';
       $panelTextColor[0].value = '0x00FFFF';
       $panelBackgroundColor[0].value = '0x000000';
       break;
       case '6':
       $batteryColor[0].value = '0xAAFF00';
       $hourColor[0].value = '0xAAFF00';
       $minuteColor[0].value = '0x55FFAA';
       $secondsColor[0].value = '0x00FF55';
       $dateColor[0].value = '0xAAFF00';
       $mainBackgroundColor[0].value = '0x000000';
       $panelTextColor[0].value = '0xAAFF00';
       $panelBackgroundColor[0].value = '0x000000';
       break;
       case '7':
       $hourColor[0].value = '0x000000';
       $minuteColor[0].value = '0x555555';
       $secondsColor[0].value = '0x000000';
       $dateColor[0].value = '0x000000';
       $mainBackgroundColor[0].value = '0xFFFFFF';
       $panelTextColor[0].value = '0xFFFFFF';
       $panelBackgroundColor[0].value = '0x00AAFF';
       $batteryColor[0].value = '0x00AAFF';
       break;
       case '8':
       $hourColor[0].value = '0x550055';
       $minuteColor[0].value = '0xAA00AA';
       $secondsColor[0].value = '0xFFAAFF';
       $dateColor[0].value = '0xAA00FF';
       $mainBackgroundColor[0].value = '0xFFFFAA';
       $panelTextColor[0].value = '0xFFFFFF';
       $panelBackgroundColor[0].value = '0x00AAAA';
       $batteryColor[0].value = '0x00AAAA';
       break;
       case '9':
       $hourColor[0].value = '0xFFAA55';
       $minuteColor[0].value = '0xAAAA55';
       $secondsColor[0].value = '0xFFAA55';
       $dateColor[0].value = '0xAA5500';
       $mainBackgroundColor[0].value = '0xFFFFAA';
       $panelTextColor[0].value = '0xFFFFAA';
       $panelBackgroundColor[0].value = '0xFF5555';
       $batteryColor[0].value = '0xAA0000';
       break;
       case '10':
       $hourColor[0].value = '0xFFAA55';
       $minuteColor[0].value = '0xFF5500';
       $secondsColor[0].value = '0xFF5555';
       $dateColor[0].value = '0x55AAAA';
       $mainBackgroundColor[0].value = '0xFFFFFF';
       $panelTextColor[0].value = '0xFFFFFF';
       $panelBackgroundColor[0].value = '0x005555';
       $batteryColor[0].value = '0x005555';
       break;
       case '11':
       $hourColor[0].value = '0x00AAFF';
       $minuteColor[0].value = '0xAAFFFF';
       $secondsColor[0].value = '0xFF0055';
       $dateColor[0].value = '0xAAFFFF';
       $mainBackgroundColor[0].value = '0x5555AA';
       $panelTextColor[0].value = '0xAAFFFF';
       $panelBackgroundColor[0].value = '0x5555AA';
       $batteryColor[0].value = '0xFFFF00';
       break;
       case '12':
       $hourColor[0].value = '0x000000';
       $minuteColor[0].value = '0xAAFFAA';
       $secondsColor[0].value = '0x000000';
       $dateColor[0].value = '0x000000';
       $mainBackgroundColor[0].value = '0x5555AA';
       $panelTextColor[0].value = '0xFF5500';
       $panelBackgroundColor[0].value = '0x000000';
       $batteryColor[0].value = '0x00AAFF';
       break;
       case '13':
       $hourColor[0].value = '0xAA0000';
       $minuteColor[0].value = '0x555555';
       $secondsColor[0].value = '0xAA0000';
       $dateColor[0].value = '0x555555';
       $mainBackgroundColor[0].value = '0xFFFFFF';
       $panelTextColor[0].value = '0xFFFFFF';
       $panelBackgroundColor[0].value = '0xAA0000';
       $batteryColor[0].value = '0xAA0000';
       break;
       case '14':
       $hourColor[0].value = '0xFFFFFF';
       $minuteColor[0].value = '0x00FF00';
       $mainBackgroundColor[0].value = '0x555555';
       $panelTextColor[0].value = '0x000000';
       $panelBackgroundColor[0].value = '0x00FF00';
       $batteryColor[0].value = '0x00FF00';
       break;
       case '15':
       $batteryColor[0].value = '0xff0055';
       $hourColor[0].value = '0xaaaaaa';
       $minuteColor[0].value = '0x00aaaa';
       $mainBackgroundColor[0].value = '0x0055AA';
       $panelTextColor[0].value = '0x000000';
       $panelBackgroundColor[0].value = '0xff0055';
       break;
       case '16':
       $hourColor[0].value = '0x0055AA';
       $minuteColor[0].value = '0xFFAA55';
       $mainBackgroundColor[0].value = '0xFFFFFF';
       $panelTextColor[0].value = '0xFFFFFF';
       $panelBackgroundColor[0].value = '0x00AAAA';
       $batteryColor[0].value = '0x00AAAA';
       break;
       case '17':
       $batteryColor[0].value = '0x00AA55';
       $hourColor[0].value = '0xFF55AA';
       $minuteColor[0].value = '0xFFAAAA';
       $mainBackgroundColor[0].value = '0xFFFFFF';
       $panelTextColor[0].value = '0x555555';
       $panelBackgroundColor[0].value = '0xAAFF00';
       break;
       case '18':
       $batteryColor[0].value = '0x550000';
       $hourColor[0].value = '0x005500';
       $minuteColor[0].value = '0x55AA00';
       $mainBackgroundColor[0].value = '0xFFFFFF';
       $panelTextColor[0].value = '0xFFFFFF';
       $panelBackgroundColor[0].value = '0x55AA55';
       break;
       case '19':
       $batteryColor[0].value = '0x55FF00';
       $hourColor[0].value = '0x00AAFF';
       $minuteColor[0].value = '0xFF00AA';
       $mainBackgroundColor[0].value = '0x000000';
       $panelTextColor[0].value = '0x55FF00';
       $panelBackgroundColor[0].value = '0x000000';
       break;
       case '20':
       $hourColor[0].value = '0xFF0000';
       $mainBackgroundColor[0].value = '0xFFFFFF';
       $panelTextColor[0].value = '0x000000';
       $panelBackgroundColor[0].value = '0xFFFFFF';
       $batteryColor[0].value = '0x000000';
       break;
       case '21':
       $hourColor[0].value = '0xFF5500';
       $mainBackgroundColor[0].value = '0xFF0000';
       $panelTextColor[0].value = '0x000000';
       $panelBackgroundColor[0].value = '0xFFFFFF';
       $batteryColor[0].value = '0x000000';
       break;
       case '22':
       $hourColor[0].value = '0xFFFFFF';
       $mainBackgroundColor[0].value = '0xFF0000';
       $panelTextColor[0].value = '0x000000';
       $panelBackgroundColor[0].value = '0xFFFFFF';
       $batteryColor[0].value = '0x000000';
       break;
       case '23':
       $hourColor[0].value = '0x550000';
       $mainBackgroundColor[0].value = '0x00AAFF';
       $panelTextColor[0].value = '0x000000';
       $panelBackgroundColor[0].value = '0xFFFFFF';
       $batteryColor[0].value = '0x000000';
       break;
       case '24':
       $hourColor[0].value = '0x000000';
       $mainBackgroundColor[0].value = '0x55FF00';
       $panelTextColor[0].value = '0x000000';
       $panelBackgroundColor[0].value = '0xFFFFFF';
       $batteryColor[0].value = '0x000000';
       break;
       case '25':
       $hourColor[0].value = '0xFFFF00';
       $mainBackgroundColor[0].value = '0xAA00FF';
       $panelTextColor[0].value = '0x000000';
       $panelBackgroundColor[0].value = '0xFFFFFF';
       $batteryColor[0].value = '0x000000';
       break;
       case '100':
       $batteryColor[0].value = '0xFFFF00';
       $hourColor[0].value = '0x000000';
       $minuteColor[0].value = '0xFFFF00';
       $secondsColor[0].value = '0x000000';
       $dateColor[0].value = '0x000000';
       $mainBackgroundColor[0].value = '0x555555';
       $panelTextColor[0].value = '0x000000';
       $panelBackgroundColor[0].value = '0xFFFF00';
       break;
       case '101':
       $batteryColor[0].value = '0xFF0000';
      $hourColor[0].value = '0xFFFF00';
      $minuteColor[0].value = '0xFFFF00';
      $secondsColor[0].value = '0xFFFF00';
      $dateColor[0].value = '0xFF0000';
      $mainBackgroundColor[0].value = '0x0055FF';
      $panelTextColor[0].value = '0xFFFF00';
      $panelBackgroundColor[0].value = '0xFF0000';
       break;
       case '102':
       $batteryColor[0].value = '0xFFFF00';
      $hourColor[0].value = '0xFFFF00';
      $minuteColor[0].value = '0xFFFF00';
      $secondsColor[0].value = '0xFFFF00';
      $dateColor[0].value = '0xFFFF00';
      $mainBackgroundColor[0].value = '0xFF0000';
      $panelTextColor[0].value = '0xFF0000';
      $panelBackgroundColor[0].value = '0xFFFF00';
       break;
       case '103':
       $batteryColor[0].value = '0x000000';
      $hourColor[0].value = '0x5500AA';
      $minuteColor[0].value = '0x5500AA';
      $secondsColor[0].value = '0x5500AA';
      $dateColor[0].value = '0x5500AA';
      $mainBackgroundColor[0].value = '0x00AA00';
      $panelTextColor[0].value = '0x00AA00';
      $panelBackgroundColor[0].value = '0x000000';
       break;
       case '104':
       $batteryColor[0].value = '0xFFFF00';
      $hourColor[0].value = '0xFFFFFF';
      $minuteColor[0].value = '0xFFFFFF';
      $secondsColor[0].value = '0xFFFFFF';
      $dateColor[0].value = '0x000000';
      $mainBackgroundColor[0].value = '0xFF0000';
      $panelTextColor[0].value = '0x000000';
      $panelBackgroundColor[0].value = '0xFF0000';
       break;
       case '105':
       $batteryColor[0].value = '0xFF0000';
      $hourColor[0].value = '0x000000';
      $minuteColor[0].value = '0xFF0000';
      $secondsColor[0].value = '0x000000';
      $dateColor[0].value = '0x000000';
      $mainBackgroundColor[0].value = '0x0055FF';
      $panelTextColor[0].value = '0xFFFFFF';
      $panelBackgroundColor[0].value = '0xFF0000';
       break;
       case '106':
       $batteryColor[0].value = '0xFF0000';
      $hourColor[0].value = '0x0055FF';
      $minuteColor[0].value = '0x0055FF';
      $secondsColor[0].value = '0x0055FF';
      $dateColor[0].value = '0xFF0000';
      $mainBackgroundColor[0].value = '0xFFFFFF';
      $panelTextColor[0].value = '0xFFFFFF';
      $panelBackgroundColor[0].value = '0x0055FF';
       break;
       case '200':
       $batteryColor[0].value = '0x000000';
      $hourColor[0].value = '0x000000';
      $minuteColor[0].value = '0x000000';
      $secondsColor[0].value = '0x000000';
      $dateColor[0].value = '0x000000';
      $mainBackgroundColor[0].value = '0xFFFFFF';
      $panelTextColor[0].value = '0xFFFFFF';
      $panelBackgroundColor[0].value = '0x000000';
       break;
       case '201':
       $batteryColor[0].value = '0xFFFFFF';
      $hourColor[0].value = '0xFFFFFF';
      $minuteColor[0].value = '0xFFFFFF';
      $secondsColor[0].value = '0xFFFFFF';
      $dateColor[0].value = '0xFFFFFF';
      $mainBackgroundColor[0].value = '0x000000';
      $panelTextColor[0].value = '0x000000';
      $panelBackgroundColor[0].value = '0xFFFFFF';
       break;
       case '202':
       $batteryColor[0].value = '0xFFFFFF';
      $hourColor[0].value = '0xFFFFFF';
      $minuteColor[0].value = '0xFFFFFF';
      $secondsColor[0].value = '0xFFFFFF';
      $dateColor[0].value = '0xFFFFFF';
      $mainBackgroundColor[0].value = '0x000000';
      $panelTextColor[0].value = '0xFFFFFF';
      $panelBackgroundColor[0].value = '0x000000';
       break;
       case '203':
       $batteryColor[0].value = '0x000000';
      $hourColor[0].value = '0x000000';
      $minuteColor[0].value = '0x000000';
      $secondsColor[0].value = '0x000000';
      $dateColor[0].value = '0x000000';
      $mainBackgroundColor[0].value = '0xFFFFFF';
      $panelTextColor[0].value = '0x000000';
      $panelBackgroundColor[0].value = '0xFFFFFF';
       break;
     }

     console.log('Submit');
     var return_to = getQueryParam('return_to', 'pebblejs://close#');
     document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigDataPreset()));

     function getAndStoreConfigDataPreset() {

        var options = {
          batteryColor: $batteryColor.val(),
          hourColor: $hourColor.val(),
          minuteColor: $minuteColor.val(),
          secondsColor: $secondsColor.val(),
          dateColor: $dateColor.val(),
          mainBackgroundColor: $mainBackgroundColor.val(),
          panelTextColor: $panelTextColor.val(),
          panelBackgroundColor: $panelBackgroundColor.val(),
          panelConfig: $panelConfig.val(),
          fontType: $fontType.val(),
          iconType: $iconType.val(),
          timeSize: $timeSize.val(),
          timeConfig: $timeConfig[0].checked,
          timeSeparator: $timeSeparator[0].checked,
          timeFormat: $timeFormat[0].checked,
          dateFormat: $dateFormat.val(),
          weatherUnit: $weatherUnit.val(),
          weatherCheck: $weatherCheck.val(),
          weatherSummary: $weatherSummary.val(),
          weatherSource: $weatherSource.val(),
          currentApi: $finalApi.val(),
          fapiKey: $fapiKey.val(),
          oapiKey: $oapiKey.val(),
          wuapiKey: $wuapiKey.val(),
          manualLocation: $manualLocation.val(),
          showForecast: $showForecast[0].checked,
          showBattery: $showBattery[0].checked,
          btDisconnect: $btDisconnect[0].checked,
          lowBatteryWarning: $lowBatteryWarning[0].checked
        };

        localStorage.batteryColor = options.batteryColor;
        localStorage.hourColor = options.hourColor;
        localStorage.minuteColor = options.minuteColor;
        localStorage.secondsColor = options.secondsColor;
        localStorage.dateColor = options.dateColor;
        localStorage.mainBackgroundColor = options.mainBackgroundColor;
        localStorage.panelTextColor = options.panelTextColor;
        localStorage.panelBackgroundColor = options.panelBackgroundColor;
        localStorage.panelConfig = options.panelConfig;
        localStorage.fontType = options.fontType;
        localStorage.iconType = options.iconType;
        localStorage.timeSize = options.timeSize;
        localStorage.timeConfig = options.timeConfig;
        localStorage.timeSeparator = options.timeSeparator;
        localStorage.timeFormat = options.timeFormat;
        localStorage.dateFormat = options.dateFormat;
        localStorage.weatherUnit = options.weatherUnit;
        localStorage.weatherCheck = options.weatherCheck;
        localStorage.weatherSummary = options.weatherSummary;
        localStorage.weatherSource = options.weatherSource;
        localStorage.currentApi = options.currentApi;
        localStorage.oapiKey = options.oapiKey;
        localStorage.fapiKey = options.fapiKey;
        localStorage.wuapiKey = options.wuapiKey;
        localStorage.manualLocation = options.manualLocation;
        localStorage.showForecast = options.showForecast;
        localStorage.showBattery = options.showBattery;
        localStorage.btDisconnect = options.btDisconnect;
        localStorage.lowBatteryWarning = options.lowBatteryWarning;

        console.log('Got Options: ' + JSON.stringify(options));

        return options;
    }
});

});
// End $(document).ready() AND Presets;

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

    function createPreset(){

        var newPreset = new Object();

        newPreset.batteryColor = $batteryColor.val();
        newPreset.hourColor = $hourColor.val();
        newPreset.minuteColor = $minuteColor.val();
        newPreset.secondsColor = $secondsColor.val();
        newPreset.dateColor = $dateColor.val();
        newPreset.mainBackgroundColor = $mainBackgroundColor.val();
        newPreset.panelTextColor = $panelTextColor.val();
        newPreset.panelBackgroundColor = $panelBackgroundColor.val();
        newPreset.panelConfig = $panelConfig.val();
        newPreset.fontType = $fontType.val();
        newPreset.iconType = $iconType.val();
        newPreset.timeSize = $timeSize.val();
        newPreset.timeConfig = $timeConfig[0].checked;
        newPreset.timeSeparator = $timeSeparator[0].checked;
        newPreset.timeFormat = $timeFormat[0].checked;
        newPreset.dateFormat = $dateFormat.val();
        newPreset.weatherUnit = $weatherUnit.val();
        newPreset.weatherCheck = $weatherCheck.val();
        newPreset.weatherSummary = $weatherSummary.val();
        newPreset.weatherSource = $weatherSource.val();
        newPreset.currentApi = $finalApi.val();
        newPreset.fapiKey = $fapiKey.val();
        newPreset.oapiKey = $oapiKey.val();
        newPreset.wuapiKey = $wuapiKey.val();
        newPreset.manualLocation = $manualLocation.val();
        newPreset.showForecast = $showForecast[0].checked;
        newPreset.showBattery = $showBattery[0].checked;
        newPreset.btDisconnect = $btDisconnect[0].checked;
        newPreset.lowBatteryWarning = $lowBatteryWarning[0].checked;

        if(localStorage.preset)
        {
         preset = JSON.parse(localStorage.getItem('preset'));
        }else{
         preset = [];
        }
         preset.push(newPreset )
        console.log('1'+preset);
        initialPresets = localStorage.getItem('preset');
        initialPresets = JSON.parse(initialPresets);
        localStorage.setItem('preset', JSON.stringify(preset));
        var retrievedObject = localStorage.getItem('preset');
        console.log('retrievedObject: ', JSON.parse(retrievedObject));

        var i = JSON.parse(retrievedObject);
        var object = i;
        i = i.length;

        if(preset.length > 1) {
          $('.container .presets').append('<li class="' + (i - 1) + '"><span onClick="usePreset(' + (i - 1) + ')"><a class="preset-color" style="background-color: #' + object[i-1].batteryColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].hourColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].minuteColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].secondsColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].dateColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].mainBackgroundColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].panelTextColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].panelBackgroundColor.replace('0x', '') + '">&nbsp;</a></span><span class="del" onClick="deletePreset(' + (i - 1) + ')"><i class="fa fa-times"></i></span></li>');
        } else {
          $('.container .presets').children('li').remove();
          $('.container .presets').append('<li class="' + (i - 1) + '"><span onClick="usePreset(' + (i - 1) + ')"><a class="preset-color" style="background-color: #' + object[i-1].batteryColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].hourColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].minuteColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].secondsColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].dateColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].mainBackgroundColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].panelTextColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + object[i-1].panelBackgroundColor.replace('0x', '') + '">&nbsp;</a></span><span class="del" onClick="deletePreset(' + (i - 1) + ')"><i class="fa fa-times"></i></span></li>');

        }

    }

    function usePreset(index) {
      console.log('preset = ' + index);
      var retrievedObject = localStorage.getItem('preset');
      retrievedObject = JSON.parse(retrievedObject);
      console.log('retrievedObject: ', retrievedObject[index]);

      var return_to = getQueryParam('return_to', 'pebblejs://close#');
      document.location = return_to + encodeURIComponent(JSON.stringify(retrievedObject[index]));

      localStorage.batteryColor = retrievedObject[index].batteryColor;
      localStorage.hourColor = retrievedObject[index].hourColor;
      localStorage.minuteColor = retrievedObject[index].minuteColor;
      localStorage.secondsColor = retrievedObject[index].secondsColor;
      localStorage.dateColor = retrievedObject[index].dateColor;
      localStorage.mainBackgroundColor = retrievedObject[index].mainBackgroundColor;
      localStorage.panelTextColor = retrievedObject[index].panelTextColor;
      localStorage.panelBackgroundColor = retrievedObject[index].panelBackgroundColor;
      localStorage.panelConfig = retrievedObject[index].panelConfig;
      localStorage.fontType = retrievedObject[index].fontType;
      localStorage.iconType = retrievedObject[index].iconType;
      localStorage.timeSize = retrievedObject[index].timeSize;
      localStorage.timeConfig = retrievedObject[index].timeConfig;
      localStorage.timeSeparator = retrievedObject[index].timeSeparator;
      localStorage.timeFormat = retrievedObject[index].timeFormat;
      localStorage.dateFormat = retrievedObject[index].dateFormat;
      localStorage.weatherUnit = retrievedObject[index].weatherUnit;
      localStorage.weatherCheck = retrievedObject[index].weatherCheck;
      localStorage.weatherSummary = retrievedObject[index].weatherSummary;
      localStorage.weatherSource = retrievedObject[index].weatherSource;
      // localStorage.currentApi = retrievedObject[index].currentApi;
      // localStorage.oapiKey = retrievedObject[index].oapiKey;
      // localStorage.fapiKey = retrievedObject[index].fapiKey;
      // localStorage.wuapiKey = retrievedObject[index].wuapiKey;
      // localStorage.manualLocation = retrievedObject[index].manualLocation;
      localStorage.showForecast = retrievedObject[index].showForecast;
      localStorage.showBattery = retrievedObject[index].showBattery;
      localStorage.btDisconnect = retrievedObject[index].btDisconnect;
      localStorage.lowBatteryWarning = retrievedObject[index].lowBatteryWarning;
    }

    function deletePreset(index) {
      console.log('del = ' + index);
      var retrievedObject = localStorage.getItem('preset');


      retrievedObject = JSON.parse(retrievedObject);
      if(index == 0) {
        retrievedObject.shift();
      } else {
        retrievedObject.splice(index, 1);
      }

      localStorage.setItem('preset', JSON.stringify(retrievedObject));
      console.log('retrievedObject: ', retrievedObject);
      var $presetsOptions = JSON.parse(localStorage.getItem('preset'));
          if($presetsOptions != null && $presetsOptions.length > 0) {
            $('.container .presets').children('li').remove();
            for(i = 1; i <= $presetsOptions.length; i++) {
              $('.container .presets').append('<li class="' + (i - 1) + '"><span onClick="usePreset(' + (i - 1) + ')"><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].batteryColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].hourColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].minuteColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].secondsColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].dateColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].mainBackgroundColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].panelTextColor.replace('0x', '') + '">&nbsp;</a><a class="preset-color" style="background-color: #' + $presetsOptions[i-1].panelBackgroundColor.replace('0x', '') + '">&nbsp;</a></span><span class="del" onClick="deletePreset(' + (i - 1) + ')"><i class="fa fa-times"></i></span></li>');
            }
          } else {
            $('.container .presets').html('<li>No Presets Saved</li>');
          }
    }

    function loadOptions() {
        $batteryColor[0].value = localStorage.batteryColor;
        $hourColor[0].value = localStorage.hourColor;
        $minuteColor[0].value = localStorage.minuteColor;
        $secondsColor[0].value = localStorage.secondsColor;
        $dateColor[0].value = localStorage.dateColor;
        $mainBackgroundColor[0].value = localStorage.mainBackgroundColor;
        $panelTextColor[0].value = localStorage.panelTextColor;
        $panelBackgroundColor[0].value = localStorage.panelBackgroundColor;
        $panelConfig.selected = localStorage.panelConfig;
        $fontType.value = localStorage.fontType;
        $iconType.value = localStorage.iconType;
        $timeSize.selected = localStorage.timeSize;
        $timeConfig[0].checked = localStorage.timeConfig == 'true';
        $timeSeparator[0].checked = localStorage.timeSeparator == 'true';
        $timeFormat[0].checked = localStorage.timeFormat == 'true';
        $dateFormat.value = localStorage.dateFormat;
        $weatherUnit.value = localStorage.weatherUnit;
        $weatherCheck.value = localStorage.weatherCheck;
        $weatherSummary.selected = localStorage.weatherSummary;
        $weatherSource.value = localStorage.weatherSource;
        $fapiKey.value = localStorage.fapiKey;
        $oapiKey.value = localStorage.openApi;
        $wuapiKey.value= localStorage.wuApi;
        $manualLocation.value = localStorage.manualLocation;
        $showForecast[0].checked = localStorage.showForecast == 'true';
        $showBattery[0].checked = localStorage.showBattery == 'true';
        $btDisconnect[0].checked = localStorage.btDisconnect == 'true';
        $lowBatteryWarning[0].checked = localStorage.lowBatteryWarning == 'true';
    }

    function getAndStoreConfigData() {
        $panelConfig = $('input[name=panelConfig]:checked');
        $timeSize = $('input[name=timeSize]:checked');

        switch($weatherSource.val()) {
          case 'forecastio':
          $finalApi = $fapiKey;
          break;
          case 'openweathermap':
          $finalApi = $oapiKey;
          break;
          case 'weatherunderground':
          $finalApi = $wuapiKey;
          break;
        };

        var options = {
            batteryColor: $batteryColor.val(),
            hourColor: $hourColor.val(),
            minuteColor: $minuteColor.val(),
            secondsColor: $secondsColor.val(),
            dateColor: $dateColor.val(),
            mainBackgroundColor: $mainBackgroundColor.val(),
            panelTextColor: $panelTextColor.val(),
            panelBackgroundColor: $panelBackgroundColor.val(),
            panelConfig: $panelConfig.val(),
            fontType: $fontType.val(),
            iconType: $iconType.val(),
            timeSize: $timeSize.val(),
            timeConfig: $timeConfig[0].checked,
            timeSeparator: $timeSeparator[0].checked,
            timeFormat: $timeFormat[0].checked,
            dateFormat: $dateFormat.val(),
            weatherUnit: $weatherUnit.val(),
            weatherCheck: $weatherCheck.val(),
            weatherSummary: $weatherSummary.val(),
            weatherSource: $weatherSource.val(),
            currentApi: $finalApi.val(),
            fapiKey: $fapiKey.val(),
            oapiKey: $oapiKey.val(),
            wuapiKey: $wuapiKey.val(),
            manualLocation: $manualLocation.val(),
            showForecast: $showForecast[0].checked,
            showBattery: $showBattery[0].checked,
            btDisconnect: $btDisconnect[0].checked,
            lowBatteryWarning: $lowBatteryWarning[0].checked
        };

        localStorage.batteryColor = options.batteryColor;
        localStorage.hourColor = options.hourColor;
        localStorage.minuteColor = options.minuteColor;
        localStorage.secondsColor = options.secondsColor;
        localStorage.dateColor = options.dateColor;
        localStorage.mainBackgroundColor = options.mainBackgroundColor;
        localStorage.panelTextColor = options.panelTextColor;
        localStorage.panelBackgroundColor = options.panelBackgroundColor;
        localStorage.panelConfig = options.panelConfig;
        localStorage.fontType = options.fontType;
        localStorage.iconType = options.iconType;
        localStorage.timeSize = options.timeSize;
        localStorage.timeConfig = options.timeConfig;
        localStorage.timeSeparator = options.timeSeparator;
        localStorage.timeFormat = options.timeFormat;
        localStorage.dateFormat = options.dateFormat;
        localStorage.weatherUnit = options.weatherUnit;
        localStorage.weatherCheck = options.weatherCheck;
        localStorage.weatherSummary = options.weatherSummary;
        localStorage.weatherSource = options.weatherSource;
        localStorage.currentApi = options.currentApi;
        localStorage.oapiKey = options.oapiKey;
        localStorage.fapiKey = options.fapiKey;
        localStorage.wuapiKey = options.wuapiKey;
        localStorage.manualLocation = options.manualLocation;
        localStorage.showForecast = options.showForecast;
        localStorage.showBattery = options.showBattery;
        localStorage.btDisconnect = options.btDisconnect;
        localStorage.lowBatteryWarning = options.lowBatteryWarning;

        console.log('Got Options: ' + JSON.stringify(options));
        console.log('LocalStorage Contents: ' + JSON.stringify(localStorage));
        return options;
    }

    function getQueryParam(variable, defaultValue) {
        var query = location.search.substring(1);
        var vars = query.split('&');
        for(var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if(pair[0] === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return defaultValue || false;
    }
