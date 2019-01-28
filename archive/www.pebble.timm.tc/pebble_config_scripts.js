var colors = [
	{text: "Black", value: "000000", color: "#ffffff"},
	{text: "Oxford Blue", value: "000055", color: "#ffffff"},
	{text: "Duke Blue", value: "0000aa", color: "#ffffff"},
	{text: "Blue", value: "0000ff", color: "#ffffff"},
	{text: "Dark Green", value: "005500", color: "#ffffff"},
	{text: "Midnight Green", value: "005555", color: "#ffffff"},
	{text: "Cobalt Blue", value: "0055aa", color: "#ffffff"},
	{text: "Blue Moon", value: "0055ff", color: "#ffffff"},
	{text: "Bulgarian Rose", value: "550000", color: "#ffffff"},
	{text: "Imperial Purple", value: "550055", color: "#ffffff"},
	{text: "Indigo", value: "5500aa", color: "#ffffff"},
	{text: "Electric Ultramarine", value: "5500ff", color: "#ffffff"},
	{text: "Army Green", value: "555500", color: "#ffffff"},
	{text: "Dark Gray", value: "555555", color: "#ffffff"},
	{text: "Liberty", value: "5555aa", color: "#ffffff"},
	{text: "Very Light Blue", value: "5555ff", color: "#ffffff"},
	{text: "Dark Candy Apple Red", value: "aa0000", color: "#ffffff"},
	{text: "Jazzberry Jam", value: "aa0055", color: "#ffffff"},
	{text: "Purple", value: "aa00aa", color: "#ffffff"},
	{text: "Vivid Violet", value: "aa00ff", color: "#ffffff"},
	{text: "Windsor Tan", value: "aa5500", color: "#ffffff"},
	{text: "Rose Vale", value: "aa5555", color: "#ffffff"},
	{text: "Purpureus", value: "aa55aa", color: "#ffffff"},
	{text: "Lavender Indigo", value: "aa55ff", color: "#ffffff"},
	{text: "Red", value: "ff0000", color: "#ffffff"},
	{text: "Folly", value: "ff0055", color: "#ffffff"},
	{text: "Fashion Magenta", value: "ff00aa", color: "#ffffff"},
	{text: "Magenta", value: "ff00ff", color: "#ffffff"},
	{text: "Orange", value: "ff5500", color: "#ffffff"},
	{text: "Sunset Orange", value: "ff5555", color: "#ffffff"},
	{text: "Brilliant Rose", value: "ff55aa", color: "#ffffff"},
	{text: "Shocking Pink", value: "ff55ff", color: "#ffffff"},
	{text: "Islamic Green", value: "00aa00", color: "#ffffff"},
	{text: "Jaeger Green", value: "00aa55", color: "#ffffff"},
	{text: "Tiffany Blue", value: "00aaaa", color: "#ffffff"},
	{text: "Vivid Cerulean", value: "00aaff", color: "#ffffff"},
	{text: "Green", value: "00ff00", color: "#000000"},
	{text: "Malachite", value: "00ff55", color: "#000000"},
	{text: "Medium Spring Green", value: "00ffaa", color: "#000000"},
	{text: "Cyan", value: "00ffff", color: "#000000"},
	{text: "Kelly Green", value: "55aa00", color: "#ffffff"},
	{text: "May Green", value: "55aa55", color: "#ffffff"},
	{text: "Cadet Blue", value: "55aaaa", color: "#ffffff"},
	{text: "Picton Blue", value: "55aaff", color: "#ffffff"},
	{text: "Bright Green", value: "55ff00", color: "#000000"},
	{text: "Screamin' Green", value: "55ff55", color: "#000000"},
	{text: "Medium Aquamarine", value: "55ffaa", color: "#000000"},
	{text: "Electric Blue", value: "55ffff", color: "#000000"},
	{text: "Limerick", value: "aaaa00", color: "#ffffff"},
	{text: "Brass", value: "aaaa55", color: "#ffffff"},
	{text: "Light Gray", value: "aaaaaa", color: "#ffffff"},
	{text: "Baby Blue Eyes", value: "aaaaff", color: "#ffffff"},
	{text: "Spring Bud", value: "aaff00", color: "#000000"},
	{text: "Inchworm", value: "aaff55", color: "#000000"},
	{text: "Mint Green", value: "aaffaa", color: "#000000"},
	{text: "Celeste", value: "aaffff", color: "#000000"},
	{text: "Chrome Yellow", value: "ffaa00", color: "#ffffff"},
	{text: "Rajah", value: "ffaa55", color: "#ffffff"},
	{text: "Melon", value: "ffaaaa", color: "#ffffff"},
	{text: "Rich Brilliant Lavender", value: "ffaaff", color: "#ffffff"},
	{text: "Yellow", value: "ffff00", color: "#000000"},
	{text: "Icterine", value: "ffff55", color: "#000000"},
	{text: "Pastel Yellow", value: "ffffaa", color: "#000000"},
	{text: "White", value: "ffffff", color: "#000000"}
];

