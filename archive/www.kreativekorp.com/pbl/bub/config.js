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
	$('#backgroundColor').val(localStorage.pblBubBackgroundColor || '#FFFFFF');
	$('#showDayOfWeek' )[0].checked = (localStorage.pblBubShowDayOfWeek  !== 'false');
	$('#showDayOfMonth')[0].checked = (localStorage.pblBubShowDayOfMonth !== 'false');
	$('#showMonth'     )[0].checked = (localStorage.pblBubShowMonth      !== 'false');
	$('#showAmpm'      )[0].checked = (localStorage.pblBubShowAmpm       !== 'false');
	$('#showBluetooth' )[0].checked = (localStorage.pblBubShowBluetooth  !== 'false');
	$('#showBattery'   )[0].checked = (localStorage.pblBubShowBattery    !== 'false');
}
function saveConfigData() {
	localStorage.pblBubBackgroundColor = $('#backgroundColor').val();
	localStorage.pblBubShowDayOfWeek  = $('#showDayOfWeek' )[0].checked;
	localStorage.pblBubShowDayOfMonth = $('#showDayOfMonth')[0].checked;
	localStorage.pblBubShowMonth      = $('#showMonth'     )[0].checked;
	localStorage.pblBubShowAmpm       = $('#showAmpm'      )[0].checked;
	localStorage.pblBubShowBluetooth  = $('#showBluetooth' )[0].checked;
	localStorage.pblBubShowBattery    = $('#showBattery'   )[0].checked;
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