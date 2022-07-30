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
	switch (localStorage.pblPokeLoopSeamBehavior) {
		case '2': $('#loopSeamBehavior2')[0].checked = true; break;
		case '1': $('#loopSeamBehavior1')[0].checked = true; break;
		default : $('#loopSeamBehavior0')[0].checked = true; break;
	}
	$('#showSeconds')[0].checked = (localStorage.pblPokeShowSeconds !== 'false');
}
function saveConfigData() {
	var options = {
		loopSeamBehavior: (
			$('#loopSeamBehavior2')[0].checked ? 2 :
			$('#loopSeamBehavior1')[0].checked ? 1 :
			0
		),
		showSeconds: $('#showSeconds')[0].checked
	};
	localStorage.pblPokeLoopSeamBehavior = options.loopSeamBehavior;
	localStorage.pblPokeShowSeconds = options.showSeconds;
	return options;
}
$('#saveButton').on('click', function() {
	var returnTo = getQueryParam('return_to', 'pebblejs://close#');
	document.location = returnTo + encodeURIComponent(JSON.stringify(saveConfigData()));
});
loadConfigData();