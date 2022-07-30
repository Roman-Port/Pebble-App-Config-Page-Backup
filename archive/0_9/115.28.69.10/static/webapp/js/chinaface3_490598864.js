var submitButton = document.getElementById('submit_button');
var vibrationSelect = document.getElementById('vibration_period');
var notAlertCheckbox = document.getElementById('not_alert');
var countday_check = document.getElementById('countday_check');
var note_check = document.getElementById('note_check');
var today_weather_check = document.getElementById('today_weather_check');
var weather_station = document.getElementById('weather_station');
var health_check = document.getElementById('health_check');
var switch_bw_check = document.getElementById('switch_bw_check');
var tap_check = document.getElementById('tap_check');

var health_steps = document.getElementById('health_steps');
var health_time = document.getElementById('health_time');
var health_distance = document.getElementById('health_distance');
var health_calories = document.getElementById('health_calories');
var health_sleep_time = document.getElementById('health_sleep_time');
var health_deep_sleep_time = document.getElementById('health_deep_sleep_time');

function set_switch_bw_check(switch_bw_check_value) {
  if (switch_bw_check_value == 'True') {
    $('#switch_bw_check').prop('checked', true);
    $('#bw_color_label').show();
    $('#color_label').hide();
  } else {
    $('#switch_bw_check').prop('checked', false);
    $('#bw_color_label').hide();
    $('#color_label').show();
  } 
}

function set_tap_check(tap_check_value) {
  if (tap_check_value == 'True') {
    $('#shake_sens_label').show();
  } else {
    $('#shake_sens_label').hide();
  }
}

function set_info_window_check(countday_check_value, note_check_value, today_weather_check_value, health_check_value) {
  if (countday_check_value == 'True') {
    $('#countday_check').prop('checked', true);
    show_countday();
    hide_note();
    hide_health();
    $('#note_check').prop("checked", false);
    $('#today_weather_check').prop("checked", false);
    $('#health_check').prop('checked', false);
  } else {
    $('#countday_check').prop('checked', false);
  }

  if (note_check_value == 'True') {
    $('#note_check').prop('checked', true);
    show_note();
    hide_countday();
    hide_health();
    $('#countday_check').prop("checked", false);
    $('#today_weather_check').prop("checked", false);
    $('#health_check').prop('checked', false);
  } else {
    $('#note_check').prop('checked', false);
  }

  if (today_weather_check_value == 'True') {
    $('#today_weather_check').prop('checked', true);
    hide_countday();
    hide_note();
    hide_health();
    $('#countday_check').prop("checked", false);
    $('#note_check').prop("checked", false);
    $('#health_check').prop('checked', false);
  } else {
    $('#today_weather_check').prop('checked', false);
  }

  if (health_check_value == 'True') {
    $('#health_check').prop('checked', true);
    show_health();
    hide_countday();
    hide_note();
    $('#note_check').prop('checked', false);
    $('#countday_check').prop("checked", false);
    $('#today_weather_check').prop("checked", false);
  } else {
    $('#health_check').prop('checked', false);
  }
}

function set_countday_type_value(countday_type) {
  $('#countday_type').val(countday_type);
}

function set_weather_station(weather_station) {
  $('#weather_station').val(weather_station);
  if (weather_station == 'G') {
    $('#station_notice').text('不想GPS自动定位,请输入你的英文城市名(比如:newyork),否则保留空白');
  } else {
    $('#station_notice').text('不想GPS自动定位,请输入你的中文城市名(比如:成都),否则保留空白');
  }
}

function set_health_value_check(health_value) {
  if (health_value.indexOf('M') > -1) {
    $('#health_steps').prop('checked', true);
  }
  if (health_value.indexOf('T') > -1) {
    $('#health_time').prop('checked', true);
  }
  if (health_value.indexOf('D') > -1) {
    $('#health_distance').prop('checked', true);
  }
  if (health_value.indexOf('C') > -1) {
    $('#health_calories').prop('checked', true);
  }
  if (health_value.indexOf('S') > -1) {
    $('#health_sleep_time').prop('checked', true);
  }
  if (health_value.indexOf('L') > -1) {
    $('#health_deep_sleep_time').prop('checked', true);
  }
}

function set_alert_value(vibration_period, not_alert, not_alert_start, not_alert_end) {
  if (not_alert == 'True') {
    $('#not_alert').prop("checked", true);
  } else {
    $('#not_alert').prop("checked", false);
  }

  $('#vibration_period').val(vibration_period);
  $('#not_alert').attr("checked", not_alert);
  $('#not_alert_start').val(not_alert_start);
  $('#not_alert_end').val(not_alert_end);
  
  if ($('#vibration_period').val() == 0) {
    hide_alert();
    return ;
  } 

  if ($('#not_alert').prop('checked') == true) {
    $('#not_alert_label').show();
    $('#not_alert_start_label').show();
    $('#not_alert_end_label').show();
  } else {
    $('#not_alert_label').show();
    $('#not_alert_start_label').hide();
    $('#not_alert_end_label').hide();
  }
}

