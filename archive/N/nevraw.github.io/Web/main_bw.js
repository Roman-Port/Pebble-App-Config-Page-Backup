(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
  console.log('Submit');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
  console.log('Cancel');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}


function loadOptions() {

 var $invertCheckbox = $('#invertCheckbox');

 if (localStorage.invert) {
  $invertCheckbox[0].checked = localStorage.invert === '1';
 }

} 

 
function getAndStoreConfigData() {
// console.log('digital value: ' + $digitalValue);

 var $invertCheckbox = $('#invertCheckbox');
 var $invertValue = 0;
 if ($invertCheckbox[0].checked) {
   $invertValue = 1; 
 }
 console.log('invert value: ' + $invertValue);
 
 var options = {
  invert: $invertValue
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.invert = $invertValue;

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
