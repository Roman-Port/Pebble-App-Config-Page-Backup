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
	$('#backgroundColor').val(localStorage.pblYryrBackgroundColor || '#FFFFFF');
	$('#showDayOfWeek' )[0].checked = (localStorage.pblYryrShowDayOfWeek  !== 'false');
	$('#showDayOfMonth')[0].checked = (localStorage.pblYryrShowDayOfMonth !== 'false');
	$('#showMonth'     )[0].checked = (localStorage.pblYryrShowMonth      !== 'false');
	$('#showAmpm'      )[0].checked = (localStorage.pblYryrShowAmpm       !== 'false');
	$('#showBluetooth' )[0].checked = (localStorage.pblYryrShowBluetooth  !== 'false');
	$('#showBattery'   )[0].checked = (localStorage.pblYryrShowBattery    !== 'false');
}
function saveConfigData() {
	localStorage.pblYryrBackgroundColor = $('#backgroundColor').val();
	localStorage.pblYryrShowDayOfWeek  = $('#showDayOfWeek' )[0].checked;
	localStorage.pblYryrShowDayOfMonth = $('#showDayOfMonth')[0].checked;
	localStorage.pblYryrShowMonth      = $('#showMonth'     )[0].checked;
	localStorage.pblYryrShowAmpm       = $('#showAmpm'      )[0].checked;
	localStorage.pblYryrShowBluetooth  = $('#showBluetooth' )[0].checked;
	localStorage.pblYryrShowBattery    = $('#showBattery'   )[0].checked;
	var options = {
		backgroundColor: parseInt($('#backgroundColor').val().replace(/^(#|0x)/, ''), 16),
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