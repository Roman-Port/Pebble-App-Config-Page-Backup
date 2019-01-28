function getQueryParam(variable, defaultValue) {
	var query = location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair[0] === variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	return defaultValue;
}
function loadConfigData() {
	$('#showSeconds'   )[0].checked = (localStorage.pblNtscShowSeconds    !== 'false');
	$('#showDayOfWeek' )[0].checked = (localStorage.pblNtscShowDayOfWeek  !== 'false');
	$('#showDayOfMonth')[0].checked = (localStorage.pblNtscShowDayOfMonth !== 'false');
	$('#showMonth'     )[0].checked = (localStorage.pblNtscShowMonth      !== 'false');
	$('#showAmpm'      )[0].checked = (localStorage.pblNtscShowAmpm       !== 'false');
	$('#showBluetooth' )[0].checked = (localStorage.pblNtscShowBluetooth  !== 'false');
	$('#showBattery'   )[0].checked = (localStorage.pblNtscShowBattery    !== 'false');
}
function saveConfigData() {
	localStorage.pblNtscShowSeconds    = $('#showSeconds'   )[0].checked;
	localStorage.pblNtscShowDayOfWeek  = $('#showDayOfWeek' )[0].checked;
	localStorage.pblNtscShowDayOfMonth = $('#showDayOfMonth')[0].checked;
	localStorage.pblNtscShowMonth      = $('#showMonth'     )[0].checked;
	localStorage.pblNtscShowAmpm       = $('#showAmpm'      )[0].checked;
	localStorage.pblNtscShowBluetooth  = $('#showBluetooth' )[0].checked;
	localStorage.pblNtscShowBattery    = $('#showBattery'   )[0].checked;
	var options = {
		showSeconds   : $('#showSeconds'   )[0].checked,
		showDayOfWeek : $('#showDayOfWeek' )[0].checked,
		showDayOfMonth: $('#showDayOfMonth')[0].checked,
		showMonth     : $('#showMonth'     )[0].checked,
		showAmpm      : $('#showAmpm'      )[0].checked,
		showBluetooth : $('#showBluetooth' )[0].checked,
		showBattery   : $('#showBattery'   )[0].checked
	};
	return options;
}
$('#saveButton').on('click', function() {
	var returnTo = getQueryParam('return_to', 'pebblejs://close#');
	document.location = returnTo + encodeURIComponent(JSON.stringify(saveConfigData()));
});
loadConfigData();