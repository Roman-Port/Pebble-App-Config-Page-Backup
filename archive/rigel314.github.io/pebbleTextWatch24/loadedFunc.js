function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function loadedFunc() {
	if (getParameterByName('datevar')) {
		document.getElementById('dateVar').checked = true;
	}

	if (getParameterByName('ohvar') == 1) {
		document.getElementById('ohVar1').checked = true;
	}

	if (getParameterByName('ohvar') == 2) {
		document.getElementById('ohVar2').checked = true;
	}
}
