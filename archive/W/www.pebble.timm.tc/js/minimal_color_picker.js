var minimalcolorpicker_colors = [
	{text: "Black", value: "000000", sunlight: "000000"},
	{text: "Oxford Blue", value: "000055", sunlight: "001E41"},
	{text: "Duke Blue", value: "0000aa", sunlight: "004387"},
	{text: "Blue", value: "0000ff", sunlight: "0068CA"},
	{text: "Dark Green", value: "005500", sunlight: "2B4A2C"},
	{text: "Midnight Green", value: "005555", sunlight: "27514F"},
	{text: "Cobalt Blue", value: "0055aa", sunlight: "16638D"},
	{text: "Blue Moon", value: "0055ff", sunlight: "007DCE"},
	{text: "Bulgarian Rose", value: "550000", sunlight: "4A161B"},
	{text: "Imperial Purple", value: "550055", sunlight: "482748"},
	{text: "Indigo", value: "5500aa", sunlight: "40488A"},
	{text: "Electric Ultramarine", value: "5500ff", sunlight: "2F6BCC"},
	{text: "Army Green", value: "555500", sunlight: "564E36"},
	{text: "Dark Gray", value: "555555", sunlight: "545454"},
	{text: "Liberty", value: "5555aa", sunlight: "4F6790"},
	{text: "Very Light Blue", value: "5555ff", sunlight: "4180D0"},
	{text: "Dark Candy Apple Red", value: "aa0000", sunlight: "99353F"},
	{text: "Jazzberry Jam", value: "aa0055", sunlight: "983E5A"},
	{text: "Purple", value: "aa00aa", sunlight: "955694"},
	{text: "Vivid Violet", value: "aa00ff", sunlight: "8F74D2"},
	{text: "Windsor Tan", value: "aa5500", sunlight: "9D5B4D"},
	{text: "Rose Vale", value: "aa5555", sunlight: "9D6064"},
	{text: "Purpureus", value: "aa55aa", sunlight: "9A7099"},
	{text: "Lavender Indigo", value: "aa55ff", sunlight: "9587D5"},
	{text: "Red", value: "ff0000", sunlight: "E35462"},
	{text: "Folly", value: "ff0055", sunlight: "E25874"},
	{text: "Fashion Magenta", value: "ff00aa", sunlight: "E16AA3"},
	{text: "Magenta", value: "ff00ff", sunlight: "DE83DC"},
	{text: "Orange", value: "ff5500", sunlight: "E66E6B"},
	{text: "Sunset Orange", value: "ff5555", sunlight: "E6727C"},
	{text: "Brilliant Rose", value: "ff55aa", sunlight: "E37FA7"},
	{text: "Shocking Pink", value: "ff55ff", sunlight: "E194DF"},
	{text: "Islamic Green", value: "00aa00", sunlight: "5E9860"},
	{text: "Jaeger Green", value: "00aa55", sunlight: "5C9B72"},
	{text: "Tiffany Blue", value: "00aaaa", sunlight: "57A5A2"},
	{text: "Vivid Cerulean", value: "00aaff", sunlight: "4CB4DB"},
	{text: "Green", value: "00ff00", sunlight: "8EE391"},
	{text: "Malachite", value: "00ff55", sunlight: "8EE69E"},
	{text: "Medium Spring Green", value: "00ffaa", sunlight: "8AEBC0"},
	{text: "Cyan", value: "00ffff", sunlight: "84F5F1"},
	{text: "Kelly Green", value: "55aa00", sunlight: "759A64"},
	{text: "May Green", value: "55aa55", sunlight: "759D76"},
	{text: "Cadet Blue", value: "55aaaa", sunlight: "71A6A4"},
	{text: "Picton Blue", value: "55aaff", sunlight: "69B5DD"},
	{text: "Bright Green", value: "55ff00", sunlight: "9EE594"},
	{text: "Screamin' Green", value: "55ff55", sunlight: "9DE7A0"},
	{text: "Medium Aquamarine", value: "55ffaa", sunlight: "9BECC2"},
	{text: "Electric Blue", value: "55ffff", sunlight: "95F6F2"},
	{text: "Limerick", value: "aaaa00", sunlight: "AFA072"},
	{text: "Brass", value: "aaaa55", sunlight: "AEA382"},
	{text: "Light Gray", value: "aaaaaa", sunlight: "ABABAB"},
	{text: "Baby Blue Eyes", value: "aaaaff", sunlight: "A7BAE2"},
	{text: "Spring Bud", value: "aaff00", sunlight: "C9E89D"},
	{text: "Inchworm", value: "aaff55", sunlight: "C9EAA7"},
	{text: "Mint Green", value: "aaffaa", sunlight: "C7F0C8"},
	{text: "Celeste", value: "aaffff", sunlight: "C3F9F7"},
	{text: "Chrome Yellow", value: "ffaa00", sunlight: "F1AA86"},
	{text: "Rajah", value: "ffaa55", sunlight: "F1AD93"},
	{text: "Melon", value: "ffaaaa", sunlight: "EFB5B8"},
	{text: "Rich Brilliant Lavender", value: "ffaaff", sunlight: "ECC3EB"},
	{text: "Yellow", value: "ffff00", sunlight: "FFEEAB"},
	{text: "Icterine", value: "ffff55", sunlight: "FFF1B5"},
	{text: "Pastel Yellow", value: "ffffaa", sunlight: "FFF6D3"},
	{text: "White", value: "ffffff", sunlight: "FFFFFF"},
	{text: "Gray", value: "808080", sunlight: "808080"},
];

