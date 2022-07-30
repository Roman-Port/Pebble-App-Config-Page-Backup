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
	$('#backgroundColor').val(localStorage.pblPrismBackgroundColor || '#FFFFFF');
	$('#showDayOfWeek' )[0].checked = (localStorage.pblPrismShowDayOfWeek  !== 'false');
	$('#showDayOfMonth')[0].checked = (localStorage.pblPrismShowDayOfMonth !== 'false');
	$('#showMonth'     )[0].checked = (localStorage.pblPrismShowMonth      !== 'false');
	$('#showAmpm'      )[0].checked = (localStorage.pblPrismShowAmpm       !== 'false');
	$('#showBluetooth' )[0].checked = (localStorage.pblPrismShowBluetooth  !== 'false');
	$('#showBattery'   )[0].checked = (localStorage.pblPrismShowBattery    !== 'false');
}
function saveConfigData() {
	localStorage.pblPrismBackgroundColor = $('#backgroundColor').val();
	localStorage.pblPrismShowDayOfWeek  = $('#showDayOfWeek' )[0].checked;
	localStorage.pblPrismShowDayOfMonth = $('#showDayOfMonth')[0].checked;
	localStorage.pblPrismShowMonth      = $('#showMonth'     )[0].checked;
	localStorage.pblPrismShowAmpm       = $('#showAmpm'      )[0].checked;
	localStorage.pblPrismShowBluetooth  = $('#showBluetooth' )[0].checked;
	localStorage.pblPrismShowBattery    = $('#showBattery'   )[0].checked;
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