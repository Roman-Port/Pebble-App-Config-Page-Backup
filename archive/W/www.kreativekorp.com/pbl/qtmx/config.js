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
	$('#backgroundColor').val(localStorage.pblQtmxBackgroundColor || '#FFFFFF');
	$('#showDayOfWeek' )[0].checked = (localStorage.pblQtmxShowDayOfWeek  !== 'false');
	$('#showDayOfMonth')[0].checked = (localStorage.pblQtmxShowDayOfMonth !== 'false');
	$('#showMonth'     )[0].checked = (localStorage.pblQtmxShowMonth      !== 'false');
	$('#showAmpm'      )[0].checked = (localStorage.pblQtmxShowAmpm       !== 'false');
	$('#showBluetooth' )[0].checked = (localStorage.pblQtmxShowBluetooth  !== 'false');
	$('#showBattery'   )[0].checked = (localStorage.pblQtmxShowBattery    !== 'false');
}
function saveConfigData() {
	localStorage.pblQtmxBackgroundColor = $('#backgroundColor').val();
	localStorage.pblQtmxShowDayOfWeek  = $('#showDayOfWeek' )[0].checked;
	localStorage.pblQtmxShowDayOfMonth = $('#showDayOfMonth')[0].checked;
	localStorage.pblQtmxShowMonth      = $('#showMonth'     )[0].checked;
	localStorage.pblQtmxShowAmpm       = $('#showAmpm'      )[0].checked;
	localStorage.pblQtmxShowBluetooth  = $('#showBluetooth' )[0].checked;
	localStorage.pblQtmxShowBattery    = $('#showBattery'   )[0].checked;
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