var minimalcolorpicker_grayIndex = [0, 64, 63];

function minimalcolorpicker_getColorName(colorRGB) {
	var col = colorRGB.toString();
	if(colorRGB.substr(0, 3) === "rgb") {
		var rgb = colorRGB.split(',');
		col = ('0' + parseInt(rgb[0].substring(4)).toString(16)).substr(-2) + ('0' + parseInt(rgb[1]).toString(16)).substr(-2) + ('0' + parseInt(rgb[2]).toString(16)).substr(-2);
	}
	for(i = 0; i < minimalcolorpicker_colors.length; i++) {
		if(minimalcolorpicker_colors[i].value === col) {
			return minimalcolorpicker_colors[i].text;
		}
	}
	return "Unknown";
}

function minimalcolorpicker_getColorValue(colorRGB) {
	var rgb = colorRGB.split(',');
	var col = ('0' + parseInt(rgb[0].substring(4)).toString(16)).substr(-2) + ('0' + parseInt(rgb[1]).toString(16)).substr(-2) + ('0' + parseInt(rgb[2]).toString(16)).substr(-2);
	return col;
}

function minimalcolorpicker_getSunlightColor(colorRGB) {
	var col = colorRGB.toString();
	if(colorRGB.substr(0, 3) === "rgb") {
		var rgb = colorRGB.split(',');
		col = ('0' + parseInt(rgb[0].substring(4)).toString(16)).substr(-2) + ('0' + parseInt(rgb[1]).toString(16)).substr(-2) + ('0' + parseInt(rgb[2]).toString(16)).substr(-2);
	}
	for(i = 0; i < minimalcolorpicker_colors.length; i++) {
		if(minimalcolorpicker_colors[i].value === col) {
			var color = "rgb(" + parseInt("0x"+minimalcolorpicker_colors[i].sunlight.substr(0, 2)) + ", " + parseInt("0x"+minimalcolorpicker_colors[i].sunlight.substr(2, 2)) + ", " + parseInt("0x"+minimalcolorpicker_colors[i].sunlight.substr(4, 2)) + ")";
			return color;
		}
	}
	return colorRGB;
}