function hide_alert() {
  $('#not_alert_label').hide();
  $('#not_alert_start_label').hide();
  $('#not_alert_end_label').hide();
}

function show_alert() {
  $('#not_alert_label').show();
  
  var notAlertChecked = $('#not_alert').prop('checked');
  if (notAlertChecked) {
    $('#not_alert_start_label').show();
    $('#not_alert_end_label').show();
  }
}

function show_health() {
  $('#health_steps_label').show();
  $('#health_time_label').show();
  $('#health_distance_label').show();
  $('#health_calories_label').show();
  $('#health_sleep_time_label').show();
  $('#health_deep_sleep_time_label').show();
}

function hide_health() {
  $('#health_steps_label').hide();
  $('#health_time_label').hide();
  $('#health_distance_label').hide();
  $('#health_calories_label').hide();
  $('#health_sleep_time_label').hide();
  $('#health_deep_sleep_time_label').hide();
}

function get_health_value() {
  var health_steps_value = $('#health_steps').prop('checked');
  var health_time_value = $('#health_time').prop('checked');
  var health_distance_value = $('#health_distance').prop('checked');
  var health_calories_value = $('#health_calories').prop('checked');
  var health_sleep_time_value = $('#health_sleep_time').prop('checked');
  var health_deep_sleep_time_value = $('#health_deep_sleep_time').prop('checked');

  var health_value = '';
  if (health_steps_value == true) {
    health_value += 'M';
  } 
  if (health_time_value == true) {
    health_value += 'T';
  } 
  if (health_distance_value == true) {
    health_value += 'D';
  } 
  if (health_calories_value == true) {
    health_value += 'C';
  } 
  if (health_sleep_time_value == true) {
    health_value += 'S';
  } 
  if (health_deep_sleep_time_value == true) {
    health_value += 'L';
  } 
  return health_value;
}

function show_countday() {
  $('#mydate_name_div').show();
  $('#mydate_div').show();
  $('#mytime_div').show();
  $('#countday_type_div').show();
}

function hide_countday() {
  $('#mydate_name_div').hide();
  $('#mydate_div').hide();
  $('#mytime_div').hide();
  $('#countday_type_div').hide();
}

function show_note() {
  $('#mytxt1_div').show();
  $('#mytxt2_div').show();
}

function hide_note() {
  $('#mytxt1_div').hide();
  $('#mytxt2_div').hide();
}

function check_health_count(change_src_id) {
  var health_steps_value = $('#health_steps').prop('checked');
  var health_time_value = $('#health_time').prop('checked');
  var health_distance_value = $('#health_distance').prop('checked');
  var health_calories_value = $('#health_calories').prop('checked');
  var health_sleep_time_value = $('#health_sleep_time').prop('checked');
  var health_deep_sleep_time_value = $('#health_deep_sleep_time').prop('checked');

  var health_count = 0;
  if (health_steps_value == true) {
    health_count++;
  } 
  if (health_time_value == true) {
    health_count++;
  } 
  if (health_distance_value == true) {
    health_count++;
  } 
  if (health_calories_value == true) {
    health_count++;
  } 
  if (health_sleep_time_value == true) {
    health_count++;
  } 
  if (health_deep_sleep_time_value == true) {
    health_count++;
  } 

  if (health_count > 2) {
    alert('只能任选两个健康值显示');
    $('#' + change_src_id).prop('checked', false);
  }
}

function verify_health_count() {
  if ($('#health_check').prop('checked') == false) {
    return true;
  }

  var health_steps_value = $('#health_steps').prop('checked');
  var health_time_value = $('#health_time').prop('checked');
  var health_distance_value = $('#health_distance').prop('checked');
  var health_calories_value = $('#health_calories').prop('checked');
  var health_sleep_time_value = $('#health_sleep_time').prop('checked');
  var health_deep_sleep_time_value = $('#health_deep_sleep_time').prop('checked');

  var health_count = 0;
  if (health_steps_value == true) {
    health_count++;
  } 
  if (health_time_value == true) {
    health_count++;
  } 
  if (health_distance_value == true) {
    health_count++;
  } 
  if (health_calories_value == true) {
    health_count++;
  } 
  if (health_sleep_time_value == true) {
    health_count++;
  } 
  if (health_deep_sleep_time_value == true) {
    health_count++;
  } 

  if (health_count < 2) {
    alert('请选择两个健康值显示');
    return false;
  }
  return true;
}


health_steps.addEventListener('change', function() {
  check_health_count('health_steps');
});

health_time.addEventListener('change', function() {
  check_health_count('health_time');
});

health_distance.addEventListener('change', function() {
  check_health_count('health_distance');
});

health_calories.addEventListener('change', function() {
  check_health_count('health_calories');
});

health_sleep_time.addEventListener('change', function() {
  check_health_count('health_sleep_time');
});

