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
	$('#backgroundColor').val(localStorage.pblClassBackgroundColor || '#FFFFFF');
	$('#markerSet'      ).val(localStorage.pblClassMarkerSet       ||       '0');
	$('#showDayOfWeek' )[0].checked = (localStorage.pblClassShowDayOfWeek  !== 'false');
	$('#showDayOfMonth')[0].checked = (localStorage.pblClassShowDayOfMonth !== 'false');
	$('#showMonth'     )[0].checked = (localStorage.pblClassShowMonth      !== 'false');
	$('#showAmpm'      )[0].checked = (localStorage.pblClassShowAmpm       !== 'false');
	$('#showBluetooth' )[0].checked = (localStorage.pblClassShowBluetooth  !== 'false');
	$('#showBattery'   )[0].checked = (localStorage.pblClassShowBattery    !== 'false');
}
function saveConfigData() {
	localStorage.pblClassBackgroundColor = $('#backgroundColor').val();
	localStorage.pblClassMarkerSet       = $('#markerSet'      ).val();
	localStorage.pblClassShowDayOfWeek  = $('#showDayOfWeek' )[0].checked;
	localStorage.pblClassShowDayOfMonth = $('#showDayOfMonth')[0].checked;
	localStorage.pblClassShowMonth      = $('#showMonth'     )[0].checked;
	localStorage.pblClassShowAmpm       = $('#showAmpm'      )[0].checked;
	localStorage.pblClassShowBluetooth  = $('#showBluetooth' )[0].checked;
	localStorage.pblClassShowBattery    = $('#showBattery'   )[0].checked;
	var options = {
		backgroundColor: parseInt($('#backgroundColor').val().replace(/^(#|0x)/, ''), 16),
		markerSet      : parseInt($('#markerSet'      ).val()                       , 10),
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