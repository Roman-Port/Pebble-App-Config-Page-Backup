var aplite_watch = {
	platform: "aplite",
};
var basalt_watch = {
	platform: "basalt",
};
var chalk_watch = {
	platform: "chalk",
};

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

function getValue(property, defaultProperty) {
	return (undefined === property) ? defaultProperty : property;
}

function getColorRed(colorRGB) {
	var rgb = colorRGB.split(',');
	return parseInt(rgb[0].substring(4));
}

function getColorGreen(colorRGB) {
	var rgb = colorRGB.split(',');
	return parseInt(rgb[1]);
}

function getColorBlue(colorRGB) {
	var rgb = colorRGB.split(',');
	return parseInt(rgb[2]);
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