function getColorName(colorRGB) {
	var rgb = colorRGB.split(',');
	var col = ('0' + parseInt(rgb[0].substring(4)).toString(16)).substr(-2) + ('0' + parseInt(rgb[1]).toString(16)).substr(-2) + ('0' + parseInt(rgb[2]).toString(16)).substr(-2);
	for(i = 0; i < colors.length; i++) {
		if(colors[i].value === col) {
			return colors[i].text;
		}
	}
	return "Unknown";
}

function getColorValue(colorRGB) {
	var rgb = colorRGB.split(',');
	var col = ('0' + parseInt(rgb[0].substring(4)).toString(16)).substr(-2) + ('0' + parseInt(rgb[1]).toString(16)).substr(-2) + ('0' + parseInt(rgb[2]).toString(16)).substr(-2);
	return col;
}

function setupColorSelector(colorSelector) {
	if(!current_watch || current_watch.platform === "aplite") {
		var option = document.createElement("option");
		option.value = colors[0].value;
		option.style.color = colors[0].color;
		option.style.backgroundColor = "#" + colors[0].value;
		option.text = colors[0].text;
		colorSelector.add(option);
		option = document.createElement("option");
		option.value = colors[colors.length-1].value;
		option.style.color = colors[colors.length-1].color;
		option.style.backgroundColor = "#" + colors[colors.length-1].value;
		option.text = colors[colors.length-1].text;
		colorSelector.add(option);
	} else {
		for(i = 0; i < colors.length; i++) {
			var option = document.createElement("option");
			option.value = colors[i].value;
			option.style.color = colors[i].color;
			option.style.backgroundColor = "#" + colors[i].value;
			option.text = colors[i].text;
			colorSelector.add(option);
		}
	}
}

function selectColor(colorPicker, selectedColor, backgroundColor, highlightColor) {
	var t = colorPicker.children;
	for(k = 0; k < t.length; k++) {
		var r = t[k].children;
		for(l = 0; l < r.length; l++) {
			var c = r[l].children;
			for(m = 0; m < c.length; m++) {
				if(c[m].style.backgroundColor === selectedColor) {
					c[m].style.borderColor = highlightColor;
				} else {
					c[m].style.borderColor = backgroundColor;
				}
			}
		}
	}
}

function setupColorPicker(colorPicker, colorPickerCallback, backgroundColor, highlightColor) {
	var index = 0;
	var table = document.createElement("DIV");
	table.className = "ColorTable";
	for(i = 0; i < 8; i++) {
		var row = document.createElement("DIV");
		row.className = "ColorRow";
		for(j = 0; j < 8; j++) {
			var cell = document.createElement("DIV");
			cell.className = "ColorCell";
			cell.style.backgroundColor = "#" + colors[index].value;
			cell.style.boderColor = backgroundColor;
			cell.onclick = function(e) {
				selectColor(colorPicker, e.target.style.backgroundColor, backgroundColor, highlightColor);
				colorPickerCallback(e.target.style.backgroundColor, getColorName(e.target.style.backgroundColor));
			};
			row.appendChild(cell);
			index++;
		}
		table.appendChild(row);
	}
	colorPicker.appendChild(table);
	selectColor(colorPicker, colorPicker.style.backgroundColor, backgroundColor, highlightColor);
}

