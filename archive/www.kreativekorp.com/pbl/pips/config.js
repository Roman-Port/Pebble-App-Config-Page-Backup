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
	$('#backgroundColor').val(localStorage.pblPipsBackgroundColor || '#000000');
	$('#diceColor').val(localStorage.pblPipsDiceColor || '#FFFFFF');
	$('#easternStyle')[0].checked = (localStorage.pblPipsEasternStyle === 'true');
}
function saveConfigData() {
	localStorage.pblPipsBackgroundColor = $('#backgroundColor').val();
	localStorage.pblPipsDiceColor = $('#diceColor').val();
	localStorage.pblPipsEasternStyle = $('#easternStyle')[0].checked;
	var options = {
		backgroundColor: parseInt($('#backgroundColor').val().replace(/^(#|0x)/, ''), 16),
		diceColor: parseInt($('#diceColor').val().replace(/^(#|0x)/, ''), 16),
		easternStyle: $('#easternStyle')[0].checked
	};
	return options;
}
$('#saveButton').on('click', function() {
	var returnTo = getQueryParam('return_to', 'pebblejs://close#');
	document.location = returnTo + encodeURIComponent(JSON.stringify(saveConfigData()));
});
loadConfigData();