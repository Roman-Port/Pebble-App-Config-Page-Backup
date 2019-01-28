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
	$('#bezelBackgroundColor').val(localStorage.pblLilkBezelBackgroundColor || '#AAAAAA');
	$('#bezelTextColor'      ).val(localStorage.pblLilkBezelTextColor       || '#000000');
	$('#lcdBackgroundColor'  ).val(localStorage.pblLilkLcdBackgroundColor   || '#FFFFFF');
	$('#lcdInactiveColor'    ).val(localStorage.pblLilkLcdInactiveColor     || '#FFFFAA');
	$('#lcdActiveColor'      ).val(localStorage.pblLilkLcdActiveColor       || '#000000');
	$('#lcdOverlayColor'     ).val(localStorage.pblLilkLcdOverlayColor      || '#000000');
	$('#showSeconds'         )[0].checked = (localStorage.pblLilkShowSeconds !== 'false');
}
function loadPreset(preset) {
	var presets = {
		'monochrome' : ['#000000', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#000000', '#000000'],
		'stone'      : ['#AAAA00', '#000000', '#FFFFFF', '#FFFFAA', '#000000', '#000000'],
		'rosegold'   : ['#FFAA55', '#000000', '#FFFFFF', '#FFFFAA', '#000000', '#000000'],
		'flamered'   : ['#FF0000', '#000000', '#000000', '#000055', '#FFFFFF', '#FFFFFF'],
		'silver'     : ['#AAAAAA', '#000000', '#FFFFFF', '#FFFFAA', '#000000', '#000000'],
		'black'      : ['#FFFFFF', '#000000', '#000000', '#000055', '#FFFFFF', '#FFFFFF'],
		'nubuckbrown': ['#550000', '#FFFFFF', '#FFFFFF', '#FFFFAA', '#000000', '#000000'],
	};
	if (preset in presets) {
		$('#bezelBackgroundColor').val(presets[preset][0]);
		$('#bezelTextColor'      ).val(presets[preset][1]);
		$('#lcdBackgroundColor'  ).val(presets[preset][2]);
		$('#lcdInactiveColor'    ).val(presets[preset][3]);
		$('#lcdActiveColor'      ).val(presets[preset][4]);
		$('#lcdOverlayColor'     ).val(presets[preset][5]);
		$('.item').forEach(function(e) {
			var input = $('.item-color', e);
			var value = $('.item-styled-color .value', e);
			if (input.val()) value.css('background', input.val());
		});
	}
}
function saveConfigData() {
	localStorage.pblLilkBezelBackgroundColor = $('#bezelBackgroundColor').val();
	localStorage.pblLilkBezelTextColor       = $('#bezelTextColor'      ).val();
	localStorage.pblLilkLcdBackgroundColor   = $('#lcdBackgroundColor'  ).val();
	localStorage.pblLilkLcdInactiveColor     = $('#lcdInactiveColor'    ).val();
	localStorage.pblLilkLcdActiveColor       = $('#lcdActiveColor'      ).val();
	localStorage.pblLilkLcdOverlayColor      = $('#lcdOverlayColor'     ).val();
	localStorage.pblLilkShowSeconds          = $('#showSeconds'         )[0].checked;
	var options = {
		bezelBackgroundColor: parseInt($('#bezelBackgroundColor').val().replace(/^(#|0x)/, ''), 16),
		bezelTextColor      : parseInt($('#bezelTextColor'      ).val().replace(/^(#|0x)/, ''), 16),
		lcdBackgroundColor  : parseInt($('#lcdBackgroundColor'  ).val().replace(/^(#|0x)/, ''), 16),
		lcdInactiveColor    : parseInt($('#lcdInactiveColor'    ).val().replace(/^(#|0x)/, ''), 16),
		lcdActiveColor      : parseInt($('#lcdActiveColor'      ).val().replace(/^(#|0x)/, ''), 16),
		lcdOverlayColor     : parseInt($('#lcdOverlayColor'     ).val().replace(/^(#|0x)/, ''), 16),
		showSeconds         :          $('#showSeconds'         )[0].checked
	};
	return options;
}
$('#preset').on('change', function() {
	var preset = $('#preset').val();
	if (preset) loadPreset(preset);
	$('#preset').val('');
});
$('#saveButton').on('click', function() {
	var returnTo = getQueryParam('return_to', 'pebblejs://close#');
	document.location = returnTo + encodeURIComponent(JSON.stringify(saveConfigData()));
});
loadConfigData();