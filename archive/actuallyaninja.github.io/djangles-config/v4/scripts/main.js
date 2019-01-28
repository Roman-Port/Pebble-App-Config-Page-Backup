(function () {
    loadOptions();
	showHideImagesByPlatform(getURLParameter("platform"));
	showHideLabelsByPlatform(getURLParameter("platform"));
	submitHandler();
})();

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}


function submitHandler() {
    var $submitButton = $('#submitButton');
	var $submitButtonTop = $('#submitButtonTop');

	
    $submitButton.on('click', function () {
        console.log('Submit');

        var return_to = getQueryParam('return_to', 'pebblejs://close#');
        document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));

    });
	
	$submitButtonTop.on('click', function () {
        console.log('Submit');

        var return_to = getQueryParam('return_to', 'pebblejs://close#');
        document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));

    });

}

function loadOptions() {

    
    var $slantDirectionNumber = $('#slantDirectionNumber');
	var $bgPatternRadioButton = $('input[name="radio-1"]:checked').val();
	var $startupAnimationEnabled = $('#startupAnimCheckbox');
	var $showDate = $('#showDate');

    if (localStorage.slantDirectionNumber) {
    
        $slantDirectionNumber[0].value = localStorage.slantDirectionNumber;
		$bgPatternRadioButton[0].value = $('input[name="radio-1"][value="' + localStorage.bgPatternRadioButton + '"]').prop('checked', true);
		$startupAnimationEnabled[0].checked = localStorage.startupAnimationEnabled === 'true';
		$showDate[0].checked = localStorage.showDate === 'true';
    }
	
	
}

function showHideLabelsByPlatform(platform){
	if(platform=="aplite"){
		$(".hideit").toggle();
	}
}

function showHideImagesByPlatform(platform){
	
	var imgBasePath = "../v4/images/"
	
	if(platform=="aplite" || platform=="basalt" || platform=="chalk"){
		//nice!
	}
	else{
		platform = "basalt";
	}
	
	
	var x = document.getElementsByTagName("img");
	var i;
	for (i = 0; i < x.length; i++) {
		var img = x[i];
		img.src = imgBasePath + platform + "-" + i.toString() + ".png";
		//img.style.width = (platform == "chalk" ? "84px" : "72px");		
		//img.style.height = "84px";
		img.style.width = (platform == "chalk" ? "56px" : "48px");		
		img.style.height = "56px";
	}
}

function getAndStoreConfigData() {

        
    var $slantDirectionNumber = $('#slantDirectionNumber');  
	var $bgPatternRadioButton = $('input[name="radio-1"]:checked').val();
	var $startupAnimationEnabled = $('#startupAnimCheckbox');
	var $showDate = $('#showDate');
    
    var options = {
        
        slantDirectionNumber: $slantDirectionNumber.val(),
		bgPatternRadioButton: $bgPatternRadioButton,
		startupAnimationEnabled: $startupAnimationEnabled[0].checked,
		showDate: $showDate[0].checked
    };

    localStorage.slantDirectionNumber = options.slantDirectionNumber;
	localStorage.bgPatternRadioButton = options.bgPatternRadioButton;
	localStorage.startupAnimationEnabled = options.startupAnimationEnabled;
	localStorage.showDate = options.showDate;

    console.log('Got options: ' + JSON.stringify(options));
    return options;
}

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