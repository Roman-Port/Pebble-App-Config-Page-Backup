function saveOptions() {
	var options = {}
	//Add all textual values
	$('textarea, select, [type="hidden"], [type="password"], [type="text"]').each(function(){options[$(this).attr('id')] = $(this).val();})
	//Add all checkbox type values
	$('[type="radio"], [type="checkbox"]').each(function(){options[$(this).attr('id')] = $(this).is(':checked');})
	return options;
}
$().ready(function() {
	$("#submit").click(function() {
		console.log("Submit");
		var location = "pebblejs://close#" + encodeURIComponent(JSON.stringify(saveOptions()));
		console.log("Warping to: " + location);
		console.log(location);
		document.location = location;
	});


	$('#bit-coin-button').click(function(){
		$(this).parent().append('<div class="item-container"><div class="item-container-content"><div class="item">1C9ro8hT4kEPxXUE2m3BFGFcfePHsoxtnC</div></div></div>')
	});
	//Set form values to whatever is passed in.

	var raw_options = "";

	window.location.search.substring(1).split('&').forEach(function(part){
		var item = part.split('=');
		if(item[0] == 'options'){
			raw_options = item[1];
		}
	});

	try{
		var obj = jQuery.parseJSON(decodeURIComponent(raw_options));

		var options = obj.options;
		for(index in options){
			var key = options[index];
			$("#"+[key]).removeAttr('disabled').parent().removeClass('not-supported');

			if(key in obj){
				var input = $("#"+[key]);
				if(input.is('[type="radio"], [type="checkbox"]') && obj[key]){
					input.attr('checked', '');
				} else{
					input.val(obj[key]);
				}
			}
		}	
	}
	catch(e){
		var error_tempalte = '<div class="item-container-header">Error</div><div class="item-container-content"><div class="item">Error ocured while loading the configuration, We sent our best monkey to fix it =]</div></div></div>'

		$('#main-container').html(error_tempalte);
	}
});