var box1 = document.getElementById("colorPickerBG");
var box2 = document.getElementById("colorPickerText");
var box3 = document.getElementById("colorPickerBar");

// these are set to their default indexes
// 0 = GColorBlack (#000000)
// 43 = GColorRed (#FF0000)
var BGColor = 0;
var TColor = 43;
var BColor = 43;

// all 64 colors on the pebble
// thank goodness for regex
var colors = ["#000000", "#000055", "#0000AA", "#0000FF", "#005500", "#005555", "#0055AA", "#0055FF", "#00AA00", "#00AA55", "#00AAAA", "#00AAFF", "#00FF55", "#00FFAA", "#00FFFF", "#550000", "#550055", "#5500AA", "#5500FF", "#555500", "#555555", "#5555AA", "#5555FF", "#55AA00", "#55AA55", "#55AAAA", "#55AAFF", "#55FFAA", "#55FFFF", "#AA0000", "#AA0055", "#AA00AA", "#AA00FF", "#AA5500", "#AA5555", "#AA55AA", "#AA55FF", "#AAAA00", "#AAAA55", "#AAAAAA", "#FFFFFF", "#AAAAFF", "#AAFFFF", "#FF0000", "#FF0055", "#FF00AA", "#FF00FF", "#FF5500", "#FF5555", "#FF55AA", "#FF55FF", "#FFAA00", "#FFAA55", "#FFAAAA", "#FFAAFF", "#FFFF00", "#FFFF55", "#FFFFAA", "#AAFF55", "#AAFF00", "#55FF00", "#00FF00", "#AAFFAA", "#55FF55"];

window.onload = function() {
	document.getElementById("TextColorTitle").setAttribute("style", "color: " + colors[43] + " !important;");
	document.getElementById("BarColorTitle").setAttribute("style", "color: " + colors[43] + " !important;");
	
	// fill background color picker
	for (var i = 0; i < colors.length; i++) {
		var a = document.createElement("a");
		a.className = "color";
		a.setAttribute("style", "background-color:" + colors[i] + ";");
		a.setAttribute("data-color-index", i.toString());
		a.setAttribute("onclick", "setBGColor(this.dataset.colorIndex);");
		box1.appendChild(a);
	}
	
	// fill text color picker
	for (var i = 0; i < colors.length; i++) {
		var a = document.createElement("a");
		a.className = "color";
		a.setAttribute("style", "background-color:" + colors[i] + ";");
		a.setAttribute("data-color-index", i.toString());
		a.setAttribute("onclick", "setTextColor(this.dataset.colorIndex);");
		box2.appendChild(a);
	}
	
	// fill bar color picker
	for (var i = 0; i < colors.length; i++) {
		var a = document.createElement("a");
		a.className = "color";
		a.setAttribute("style", "background-color:" + colors[i] + ";");
		a.setAttribute("data-color-index", i.toString());
		a.setAttribute("onclick", "setBarColor(this.dataset.colorIndex);");
		box3.appendChild(a);
	}
};

function setBGColor(colorIndex) {
	document.getElementById("BGColorTitle").setAttribute("style", "color: " + colors[colorIndex] + " !important;");
	BGColor = colorIndex;
}

function setTextColor(colorIndex) {
	document.getElementById("TextColorTitle").setAttribute("style", "color: " + colors[colorIndex] + " !important;");
	TColor = colorIndex;
}

function setBarColor(colorIndex) {
	document.getElementById("BarColorTitle").setAttribute("style", "color: " + colors[colorIndex] + " !important;");
	BColor = colorIndex;
}

function defaults() {
	BGColor = 0;
	TColor = 43;
	BColor = 43;
	
	document.getElementById("BGColorTitle").setAttribute("style", "color: " + colors[0] + " !important;");
	
	document.getElementById("TextColorTitle").setAttribute("style", "color: " + colors[43] + " !important;");
	document.getElementById("BarColorTitle").setAttribute("style", "color: " + colors[43] + " !important;");
}

function save() {
	// return to pebble with settings stored to parse later
	document.location.href = "pebblejs://close#" + encodeURIComponent("BG|" + colors[BGColor].toString().replace("#","") + "|T|" + colors[TColor].toString().replace("#", "") + "|B|" + colors[BColor].toString().replace("#", ""));
}