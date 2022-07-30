(function() {
	loadOptions();
	submitHandler();

})();

function submitHandler(){
	var $submitButton = $('#submitButton');

	$submitButton.on('click', function() {
		console.log('submit');

		var return_to = getQueryParam('return_to', 'pebblejs://close#');
		document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
	});
}



function getAndStoreConfigData() {
var $foreG = $('#fore');
var $backG = $('#back');

	var options = {
		foregroundColour: $foreG.val(),
		backgroundColour: $backG.val()
	};

	localStorage.foregroundColour = options.foregroundColour;
	localStorage.backgroundColour = options.backgroundColour;

	console.log('Got options:' + JSON.stringify(options));
	return options;

}


function loadOptions(){
	var $foreG = $('#fore');
	var $backG = $('#back');

	if(localStorage.backgroundColour){
		$backG[0].value = localStorage.backgroundColour;
	}
	if(localStorage.foregroundColour){
                $foreG[0].value = localStorage.foregroundColour;
        }



}

// Get query variables/ 
function getQueryParam(variable, defaultValue) {
     var query = location.search.substring(1);
     var vars = query.split('&');
     for (var i = 0; i < vars.length; i++) {
     	var pair = vars[i].split('=');
        if (pair[0] === variable) {
        	return decodeURIComponent(pair[1]);
        }
     }
     return defaultValue || false;
}