health_deep_sleep_time.addEventListener('change', function() {
  check_health_count('health_deep_sleep_time');
});

weather_station.addEventListener('change', function() {
  var weather_station = $('#weather_station').val();
  set_weather_station(weather_station);
});

countday_check.addEventListener('change', function() {
  if ($('#countday_check').prop('checked') == true) {
    show_countday();
    hide_note();
    hide_health();
    $('#note_check').prop("checked", false);
    $('#today_weather_check').prop("checked", false);
    $('#health_check').prop("checked", false);
  } else {
    hide_countday();
  }
});


note_check.addEventListener('change', function() {
  if ($('#note_check').prop('checked') == true) {
    show_note();
    hide_countday();
    hide_health();
    $('#countday_check').prop("checked", false);
    $('#today_weather_check').prop("checked", false);
    $('#health_check').prop("checked", false);
  } else {
    hide_note();
  }
});

today_weather_check.addEventListener('change', function() {
  if ($('#today_weather_check').prop('checked') == true) {
    hide_countday();
    hide_note();
    hide_health();
    $('#countday_check').prop("checked", false);
    $('#note_check').prop("checked", false);
    $('#health_check').prop("checked", false);
  } else {
  }
});

health_check.addEventListener('change', function() {
  if ($('#health_check').prop('checked') == true) {
    hide_countday();
    hide_note();
    show_health();
    $('#countday_check').prop("checked", false);
    $('#note_check').prop("checked", false);
    $('#today_weather_check').prop("checked", false);
  } else {
    hide_health();
  }
});



vibrationSelect.addEventListener('change', function() {
  var vibration_period = $('#vibration_period').val();
  if (vibration_period == '0') {
    hide_alert();
  } else {
    show_alert();
  }
});

notAlertCheckbox.addEventListener('change', function() {
  var notAlertChecked = $('#not_alert').prop('checked');
  if (notAlertChecked) {
    $('#not_alert_start_label').show();
    $('#not_alert_end_label').show();
  } else {
    $('#not_alert_start_label').hide();
    $('#not_alert_end_label').hide();
  }
});

switch_bw_check.addEventListener('change', function() {
  var switch_bw_check_value = $('#switch_bw_check').prop('checked');
  if (switch_bw_check_value) {
    $('#bw_color_label').show();
    $('#color_label').hide();
  } else {
    $('#bw_color_label').hide();
    $('#color_label').show();
  }
});

tap_check.addEventListener('change', function() {
  var tap_check_checked = $('#tap_check').prop('checked');
  if (tap_check_checked) {
    $('#shake_sens_label').show();
  } else {
    $('#shake_sens_label').hide();
  }
});

submitButton.addEventListener('click', function() {
  if (!verify_health_count()) {
    return false;
  }

  // Some example configuration values
  var config = {
    'watchid': $.trim($('#watchid').text()),
    'city_name': $.trim($('#city_name').val()),
    'watch_style': $('#watch_style').val(),
    'vibration_period': $('#vibration_period').val(),
    'not_alert': $('#not_alert').prop('checked'),
    'not_alert_start': $('#not_alert_start').val(),
    'not_alert_end': $('#not_alert_end').val(),
    'invert_color': $('#invert_color').val(),
    'bluetooth_alert': $('#bluetooth_alert').prop('checked'),
    'watch_color': $('#watch_color').val(),

    'countday_check': $('#countday_check').prop('checked'),
    'mydate_name': $('#mydate_name').val(),
    'mydate': $('#mydate').val(),
    'mytime': $('#mytime').val(),
    'countday_type': $('#countday_type').val(),

    'note_check': $('#note_check').prop('checked'),
    'mytxt1': $('#mytxt1').val(),
    'mytxt2': $('#mytxt2').val(),
    
    'today_weather_check': $('#today_weather_check').prop('checked'),
    'tap_check': $('#tap_check').prop('checked'),
    'hour24_check': $('#hour24_check').prop('checked'),
    'timeline_news_check': $('#timeline_news_check').prop('checked'),
    'timeline_english_check': $('#timeline_english_check').prop('checked'),
    'timeline_zhongchao_check': $('#timeline_zhongchao_check').prop('checked'),
    'timeline_huangli_check': $('#timeline_huangli_check').prop('checked'),
    'weather_station': $('#weather_station').val(),

    'health_check': $('#health_check').prop('checked'),
    'health_value': get_health_value(),
    'switch_bw_check': $('#switch_bw_check').prop('checked'),

    'shake_sens': $('#shake_sens_sel').val(),
    'show_second_check': $('#show_second_check').prop('checked'),
  };

  $.ajax({ 
  	type: "GET",
	   url: "/webapp/chinaface3_save?data=" + encodeURIComponent(JSON.stringify(config)),
  	context: document.body, 
  	success: function(){
  		// Return data to watchapp
  		location.href = 'pebblejs://close#' + 
   		encodeURIComponent(JSON.stringify(config));
   }});
});