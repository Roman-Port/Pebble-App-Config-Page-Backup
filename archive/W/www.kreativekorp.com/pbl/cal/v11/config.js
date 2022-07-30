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
	$('#backgroundColor').val(localStorage.pblCalBackgroundColor || '#FFFFFF');
	$('#leadingZero')[0].checked = (localStorage.pblCalLeadingZero === 'true');
	$('#redSundays')[0].checked = (localStorage.pblCalRedSundays === 'true');
	$('#startOnMonday')[0].checked = (localStorage.pblCalStartOnMonday === 'true');
	$('#showSeconds')[0].checked = (localStorage.pblCalShowSeconds !== 'false');
	$('#largeFont')[0].checked = (localStorage.pblCalLargeFont === 'true');
}
function saveConfigData() {
	localStorage.pblCalBackgroundColor = $('#backgroundColor').val();
	localStorage.pblCalLeadingZero = $('#leadingZero')[0].checked;
	localStorage.pblCalRedSundays = $('#redSundays')[0].checked;
	localStorage.pblCalStartOnMonday = $('#startOnMonday')[0].checked;
	localStorage.pblCalShowSeconds = $('#showSeconds')[0].checked;
	localStorage.pblCalLargeFont = $('#largeFont')[0].checked;
	var options = {
		backgroundColor: parseInt($('#backgroundColor').val().replace(/^(#|0x)/, ''), 16),
		leadingZero: $('#leadingZero')[0].checked,
		redSundays: $('#redSundays')[0].checked,
		startOnMonday: $('#startOnMonday')[0].checked,
		showSeconds: $('#showSeconds')[0].checked,
		largeFont: $('#largeFont')[0].checked
	};
	return options;
}
$('#saveButton').on('click', function() {
	var returnTo = getQueryParam('return_to', 'pebblejs://close#');
	document.location = returnTo + encodeURIComponent(JSON.stringify(saveConfigData()));
});
loadConfigData();