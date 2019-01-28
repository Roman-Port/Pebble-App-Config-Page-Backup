(function() {
  console.log('anon function');
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  console.log('submitHandler()');
  var $submitButton = $('#submitButton');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  console.log('loadOptions()');
  var $backgroundColorPicker = $('#backgroundColorPicker');
  var $enableAnimate = $('#enableAnimate');
  var $scrollSpeed = $('#scrollSpeed');
  var $animateOnTap = $('#animateOnTap');
  var $sleepPeriod = $('#sleepPeriod');
  var $startSleepTime = $('#startSleepTime');
  var $endSleepTime = $('#endSleepTime');

  if (localStorage.backgroundColor) {
    $backgroundColorPicker[0].value = localStorage.backgroundColor;
  }
  if (localStorage.enableAnimate) {
    $enableAnimate[0].checked = (localStorage.enableAnimate==='true');
  }
  if (localStorage.scrollSpeed) {
    $scrollSpeed[0].value = localStorage.scrollSpeed;
  }
  if (localStorage.animateOnTap) {
    $animateOnTap[0].checked = (localStorage.animateOnTap==='true');
  }
  if (localStorage.sleepPeriod) {
    $sleepPeriod[0].checked = (localStorage.sleepPeriod==='true');
  }
  if (localStorage.startSleepTime) {
    $startSleepTime[0].value = localStorage.startSleepTime;
  }
  if (localStorage.endSleepTime) {
    $endSleepTime[0].value = localStorage.endSleepTime;
  }
}

function getAndStoreConfigData() {
  console.log('getAndStoreConfigData()');
  var $backgroundColorPicker = $('#backgroundColorPicker');
  var $enableAnimate = $('#enableAnimate');
  var $scrollSpeed = $('#scrollSpeed');
  var $animateOnTap = $('#animateOnTap');
  var $sleepPeriod = $('#sleepPeriod');
  var $startSleepTime = $('#startSleepTime');
  var $endSleepTime = $('#endSleepTime');

  var options = {
    backgroundColor: $backgroundColorPicker.val(),
    enableAnimate: $enableAnimate[0].checked,
    scrollSpeed: $scrollSpeed.val(),
    animateOnTap: $animateOnTap[0].checked,
    sleepPeriod: $sleepPeriod[0].checked,
    startSleepTime: $startSleepTime.val(),
    endSleepTime: $endSleepTime.val()
  };
  
  localStorage.backgroundColor = options.backgroundColor;
  localStorage.enableAnimate = options.enableAnimate;
  localStorage.scrollSpeed = options.scrollSpeed;
  localStorage.animateOnTap = options.animateOnTap;
  localStorage.sleepPeriod = options.sleepPeriod;
  localStorage.startSleepTime = options.startSleepTime;
  localStorage.endSleepTime = options.endSleepTime;

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i=0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}
