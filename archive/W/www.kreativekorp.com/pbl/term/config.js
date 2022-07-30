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
	$('#backgroundColor').val(localStorage.pblTermBackgroundColor || '#000000');
	$('#textColor').val(localStorage.pblTermTextColor || '#00FF00');
	$('#boldFont')[0].checked = (localStorage.pblTermBoldFont !== 'false');
	$('#dateFormat1').val(localStorage.pblTermDateFormat1 || '%c');
	$('#dateFormat2').val(localStorage.pblTermDateFormat2 || '%s');
}
function saveConfigData() {
	localStorage.pblTermBackgroundColor = $('#backgroundColor').val();
	localStorage.pblTermTextColor = $('#textColor').val();
	localStorage.pblTermBoldFont = $('#boldFont')[0].checked;
	localStorage.pblTermDateFormat1 = $('#dateFormat1').val();
	localStorage.pblTermDateFormat2 = $('#dateFormat2').val();
	var options = {
		backgroundColor: parseInt($('#backgroundColor').val().replace(/^(#|0x)/, ''), 16),
		textColor: parseInt($('#textColor').val().replace(/^(#|0x)/, ''), 16),
		boldFont: $('#boldFont')[0].checked,
		dateFormat1: $('#dateFormat1').val(),
		dateFormat2: $('#dateFormat2').val()
	};
	return options;
}
$('#saveButton').on('click', function() {
	var returnTo = getQueryParam('return_to', 'pebblejs://close#');
	document.location = returnTo + encodeURIComponent(JSON.stringify(saveConfigData()));
});
loadConfigData();