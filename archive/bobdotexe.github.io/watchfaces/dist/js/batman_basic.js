(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#submitButton');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $vib = $('#vib');
  var $fast = $('#fast');
  var $med = $('#med');
  var $slow = $('#slow');
  var $short = $('#short');
  var $norm = $('#norm');
  var $long = $('#long');
  var $flash = $('#flash');


  if (localStorage.vib) {
    $vib[0].checked = localStorage.vib === 'true';
	$fast[0].checked = localStorage.fast === 'true'
	$med[0].checked = localStorage.med === 'true';
    $slow[0].checked = localStorage.slow === 'true';
	$short[0].checked = localStorage.short === 'true';
	$norm[0].checked = localStorage.norm === 'true'
	$long[0].checked = localStorage.long === 'true';
    $flash[0].checked = localStorage.flash === 'true';
  }
}

function getAndStoreConfigData() {
  var $vib = $('#vib');
  var $fast = $('#fast');
  var $med = $('#med');
  var $slow = $('#slow');
  var $short = $('#short');
  var $norm = $('#norm');
  var $long = $('#long');
  var $flash = $('#flash');


  var options = {
	vib: $vib[0].checked,
    fast: $fast[0].checked,
	med: $med[0].checked,
	slow: $slow[0].checked,
	short: $short[0].checked,
    norm: $norm[0].checked,
	long: $long[0].checked,
	flash: $flash[0].checked,
    
  };

  localStorage.vib = options.vib;
  localStorage.fast = options.fast;
  localStorage.med = options.med;
  localStorage.slow = options.slow;
  localStorage.short = options.short;
  localStorage.norm = options.norm;
  localStorage.long = options.long;
  localStorage.flash = options.flash;

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