function minimalcolorpicker_selectColor(colorPicker, selectedColor, backgroundColor, highlightColor) {
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

function minimalcolorpicker_colorSelected(colorValue, colorPickerColorName, colorPickerPreview) {
	if(colorPickerPreview) {
		colorPickerPreview.style.backgroundColor = colorValue;
	}
	if(colorPickerColorName) {
		colorPickerColorName.innerHTML = minimalcolorpicker_getColorName(colorValue);
	}
}

var minimalcolorpicker_allColorPickers = [];

function minimalcolorpicker_defaultCallback(colorPicker, colorPickerCallback, colorPickerColorName, colorPickerPreview, colorValue, colorName) {
	if(colorPickerPreview) {
		if(minimalcolorpicker_allColorPickers[colorPicker.id].first || colorPickerPreview.style.backgroundColor === colorValue) {
			minimalcolorpicker_allColorPickers[colorPicker.id].first = false;
			colorPicker.setAttribute("hidden", true);
		}
	}
	minimalcolorpicker_colorSelected(colorValue, colorPickerColorName, colorPickerPreview);
	if(colorPickerCallback) {
		colorPickerCallback(colorPicker, colorValue, colorName);
	}
}

function minimalcolorpicker_registerColorPicker(colorPicker, initialColor) {
	var colorPickerColorName = document.getElementById(colorPicker.id + "_name");
	var colorPickerPreview = document.getElementById(colorPicker.id + "_preview");
	minimalcolorpicker_colorSelected(initialColor, colorPickerColorName, colorPickerPreview);
	minimalcolorpicker_allColorPickers[colorPicker.id] = {first: true, name: colorPickerColorName.id, preview: colorPickerPreview.id};
}

function minimalcolorpicker_setupColorPicker(colorPicker, colorPickerCallback, initialColor, backgroundColor, highlightColor, colors) {
	var colorPickerColorName = document.getElementById(colorPicker.id + "_name");
	var colorPickerPreview = document.getElementById(colorPicker.id + "_preview");
	if(!colors || 2 < colors) {
		var index = 0;
		var table = document.createElement("DIV");
		table.className = "minimal-color-picker-table";
		for(var i = 0; i < ((colors && 3 === colors) ? 1 : 8); i++) {
			var row = document.createElement("DIV");
			row.className = "minimal-color-picker-row";
			for(var j = 0; j < ((colors && 3 === colors) ? 3 : 8); j++) {
				var cell = document.createElement("DIV");
				cell.className = ((colors && 3 === colors) ? "minimal-color-picker-gray-cell" : "minimal-color-picker-cell");
				cell.style.backgroundColor = "#" + minimalcolorpicker_colors[((colors && 3 === colors) ? minimalcolorpicker_grayIndex[j] : index)].value;
				cell.style.boderColor = backgroundColor;
				cell.onclick = function(e) {
					minimalcolorpicker_selectColor(colorPicker, e.target.style.backgroundColor, backgroundColor, highlightColor);
					minimalcolorpicker_defaultCallback(colorPicker, colorPickerCallback, colorPickerColorName, colorPickerPreview, e.target.style.backgroundColor, minimalcolorpicker_getColorName(e.target.style.backgroundColor));
				};
				row.appendChild(cell);
				index++;
			}
			table.appendChild(row);
		}
		colorPicker.appendChild(table);
	}
	minimalcolorpicker_registerColorPicker(colorPicker, initialColor);
	minimalcolorpicker_selectColor(colorPicker, colorPickerPreview.style.backgroundColor, backgroundColor, highlightColor);

}

function minimalcolorpicker_toggleColorPicker(colorPickerId, toggleCallback) {
	var p = document.getElementById(colorPickerId);
	if(p.hasChildNodes()) {
		for(var x in minimalcolorpicker_allColorPickers) {
			if(x !== colorPickerId) {
				document.getElementById(x).setAttribute("hidden", true);
			}
		}
		if(p.hasAttribute("hidden")) {
			p.removeAttribute("hidden");
			scrollToShow(p);
		} else {
			p.setAttribute("hidden", true);
		}
	} else {
		// no child nodes means it is a black & white picker
		var preview = document.getElementById(minimalcolorpicker_allColorPickers[colorPickerId].preview);
		if(preview.style.backgroundColor == "rgb(0, 0, 0)") {
			preview.style.backgroundColor = "#ffffff";
		} else {
			preview.style.backgroundColor = "#000000";
		}
		document.getElementById(minimalcolorpicker_allColorPickers[colorPickerId].name).innerHTML = minimalcolorpicker_getColorName(preview.style.backgroundColor);
	}
	if(toggleCallback) {
		toggleCallback(colorPickerId);
	}
}
