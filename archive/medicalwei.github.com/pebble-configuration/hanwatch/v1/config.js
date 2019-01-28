/*
 * Chinese Watch configuration page
 * (C) 2015 Ming-ting Yao Wei
 */

var StorageName = "HanWatch";
var DefaultSettings = {
	white_on_black: false,
	vibrate_on_disconnect: true
};
var return_to = "pebblejs://close#";

$(function(){
	var settings = window.localStorage.getItem(StorageName);
	if(!settings) {
		settings = DefaultSettings;
	} else {
		settings = JSON.parse(settings);
	}
	$("#white_on_black").prop('checked', settings.white_on_black);
	$("#vibrate_on_disconnect").prop('checked', settings.vibrate_on_disconnect);

	var query = location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (pair[0] === "return_to"){
			return_to = decodeURIComponent(pair[1]);
			break;
		}
	}
});

$("#settings").submit(function(event){
	var settings = {
		white_on_black: $("#white_on_black").prop('checked')?1:0,
		vibrate_on_disconnect: $("#vibrate_on_disconnect").prop('checked')?1:0
	};
	window.localStorage.setItem(StorageName, JSON.stringify(settings));

  var watchSettings = {
    "1": settings.white_on_black,
    "2": settings.vibrate_on_disconnect
  }
	document.location = return_to + encodeURIComponent(JSON.stringify(watchSettings));
	event.preventDefault();
});

$("#cancelButton").click(function(event){
	var settings = JSON.stringify({cancel: true});
	document.location = return_to + encodeURIComponent(settings);
});
