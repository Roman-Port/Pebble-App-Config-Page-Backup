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
	$('#backgroundColor').val(localStorage.pblChromBackgroundColor || '#FFFFFF');
	$('#markerSet'      ).val(localStorage.pblChromMarkerSet       ||       '0');
	$('#showDayOfWeek' )[0].checked = (localStorage.pblChromShowDayOfWeek  !== 'false');
	$('#showDayOfMonth')[0].checked = (localStorage.pblChromShowDayOfMonth !== 'false');
	$('#showMonth'     )[0].checked = (localStorage.pblChromShowMonth      !== 'false');
	$('#showAmpm'      )[0].checked = (localStorage.pblChromShowAmpm       !== 'false');
	$('#showBluetooth' )[0].checked = (localStorage.pblChromShowBluetooth  !== 'false');
	$('#showBattery'   )[0].checked = (localStorage.pblChromShowBattery    !== 'false');
}
function saveConfigData() {
	localStorage.pblChromBackgroundColor = $('#backgroundColor').val();
	localStorage.pblChromMarkerSet       = $('#markerSet'      ).val();
	localStorage.pblChromShowDayOfWeek  = $('#showDayOfWeek' )[0].checked;
	localStorage.pblChromShowDayOfMonth = $('#showDayOfMonth')[0].checked;
	localStorage.pblChromShowMonth      = $('#showMonth'     )[0].checked;
	localStorage.pblChromShowAmpm       = $('#showAmpm'      )[0].checked;
	localStorage.pblChromShowBluetooth  = $('#showBluetooth' )[0].checked;
	localStorage.pblChromShowBattery    = $('#showBattery'   )[0].checked;
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