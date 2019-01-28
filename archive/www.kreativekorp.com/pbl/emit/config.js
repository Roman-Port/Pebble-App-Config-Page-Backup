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
	$('#backgroundColor').val(localStorage.pblEmitBackgroundColor || '#FFFFFF');
	$('#showDayOfWeek' )[0].checked = (localStorage.pblEmitShowDayOfWeek  !== 'false');
	$('#showDayOfMonth')[0].checked = (localStorage.pblEmitShowDayOfMonth !== 'false');
	$('#showMonth'     )[0].checked = (localStorage.pblEmitShowMonth      !== 'false');
	$('#showAmpm'      )[0].checked = (localStorage.pblEmitShowAmpm       !== 'false');
	$('#showBluetooth' )[0].checked = (localStorage.pblEmitShowBluetooth  !== 'false');
	$('#showBattery'   )[0].checked = (localStorage.pblEmitShowBattery    !== 'false');
}
function saveConfigData() {
	localStorage.pblEmitBackgroundColor = $('#backgroundColor').val();
	localStorage.pblEmitShowDayOfWeek  = $('#showDayOfWeek' )[0].checked;
	localStorage.pblEmitShowDayOfMonth = $('#showDayOfMonth')[0].checked;
	localStorage.pblEmitShowMonth      = $('#showMonth'     )[0].checked;
	localStorage.pblEmitShowAmpm       = $('#showAmpm'      )[0].checked;
	localStorage.pblEmitShowBluetooth  = $('#showBluetooth' )[0].checked;
	localStorage.pblEmitShowBattery    = $('#showBattery'   )[0].checked;
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