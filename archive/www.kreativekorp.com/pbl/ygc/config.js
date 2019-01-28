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
	$('#backgroundColor').val(localStorage.pblYgcBackgroundColor || '#FFFFFF');
	$('#showDayOfWeek' )[0].checked = (localStorage.pblYgcShowDayOfWeek  !== 'false');
	$('#showDayOfMonth')[0].checked = (localStorage.pblYgcShowDayOfMonth !== 'false');
	$('#showMonth'     )[0].checked = (localStorage.pblYgcShowMonth      !== 'false');
	$('#showAmpm'      )[0].checked = (localStorage.pblYgcShowAmpm       !== 'false');
	$('#showBluetooth' )[0].checked = (localStorage.pblYgcShowBluetooth  !== 'false');
	$('#showBattery'   )[0].checked = (localStorage.pblYgcShowBattery    !== 'false');
}
function saveConfigData() {
	localStorage.pblYgcBackgroundColor = $('#backgroundColor').val();
	localStorage.pblYgcShowDayOfWeek  = $('#showDayOfWeek' )[0].checked;
	localStorage.pblYgcShowDayOfMonth = $('#showDayOfMonth')[0].checked;
	localStorage.pblYgcShowMonth      = $('#showMonth'     )[0].checked;
	localStorage.pblYgcShowAmpm       = $('#showAmpm'      )[0].checked;
	localStorage.pblYgcShowBluetooth  = $('#showBluetooth' )[0].checked;
	localStorage.pblYgcShowBattery    = $('#showBattery'   )[0].checked;
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