// config page js
function getConfigData() {
	var colorTheme = $("input[name=colorTheme]:checked");
	var secondsHand = $("input[name=secondsHand]:checked");
	//var highContrastCheckbox = $("#high_contrast_checkbox");

	var options = {
		//"watch_face_checkbox": backgroundColorPicker.value,
		"color_theme": colorTheme.val(),
		"seconds_hand": secondsHand.val()
	};

	// Save for next launch
	//localStorage["background_color"] = options["background_color"];
	localStorage["color_theme"] = options["color_theme"];
	localStorage["seconds_hand"] = options["seconds_hand"];

	console.log("Got options: " + JSON.stringify(options));
	return options;
}

function getQueryParam(variable, defaultValue) {
	var query = location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] === variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	return defaultValue || false;
}

var $submitButton = $("#submit_button");
$submitButton.on("click", function() {
	console.log("Submit");

	// Set the return URL depending on the runtime environment
	var return_to = getQueryParam("return_to", "pebblejs://close#");
	document.location = return_to + encodeURIComponent(JSON.stringify(getConfigData()));
});

(function() {
	//var backgroundColorPicker = $("#background_color_picker");
	var colorTheme = $("input[name=colorTheme]");
	var secondsHand = $("input[name=secondsHand]");

	// Load any previously saved configuration, if available
	if(localStorage["color_theme"]) {	
		//console.log("Saved theme: " + localStorage["color_theme"]);
		//colorTheme.value = JSON.parse(localStorage["color_theme"]);
		$("input[name=colorTheme][value=" + localStorage["color_theme"] + "]").prop("checked",true);
		//backgroundColorPicker.value = localStorage["background_color"];
	}
	if(localStorage["seconds_hand"]) {	
		//console.log("Saved theme: " + localStorage["color_theme"]);
		//colorTheme.value = JSON.parse(localStorage["color_theme"]);
		$("input[name=secondsHand]").prop("checked",true);
		//backgroundColorPicker.value = localStorage["background_color"];
	}
})();