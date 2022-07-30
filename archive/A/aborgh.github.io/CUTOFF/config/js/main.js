(function (){
    loadOptions()
    submitHandler();
})();

function submitHandler(){
var $submitButton = $('#submitButton');

$submitButton.on('click' ,function(){
    console.log('Submit');
    
    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location =return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
});
}
function loadOptions (){
    console.log('Loaded Options');
    var $invertFaceCheckbox = $('#invertFaceCheckbox');
    var $bluetoothFormatCheckbox = $('#bluetoothFormatCheckbox');
    var $showDateCheckbox = $('#showDateCheckbox');
    
   if(localStorage.invertFace) {
       console.log('Read Localstorage');
        $invertFaceCheckbox[0].checked = localStorage.invertFace === 'true';
        $bluetoothFormatCheckbox[0].checked = localStorage.bluetoothVibration === 'true';
        $showDateCheckbox[0].checked = localStorage.showDate === 'true';
    }
    
}

function getAndStoreConfigData(){
    console.log('Loaded ConfigData');
    var $invertFaceCheckbox = $('#invertFaceCheckbox');
    var $bluetoothFormatCheckbox = $('#bluetoothFormatCheckbox');
    var $showDateCheckbox = $('#showDateCheckbox');
    
    var options = {
        invertFace: $invertFaceCheckbox[0].checked,
        bluetoothVibration: $bluetoothFormatCheckbox[0].checked,
        showDate: $showDateCheckbox[0].checked
    };
    
    localStorage.invertFace = options.invertFace;
    localStorage.bluetoothVibration = options.bluetoothVibration;
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