function getQueryParam(variable, defaultValue) {
	// Find all URL parameters
	var query = location.search.substring(1);
	var vars = query.split('&');
	for(var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		// If the query variable parameter is found, decode it to use and return it for use
		if (pair[0] === variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	return defaultValue || false;
}

function versionCompare(version_1, version_2) {
	var versions_1 = JSON.stringify(version_1).split('.');
	var versions_2 = JSON.stringify(version_2).split('.');
	if(parseInt(versions_1[0].substr(1)) < parseInt(versions_2[0].substr(1))) {
		return -1;
	} else if(parseInt(versions_1[0].substr(1)) > parseInt(versions_2[0].substr(1))) {
		return 1;
	} else if(parseInt(versions_1[1]) < parseInt(versions_2[1])) {
		return -1;
	} else if(parseInt(versions_1[1]) > parseInt(versions_2[1])) {
		return 1;
	} else {
		return 0;
	}
}

var getAbsPosition = function(el){
    var el2 = el;
    var curtop = 0;
    var curleft = 0;
    if (document.getElementById || document.all) {
        do  {
            curleft += el.offsetLeft-el.scrollLeft;
            curtop += el.offsetTop-el.scrollTop;
            el = el.offsetParent;
            el2 = el2.parentNode;
            while (el2 != el) {
                curleft -= el2.scrollLeft;
                curtop -= el2.scrollTop;
                el2 = el2.parentNode;
            }
        } while (el.offsetParent);

    } else if (document.layers) {
        curtop += el.y;
        curleft += el.x;
    }
    return [curtop, curleft];
};

function scrollToShow(p) {
	var height = p.scrollHeight;
	var pos = getAbsPosition(p);
	if(window.pageYOffset + window.innerHeight < pos[0] + height) {
		window.scrollTo(0, pos[0] - (window.innerHeight - height));
	}
	if(pos[0] < window.pageYOffset) {
		window.scrollTo(0, pos[0]);
	}
}

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

var timeZones = [
	{text: "UTC-12 (Baker Island)",           value: -720},
	{text: "UTC-11 (Samoa)",                  value: -660},
	{text: "UTC-10 (Honolulu)",               value: -600},
	{text: "UTC-09:30 (Marquesas Islands)",   value: -570},
	{text: "UTC-09 (Anchorage)",              value: -540},
	{text: "UTC-08 (Los Angeles, Vancouver)", value: -480},
	{text: "UTC-07 (Denver)",                 value: -420},
	{text: "UTC-06 (Chicago, Mexico City)",   value: -360},
	{text: "UTC-05 (New York, Lima)",         value: -300},
	{text: "UTC-04:30 (Caracas)",             value: -270},
	{text: "UTC-04 (Manaus)",                 value: -240},
	{text: "UTC-03:30 (Newfoundland)",        value: -210},
	{text: "UTC-03 (Rio de Janeiro)",         value: -180},
	{text: "UTC-02 (Sandwich Islands)",       value: -120},
	{text: "UTC-01 (Azores)",                 value:  -60},
	{text: "UTC+00 (London, Reykjavik)",      value:    0},
	{text: "UTC+01 (Berlin, Rome, Paris)",    value:   60},
	{text: "UTC+02 (Istanbul, Cairo)",        value:  120},
	{text: "UTC+03 (Moscow, Baghdad)",        value:  180},
	{text: "UTC+03:30 (Tehran)",              value:  210},
	{text: "UTC+04 (Dubai)",                  value:  240},
	{text: "UTC+04:30 (Kabul)",               value:  270},
	{text: "UTC+05 (Karachi)",                value:  300},
	{text: "UTC+05:30 (New Delhi)",           value:  330},
	{text: "UTC+05:45 (Kathmandu)",           value:  345},
	{text: "UTC+06 (Astana)",                 value:  360},
	{text: "UTC+06:30 (Rangoon)",             value:  390},
	{text: "UTC+07 (Bangkok)",                value:  420},
	{text: "UTC+08 (Beijing)",                value:  480},
	{text: "UTC+08:45 (Perth)",               value:  525},
	{text: "UTC+09 (Tokyo, Seoul)",           value:  540},
	{text: "UTC+09:30 (Alice Springs)",       value:  570},
	{text: "UTC+10 (Sydney, Melbourne)",      value:  600},
	{text: "UTC+10:30 (Lord How Island)",     value:  630},
	{text: "UTC+11 (New Caledonia)",          value:  660},
	{text: "UTC+11:30 (Norfolk Island)",      value:  690},
	{text: "UTC+12 (Auckland)",               value:  720},
	{text: "UTC+12:45 (Chatham Islands)",     value:  765},
	{text: "UTC+13 (Tokelau)",                value:  780},
	{text: "UTC+14 (Line Islands)",           value:  840}
];

function setupTimeZoneSelector(timezoneSelector) {
	for(i = 0; i < timeZones.length; i++) {
		option = document.createElement("option");
		option.value = timeZones[i].value;
		option.text = timeZones[i].text;
		timezoneSelector.add(option);
	}
}
