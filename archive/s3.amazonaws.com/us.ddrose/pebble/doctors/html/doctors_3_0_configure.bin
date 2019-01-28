function storeIntResult(options, keyword) {
    var value = $("#" + keyword).val();
    value = parseInt(value, 10);
    if (!isNaN(value)) {
	options[keyword] = value;
    }
}
function storeStringResult(options, keyword) {
    var value = $("#" + keyword).val();
    if (value) {
	options[keyword] = value;
    }
}

var storeResults = [];

function makeOption(keyword, label, options, storeResult) {
    var role = "slider";
    if (options) {
	role = "select";
    } else {
	options = [[0, 'Off'], [1, 'On']];
    }
    if (!storeResult) {
	storeResult = storeIntResult;
    }
    storeResults.push([keyword, storeResult]);

    document.write('<div data-role="fieldcontain"><label for="' + keyword + '">' + label + '</label><select name="' + keyword + '" id="' + keyword + '" data-role="' + role + '">');
    var key = $.url().param(keyword);
    for (var oi in options) {
	if (key == options[oi][0]) {
	    document.write('<option value="' + options[oi][0] + '" selected>' + options[oi][1] + '</option>');
	} else {
	    document.write('<option value="' + options[oi][0] + '">' + options[oi][1] + '</option>');
	}
    }
    document.write('</select></div>');
};

makeOption("hurt", 'Include "War Doctor" at 8:30');
makeOption("show_hour", "Training wheels (show hours digits)");
makeOption("second_hand", "Blinking colon");
makeOption("show_date", "Show day/date");

// This list is duplicated in resources/make_lang.py.
var langs = [
    [ 'en_US', 'English' ],
    [ 'fr_FR', 'French' ],
    [ 'it_IT', 'Italian' ],
    [ 'es_ES', 'Spanish' ],
    [ 'pt_PT', 'Portuguese' ],
    [ 'de_DE', 'German' ],
    [ 'nl_NL', 'Dutch' ],
    [ 'da_DK', 'Danish' ],
    [ 'sv_SE', 'Swedish' ],
    [ 'is_IS' ,'Icelandic' ],
];

makeOption("display_lang", "Language for day", langs, storeStringResult);
makeOption("hour_buzzer", "Vibrate at each hour");
makeOption("bluetooth_buzzer", "Vibrate on disconnect");
makeOption("bluetooth_indicator", "Connection indicator",
	   [[0, 'Off'], [1, 'When needed'], [2, 'Always']]);
makeOption("battery_gauge", "Battery gauge",
	   [[0, 'Off'], [1, 'When needed'], [2, 'Always'], [3, 'Digital']]);

function saveOptions() {
    var options = {
    };

    for (var ri in storeResults) {
	var keyword = storeResults[ri][0];
	var storeResult = storeResults[ri][1];
	storeResult(options, keyword);
    }
    return options;
}
