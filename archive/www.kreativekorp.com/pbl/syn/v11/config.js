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
	$('#backgroundColor'  ).val(localStorage.pblSynBackgroundColor   || '#000000');
	$('#boxBorderColor'   ).val(localStorage.pblSynBoxBorderColor    ||       '1');
	$('#boxTextColor'     ).val(localStorage.pblSynBoxTextColor      ||       '4');
	$('#layoutShape'      ).val(localStorage.pblSynLayoutShape       || ((localStorage.pblSynLayoutString === 'RNPLPLIponmTG3rl1ihT7fedcVG3gz1baTI{wvB3y1|') ? 'hexagon' : 'square'));
	$('#layoutUnderHour'  ).val(localStorage.pblSynLayoutUnderHour   ||    'ampm');
	$('#layoutUnderMinute').val(localStorage.pblSynLayoutUnderMinute || 'seconds');
	$('#digitColor0'      ).val(localStorage.pblSynDigitColor0       || '#000000');
	$('#digitColor1'      ).val(localStorage.pblSynDigitColor1       || '#AA5500');
	$('#digitColor2'      ).val(localStorage.pblSynDigitColor2       || '#FF0000');
	$('#digitColor3'      ).val(localStorage.pblSynDigitColor3       || '#FF5500');
	$('#digitColor4'      ).val(localStorage.pblSynDigitColor4       || '#FFFF00');
	$('#digitColor5'      ).val(localStorage.pblSynDigitColor5       || '#00FF00');
	$('#digitColor6'      ).val(localStorage.pblSynDigitColor6       || '#0000FF');
	$('#digitColor7'      ).val(localStorage.pblSynDigitColor7       || '#5500FF');
	$('#digitColor8'      ).val(localStorage.pblSynDigitColor8       || '#555555');
	$('#digitColor9'      ).val(localStorage.pblSynDigitColor9       || '#FFFFFF');
	$('#ampmColor0'       ).val(localStorage.pblSynAmpmColor0        || '#FF0000');
	$('#ampmColor1'       ).val(localStorage.pblSynAmpmColor1        || '#FFFF00');
	$('#ampmColor2'       ).val(localStorage.pblSynAmpmColor2        || '#00FF00');
	$('#ampmColor3'       ).val(localStorage.pblSynAmpmColor3        || '#0000FF');
	$('#dstColor0'        ).val(localStorage.pblSynDstColor0         || '#AAAAAA');
	$('#dstColor1'        ).val(localStorage.pblSynDstColor1         || '#FFFF00');
	$('#weekdayColor0'    ).val(localStorage.pblSynWeekdayColor0     || '#FF0000');
	$('#weekdayColor1'    ).val(localStorage.pblSynWeekdayColor1     || '#FF5500');
	$('#weekdayColor2'    ).val(localStorage.pblSynWeekdayColor2     || '#FFFF00');
	$('#weekdayColor3'    ).val(localStorage.pblSynWeekdayColor3     || '#00FF00');
	$('#weekdayColor4'    ).val(localStorage.pblSynWeekdayColor4     || '#00FFFF');
	$('#weekdayColor5'    ).val(localStorage.pblSynWeekdayColor5     || '#0000FF');
	$('#weekdayColor6'    ).val(localStorage.pblSynWeekdayColor6     || '#5500FF');
	$('#monthColor0'      ).val(localStorage.pblSynMonthColor0       || '#000000');
	$('#monthColor1'      ).val(localStorage.pblSynMonthColor1       || '#AA5500');
	$('#monthColor2'      ).val(localStorage.pblSynMonthColor2       || '#FF0000');
	$('#monthColor3'      ).val(localStorage.pblSynMonthColor3       || '#FF5500');
	$('#monthColor4'      ).val(localStorage.pblSynMonthColor4       || '#FFFF00');
	$('#monthColor5'      ).val(localStorage.pblSynMonthColor5       || '#00FF00');
	$('#monthColor6'      ).val(localStorage.pblSynMonthColor6       || '#00FFFF');
	$('#monthColor7'      ).val(localStorage.pblSynMonthColor7       || '#0000FF');
	$('#monthColor8'      ).val(localStorage.pblSynMonthColor8       || '#5500FF');
	$('#monthColor9'      ).val(localStorage.pblSynMonthColor9       || '#FF00FF');
	$('#monthColor10'     ).val(localStorage.pblSynMonthColor10      || '#555555');
	$('#monthColor11'     ).val(localStorage.pblSynMonthColor11      || '#FFFFFF');
	$('#statusColor0'     ).val(localStorage.pblSynStatusColor0      || '#0000FF');
	$('#statusColor1'     ).val(localStorage.pblSynStatusColor1      || '#AAAAAA');
	$('#statusColor2'     ).val(localStorage.pblSynStatusColor2      || '#FF0000');
	$('#statusColor3'     ).val(localStorage.pblSynStatusColor3      || '#FF5500');
	$('#statusColor4'     ).val(localStorage.pblSynStatusColor4      || '#FFFF00');
	$('#statusColor5'     ).val(localStorage.pblSynStatusColor5      || '#00FF00');
	$('#statusColor6'     ).val(localStorage.pblSynStatusColor6      || '#00FFFF');
	$('#statusColor7'     ).val(localStorage.pblSynStatusColor7      || '#FFFFFF');
	$('#statusColor8'     ).val(localStorage.pblSynStatusColor8      || '#FFFFFF');
}
function getLayoutStringUnderHour() {
	switch ($('#layoutUnderHour').val()) {
		case 'seconds': return '1ba';
		default       : return '3g' ;
		case 'dst'    : return '3}' ;
	}
}
function getLayoutStringUnderMinute() {
	switch ($('#layoutUnderMinute').val()) {
		default       : return '1ba';
		case 'ampm'   : return '3g' ;
		case 'dst'    : return '3}' ;
	}
}
function getLayoutString() {
	var uh = getLayoutStringUnderHour();
	var um = getLayoutStringUnderMinute();
	switch ($('#layoutShape').val()) {
		default:
			return 'RRLLLLpoTnmT3rTlT1ihJ7feVIdcVI' + uh + um + 'T1{3z1wvB3y1|';
		case 'hexagon':
			return 'RNPLPLIponmTG3rl1ihT7fedcVG' + uh + '3z' + um + 'TI1{wvB3y1|';
	}
}
function saveConfigData() {
	localStorage.pblSynBackgroundColor   = $('#backgroundColor'  ).val();
	localStorage.pblSynBoxBorderColor    = $('#boxBorderColor'   ).val();
	localStorage.pblSynBoxTextColor      = $('#boxTextColor'     ).val();
	localStorage.pblSynLayoutShape       = $('#layoutShape'      ).val();
	localStorage.pblSynLayoutUnderHour   = $('#layoutUnderHour'  ).val();
	localStorage.pblSynLayoutUnderMinute = $('#layoutUnderMinute').val();
	localStorage.pblSynDigitColor0       = $('#digitColor0'      ).val();
	localStorage.pblSynDigitColor1       = $('#digitColor1'      ).val();
	localStorage.pblSynDigitColor2       = $('#digitColor2'      ).val();
	localStorage.pblSynDigitColor3       = $('#digitColor3'      ).val();
	localStorage.pblSynDigitColor4       = $('#digitColor4'      ).val();
	localStorage.pblSynDigitColor5       = $('#digitColor5'      ).val();
	localStorage.pblSynDigitColor6       = $('#digitColor6'      ).val();
	localStorage.pblSynDigitColor7       = $('#digitColor7'      ).val();
	localStorage.pblSynDigitColor8       = $('#digitColor8'      ).val();
	localStorage.pblSynDigitColor9       = $('#digitColor9'      ).val();
	localStorage.pblSynAmpmColor0        = $('#ampmColor0'       ).val();
	localStorage.pblSynAmpmColor1        = $('#ampmColor1'       ).val();
	localStorage.pblSynAmpmColor2        = $('#ampmColor2'       ).val();
	localStorage.pblSynAmpmColor3        = $('#ampmColor3'       ).val();
	localStorage.pblSynDstColor0         = $('#dstColor0'        ).val();
	localStorage.pblSynDstColor1         = $('#dstColor1'        ).val();
	localStorage.pblSynWeekdayColor0     = $('#weekdayColor0'    ).val();
	localStorage.pblSynWeekdayColor1     = $('#weekdayColor1'    ).val();
	localStorage.pblSynWeekdayColor2     = $('#weekdayColor2'    ).val();
	localStorage.pblSynWeekdayColor3     = $('#weekdayColor3'    ).val();
	localStorage.pblSynWeekdayColor4     = $('#weekdayColor4'    ).val();
	localStorage.pblSynWeekdayColor5     = $('#weekdayColor5'    ).val();
	localStorage.pblSynWeekdayColor6     = $('#weekdayColor6'    ).val();
	localStorage.pblSynMonthColor0       = $('#monthColor0'      ).val();
	localStorage.pblSynMonthColor1       = $('#monthColor1'      ).val();
	localStorage.pblSynMonthColor2       = $('#monthColor2'      ).val();
	localStorage.pblSynMonthColor3       = $('#monthColor3'      ).val();
	localStorage.pblSynMonthColor4       = $('#monthColor4'      ).val();
	localStorage.pblSynMonthColor5       = $('#monthColor5'      ).val();
	localStorage.pblSynMonthColor6       = $('#monthColor6'      ).val();
	localStorage.pblSynMonthColor7       = $('#monthColor7'      ).val();
	localStorage.pblSynMonthColor8       = $('#monthColor8'      ).val();
	localStorage.pblSynMonthColor9       = $('#monthColor9'      ).val();
	localStorage.pblSynMonthColor10      = $('#monthColor10'     ).val();
	localStorage.pblSynMonthColor11      = $('#monthColor11'     ).val();
	localStorage.pblSynStatusColor0      = $('#statusColor0'     ).val();
	localStorage.pblSynStatusColor1      = $('#statusColor1'     ).val();
	localStorage.pblSynStatusColor2      = $('#statusColor2'     ).val();
	localStorage.pblSynStatusColor3      = $('#statusColor3'     ).val();
	localStorage.pblSynStatusColor4      = $('#statusColor4'     ).val();
	localStorage.pblSynStatusColor5      = $('#statusColor5'     ).val();
	localStorage.pblSynStatusColor6      = $('#statusColor6'     ).val();
	localStorage.pblSynStatusColor7      = $('#statusColor7'     ).val();
	localStorage.pblSynStatusColor8      = $('#statusColor8'     ).val();
	var options = {
		backgroundColor: parseInt($('#backgroundColor').val().replace(/^(#|0x)/, ''), 16),
		boxBorderColor:  parseInt($('#boxBorderColor' ).val()                       , 10),
		boxTextColor:    parseInt($('#boxTextColor'   ).val()                       , 10),
		layoutString:    getLayoutString(),
		digitColor0:     parseInt($('#digitColor0'    ).val().replace(/^(#|0x)/, ''), 16),
		digitColor1:     parseInt($('#digitColor1'    ).val().replace(/^(#|0x)/, ''), 16),
		digitColor2:     parseInt($('#digitColor2'    ).val().replace(/^(#|0x)/, ''), 16),
		digitColor3:     parseInt($('#digitColor3'    ).val().replace(/^(#|0x)/, ''), 16),
		digitColor4:     parseInt($('#digitColor4'    ).val().replace(/^(#|0x)/, ''), 16),
		digitColor5:     parseInt($('#digitColor5'    ).val().replace(/^(#|0x)/, ''), 16),
		digitColor6:     parseInt($('#digitColor6'    ).val().replace(/^(#|0x)/, ''), 16),
		digitColor7:     parseInt($('#digitColor7'    ).val().replace(/^(#|0x)/, ''), 16),
		digitColor8:     parseInt($('#digitColor8'    ).val().replace(/^(#|0x)/, ''), 16),
		digitColor9:     parseInt($('#digitColor9'    ).val().replace(/^(#|0x)/, ''), 16),
		ampmColor0:      parseInt($('#ampmColor0'     ).val().replace(/^(#|0x)/, ''), 16),
		ampmColor1:      parseInt($('#ampmColor1'     ).val().replace(/^(#|0x)/, ''), 16),
		ampmColor2:      parseInt($('#ampmColor2'     ).val().replace(/^(#|0x)/, ''), 16),
		ampmColor3:      parseInt($('#ampmColor3'     ).val().replace(/^(#|0x)/, ''), 16),
		dstColor0:       parseInt($('#dstColor0'      ).val().replace(/^(#|0x)/, ''), 16),
		dstColor1:       parseInt($('#dstColor1'      ).val().replace(/^(#|0x)/, ''), 16),
		weekdayColor0:   parseInt($('#weekdayColor0'  ).val().replace(/^(#|0x)/, ''), 16),
		weekdayColor1:   parseInt($('#weekdayColor1'  ).val().replace(/^(#|0x)/, ''), 16),
		weekdayColor2:   parseInt($('#weekdayColor2'  ).val().replace(/^(#|0x)/, ''), 16),
		weekdayColor3:   parseInt($('#weekdayColor3'  ).val().replace(/^(#|0x)/, ''), 16),
		weekdayColor4:   parseInt($('#weekdayColor4'  ).val().replace(/^(#|0x)/, ''), 16),
		weekdayColor5:   parseInt($('#weekdayColor5'  ).val().replace(/^(#|0x)/, ''), 16),
		weekdayColor6:   parseInt($('#weekdayColor6'  ).val().replace(/^(#|0x)/, ''), 16),
		monthColor0:     parseInt($('#monthColor0'    ).val().replace(/^(#|0x)/, ''), 16),
		monthColor1:     parseInt($('#monthColor1'    ).val().replace(/^(#|0x)/, ''), 16),
		monthColor2:     parseInt($('#monthColor2'    ).val().replace(/^(#|0x)/, ''), 16),
		monthColor3:     parseInt($('#monthColor3'    ).val().replace(/^(#|0x)/, ''), 16),
		monthColor4:     parseInt($('#monthColor4'    ).val().replace(/^(#|0x)/, ''), 16),
		monthColor5:     parseInt($('#monthColor5'    ).val().replace(/^(#|0x)/, ''), 16),
		monthColor6:     parseInt($('#monthColor6'    ).val().replace(/^(#|0x)/, ''), 16),
		monthColor7:     parseInt($('#monthColor7'    ).val().replace(/^(#|0x)/, ''), 16),
		monthColor8:     parseInt($('#monthColor8'    ).val().replace(/^(#|0x)/, ''), 16),
		monthColor9:     parseInt($('#monthColor9'    ).val().replace(/^(#|0x)/, ''), 16),
		monthColor10:    parseInt($('#monthColor10'   ).val().replace(/^(#|0x)/, ''), 16),
		monthColor11:    parseInt($('#monthColor11'   ).val().replace(/^(#|0x)/, ''), 16),
		statusColor0:    parseInt($('#statusColor0'   ).val().replace(/^(#|0x)/, ''), 16),
		statusColor1:    parseInt($('#statusColor1'   ).val().replace(/^(#|0x)/, ''), 16),
		statusColor2:    parseInt($('#statusColor2'   ).val().replace(/^(#|0x)/, ''), 16),
		statusColor3:    parseInt($('#statusColor3'   ).val().replace(/^(#|0x)/, ''), 16),
		statusColor4:    parseInt($('#statusColor4'   ).val().replace(/^(#|0x)/, ''), 16),
		statusColor5:    parseInt($('#statusColor5'   ).val().replace(/^(#|0x)/, ''), 16),
		statusColor6:    parseInt($('#statusColor6'   ).val().replace(/^(#|0x)/, ''), 16),
		statusColor7:    parseInt($('#statusColor7'   ).val().replace(/^(#|0x)/, ''), 16),
		statusColor8:    parseInt($('#statusColor8'   ).val().replace(/^(#|0x)/, ''), 16),
	};
	return options;
}
$('h1').on('click', function() {
	$('.color-box').each(function(k, e) {
		var c = e.style.background.replace(/255/g, 'F').replace(/170/g, 'A').replace(/85/g, '5').replace(/[^0-9A-F]/g, '');
		var rgb = parseInt(c, 16);
		var r = (rgb >> 8) & 0xF;
		var g = (rgb >> 4) & 0xF;
		var b = (rgb >> 0) & 0xF;
		var k = (r * 30 + g * 59 + b * 11) / 100;
		e.innerText = c;
		e.style.fontStyle = 'normal';
		e.style.fontSize = (e.clientHeight / 3) + 'px';
		e.style.textAlign = 'center';
		e.style.lineHeight = e.clientHeight + 'px';
		e.style.color = (k < 8) ? 'white' : 'black';
	});
});
$('#saveButton').on('click', function() {
	var returnTo = getQueryParam('return_to', 'pebblejs://close#');
	document.location = returnTo + encodeURIComponent(JSON.stringify(saveConfigData()));
});
loadConfigData();