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

// Radio control for time display
var $digitalValue;
$("input[name=digital]").change(function () {
 $digitalValue = parseInt(this.value);
});

var $dateValue;
$("input[name=datemode]").change(function () {
 $datemodeValue = parseInt(this.value);
});

function loadOptions() {
if (localStorage.digital) {
  $digitalValue = localStorage.digital;
//  console.log('localStorage.digital: ' + $digitalValue);
  // setting radio' value
 } else {
  $digitalValue = 1;
//  console.log('localStorage.digital was undefined, now set to: ' + $digitalValue);
 }
 $("input[name=digital][value='" + $digitalValue + "']").attr('checked', 'checked');

 var $invertCheckbox = $('#invertCheckbox');

 if (localStorage.invert) {
  $invertCheckbox[0].checked = localStorage.invert === '1';
 }

 if (localStorage.datemode) {
  $datemodeValue = localStorage.datemode;
//  console.log('localStorage.datemode: ' + $datemodeValue);
  // setting radio' value
 } else {
  $datemodeValue = 0;
//  console.log('localStorage.datemode was undefined, now set to: ' + $datemodeValue);
 }
 $("input[name=datemode][value='" + $datemodeValue + "']").attr('checked', 'checked');
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
  digital: $digitalValue,
  invert: $invertValue,
  datemode: $datemodeValue
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.digital = $digitalValue;
 localStorage.invert = $invertValue;
 localStorage.datemode = $datemodeValue;

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
