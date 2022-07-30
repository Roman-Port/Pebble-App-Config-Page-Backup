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
	var layout = localStorage.pblWordLayout || 'eng0';
	$('#layout_' + layout)[0].checked = true;
	if (layout[0] == 'q') $('.hidden').removeClass('hidden');
}
function saveConfigData() {
	var layouts = {
		eng0:
			'g@U dHH ' +
			'f@H BBBBBBBB BBBBBBBB BBBBBBBB AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA ' +
			'c@H pppppppp pppppppp pppppppp ???????? ???????? ???????? ???????? ???????? ' +
			'b@H l@l@ C@C@ @p@p h@h@ Z@Z@ D@D@ `A`A `A`A ' +
			'bAH @H@H @D@D AlAl @`@` B@B@ F@F@ PDPD PDPD ' +
			'bBH @H@H @H@H @Q@Q @J@J aQaQ eBeB DQDQ @S@S ' +
			'bCH @@PO??|@@@ @@@O?@@@@@ @@P@@?|@@@ @@D@@@C??? @@T@@?|@O? ?|@@@@C?p@ ?|@@@@@@@@ @@P@@???p@ ' +
			'bDH @@A@@@@@@@ @@A@@@@@@@ @@A@@@@@@@ @@AO?@@@@@ @@AO?@@@@@ @@D@@@@@O? @@@O?????? @@@O?????? ' +
			'bEH L@`C@L@pC@ C@H@pC@L@p @pB@L@pC@L H@`B@H@`B@ z@HF`ZAhF` d@@A@D@PA@ @A`@@@@@@@ @A`@@@@@@@ ' +
			'bFH @H@`B@H@`B @D@PA@D@PA AlBp[AlFp[ @`B@H@`B@H B@H@`B@H@` F@HA`F@XA` PD@TAPE@TA PD@TAPE@TA ' +
			'bGH @H@`B@H@`B @H@`B@H@`B @Q@@D@PA@D @J_pB@H@`B AQ`@TAPE@T EB?qPE@TAP DQ_qDDPQAD @S_pD@PA@D ' +
			't@H T F S W O H E L ' + 'tAH E N I X U R N E ' + 'tBH G H E T V E E N ' + 'tCH T W H F I O H R ' +
			'tDH S E V E N F T Y ' + 'tEH T F S W O H E L ' + 'tFH E N I X U R N E ' + 'tGH G H E T V E E N ',
		eng1:
			'g?j dHH ' +
			'f@H BBBBBBBB BBBBBBBB BBBBBBBB AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA ' +
			'c@H ```````` ```````` ```````` @@@@@@@@ @@@@@@@@ @@@@@@@@ @@@@@@@@ @@@@@@@@ ' +
			'b@H l@l@ C@C@ @p@p h@h@ Z@Z@ D@D@ `A`A `A`A ' +
			'bAH @H@H @D@D AlAl @`@` B@B@ F@F@ PDPD PDPD ' +
			'bBH @H@H @H@H @Q@Q @J@J aQaQ eBeB DQDQ @S@S ' +
			'bCH @@PO??|@@@ @@@O?@@@@@ @@P@@?|@@@ @@D@@@C??? @@T@@?|@O? ?|@@@@C?p@ ?|@@@@@@@@ @@P@@???p@ ' +
			'bDH @@A@@@@@@@ @@A@@@@@@@ @@A@@@@@@@ @@AO?@@@@@ @@AO?@@@@@ @@D@@@@@O? @@@O?????? @@@O?????? ' +
			'bEH L@`C@L@pC@ C@H@pC@L@p @pB@L@pC@L H@`B@H@`B@ z@HF`ZAhF` d@@A@D@PA@ @A`@@@@@@@ @A`@@@@@@@ ' +
			'bFH @H@`B@H@`B @D@PA@D@PA AlBp[AlFp[ @`B@H@`B@H B@H@`B@H@` F@HA`F@XA` PD@TAPE@TA PD@TAPE@TA ' +
			'bGH @H@`B@H@`B @H@`B@H@`B @Q@@D@PA@D @J_pB@H@`B AQ`@TAPE@T EB?qPE@TAP DQ_qDDPQAD @S_pD@PA@D ' +
			't@H T F S W O H E L ' + 'tAH E N I X U R N E ' + 'tBH G H E T V E E N ' + 'tCH T W H F I O H R ' +
			'tDH S E V E N F T Y ' + 'tEH T F S W O H E L ' + 'tFH E N I X U R N E ' + 'tGH G H E T V E E N ',
		qmk0:
			'g@U dHH ' +
			'f@H BBBBBBBB BBBBBBBB BBBBBBBB AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA ' +
			'c@H SSSSSSSS SSSSSSSS SSSSSSSS LLLLLLLL LLLLLLLL GGGGGGGG GGGGGGGG GGGGGGGG ' +
			'b@H B@B@ @H@H BHBH DhDh A@A@ F@F@ @P@P @X@X ' +
			'bAH PEPE PAPA PAPA @`@` EDED @F@F D@D@ D@D@ ' +
			'bBH h@h@ hPhP h@h@ @`@` APAP `C`C `C`C ???? ' +
			'bCH @@@O?????? @@@O?????? @@@O?@@@@@ @@@O?@@@@@ @@@O?@@@@@ @@@@@@C?p@ @@@O?@C?p@ @@@@@@C?p@ ' +
			'bDH @@@@@?|@@@ @@@@@?|@@@ @@@@@@@@O? @@@@@?|@O? @@@@@@@@O? @@@@@?|@@@ @@@@@?|@@@ @@@@@????? ' +
			'bEH B@H@`B@H@` @H@`B@H@`B BHH`bBHH`b DhRaJDhRaJ A@D@PA@D@P F@XA`F@XA` @PA@D@PA@D @XA`F@XA`F ' +
			'bFH PE@TAPE@TA PA@D@PA@D@ PA@D@PA@D@ @`B@H@`B@H EDTQQEDTQQ @F@PA@D@PA D@PA@D@PA@ D@PA@D@PA@ ' +
			'bGH H@`B@H@`B@ HPaBDHPaBD H@`B@H@`B@ @`B@H@`B@H APE@TAPE@T @C?p@@@@@@ @C?p@@@@@@ _??w?_}?w? ' +
			't@H K\u0303 X A T K R S H ' + 'tAH M I N I E P S S ' + 'tBH B I B L M I C A ' + 'tCH M A B I B K\u0303 A R ' +
			'tDH T R K E M S S A ' + 'tEH K\u0303 X A T K R S H ' + 'tFH M I N I E P S S ' + 'tGH B I B L M I C A ',
		qmk1:
			'g?j dHH ' +
			'f@H BBBBBBBB BBBBBBBB BBBBBBBB AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA ' +
			'c@H RRRRRRRR RRRRRRRR RRRRRRRR HHHHHHHH HHHHHHHH FFFFFFFF FFFFFFFF FFFFFFFF ' +
			'b@H B@B@ @H@H BHBH DhDh A@A@ F@F@ @P@P @X@X ' +
			'bAH PEPE PAPA PAPA @`@` EDED @F@F D@D@ D@D@ ' +
			'bBH h@h@ hPhP h@h@ @`@` APAP `C`C `C`C ???? ' +
			'bCH @@@O?????? @@@O?????? @@@O?@@@@@ @@@O?@@@@@ @@@O?@@@@@ @@@@@@C?p@ @@@O?@C?p@ @@@@@@C?p@ ' +
			'bDH @@@@@?|@@@ @@@@@?|@@@ @@@@@@@@O? @@@@@?|@O? @@@@@@@@O? @@@@@?|@@@ @@@@@?|@@@ @@@@@????? ' +
			'bEH B@H@`B@H@` @H@`B@H@`B BHH`bBHH`b DhRaJDhRaJ A@D@PA@D@P F@XA`F@XA` @PA@D@PA@D @XA`F@XA`F ' +
			'bFH PE@TAPE@TA PA@D@PA@D@ PA@D@PA@D@ @`B@H@`B@H EDTQQEDTQQ @F@PA@D@PA D@PA@D@PA@ D@PA@D@PA@ ' +
			'bGH H@`B@H@`B@ HPaBDHPaBD H@`B@H@`B@ @`B@H@`B@H APE@TAPE@T @C?p@@@@@@ @C?p@@@@@@ _??w?_}?w? ' +
			't@H K\u0303 X A T K R S H ' + 'tAH M I N I E P S S ' + 'tBH B I B L M I C A ' + 'tCH M A B I B K\u0303 A R ' +
			'tDH T R K E M S S A ' + 'tEH K\u0303 X A T K R S H ' + 'tFH M I N I E P S S ' + 'tGH B I B L M I C A ',
	};
	var options = {};
	for (key in layouts) {
		if ($('#layout_' + key)[0].checked) {
			localStorage.pblWordLayout = key;
			options.layoutString = layouts[key];
		}
	}
	return options;
}
$('h1').on('click', function() {
	$('.hidden').removeClass('hidden');
});
$('#saveButton').on('click', function() {
	var returnTo = getQueryParam('return_to', 'pebblejs://close#');
	document.location = returnTo + encodeURIComponent(JSON.stringify(saveConfigData()));
});
loadConfigData();