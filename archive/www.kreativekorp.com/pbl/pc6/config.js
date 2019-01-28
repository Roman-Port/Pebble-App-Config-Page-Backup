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
	$('#dateFormat').val(localStorage.pblPc6DateFormat || '0');
	$('#leadingZeroDate')[0].checked = (localStorage.pblPc6LeadingZeroDate === 'true');
	$('#leadingZeroTime')[0].checked = (localStorage.pblPc6LeadingZeroTime === 'true');
	$('#showSeconds')[0].checked = (localStorage.pblPc6ShowSeconds !== 'false');
}
function saveConfigData() {
	var options = {
		dateFormat: parseInt($('#dateFormat').val(), 10),
		leadingZeroDate: $('#leadingZeroDate')[0].checked,
		leadingZeroTime: $('#leadingZeroTime')[0].checked,
		showSeconds: $('#showSeconds')[0].checked
	};
	localStorage.pblPc6DateFormat = options.dateFormat;
	localStorage.pblPc6LeadingZeroDate = options.leadingZeroDate;
	localStorage.pblPc6LeadingZeroTime = options.leadingZeroTime;
	localStorage.pblPc6ShowSeconds = options.showSeconds;
	return options;
}
$('#saveButton').on('click', function() {
	var returnTo = getQueryParam('return_to', 'pebblejs://close#');
	document.location = returnTo + encodeURIComponent(JSON.stringify(saveConfigData()));
});
loadConfigData();