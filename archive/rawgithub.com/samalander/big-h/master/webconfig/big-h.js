$(document).ready(function() {
	$('#save').click(function() {
		var settings = new Object();
		settings.saved = true;
		settings.weekday_format = 0 || $('div#weekday_format input[name="weekday_format"]:checked').val();
		settings.vibrate_on_hour = $('#vibrate_on_hour_field:checked').length;
		settings.display_seconds = $('#display_seconds_field:checked').length;
		settings.leading_zero = $('#leading_zero_field:checked').length;
		settings.weekday_first_day = 0 || $('div#weekday_first_day input[name="weekday_first_day"]:checked').val();
		settings.date_format = $('#date_format_default:checked').length == 1 ? '' : $('div#date_format_custom_set option:selected').map(function() {return $(this).val()}).get().join('');
		settings.display_battery = $('#display_battery_field:checked').length;
		window.location.href = "pebblejs://close#" + encodeURIComponent(JSON.stringify(settings));
	});
	$('#cancel').click(function() {
		window.location.href = "pebblejs://close";
	});
	$('div#weekday_format input[name="weekday_format"]').click(function() {
		if ($(this).val() == 0) {
			$('div#weekday_first_day').collapsible('expand');
		}
		else {
			$('div#weekday_first_day').collapsible('collapse');
		}
	});
	$('div#date_format input[type="radio"]').click(function() {
		if ($(this).val() != 0) {
			$('div#date_format_custom_set').collapsible('expand');
		}
		else {
			$('div#date_format_custom_set').collapsible('collapse');
		}
	});
});