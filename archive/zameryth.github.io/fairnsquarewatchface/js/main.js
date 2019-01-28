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


function close() {
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
}

function load_js() {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.type= 'text/javascript';
      script.src= 'bower_components/pebble-slate/dist/js/slate.min.js';
      head.appendChild(script);
}


function spectrum() {
  var $hourTens = document.getElementById('hourTens');
  var $hourOnes = document.getElementById('hourOnes');
  var $minTens = document.getElementById('minTens');
  var $minOnes = document.getElementById('minOnes');
  var $topLeft = document.getElementById('topLeft');
  var $topLeftType = document.getElementById('topLeftType');
  var $topRight = document.getElementById('topRight');
  var $topRightType = document.getElementById('topRightType');
  var $botLeft = document.getElementById('botLeft');
  var $botLeftType = document.getElementById('botLeftType');
  var $botRight = document.getElementById('botRight');
  var $botRightType = document.getElementById('botRightType');
  var $bgcolor = document.getElementById('bgcolor');
  var $datecolor = document.getElementById('datecolor');
  $hourTens.value = "0xFFFF00";
  $hourOnes.value = "0x55FF00";
  $minTens.value = "0xFF0055";
  $minOnes.value = "0x00AAFF";
  $topLeft.value = "0xAAAA00";
  $topLeftType.value = 1;
  $botLeft.value = "0xAA0000";
  $botLeftType.value = 1;
  $topRight.value = "0x005500";
  $topRightType.value = 1;
  $botRight.value = "0x0000AA";
  $botRightType.value = 1;
  $bgcolor.value = "0x000000";
  $datecolor.value = "0xFFFFFF";
  load_js();
}

function playfulstamps() {
  var $hourTens = document.getElementById('hourTens');
  var $hourOnes = document.getElementById('hourOnes');
  var $minTens = document.getElementById('minTens');
  var $minOnes = document.getElementById('minOnes');
  var $topLeft = document.getElementById('topLeft');
  var $topLeftType = document.getElementById('topLeftType');
  var $topRight = document.getElementById('topRight');
  var $topRightType = document.getElementById('topRightType');
  var $botLeft = document.getElementById('botLeft');
  var $botLeftType = document.getElementById('botLeftType');
  var $botRight = document.getElementById('botRight');
  var $botRightType = document.getElementById('botRightType');
  var $bgcolor = document.getElementById('bgcolor');
  var $datecolor = document.getElementById('datecolor');
  $hourTens.value = "0xFFAAFF";
  $hourOnes.value = "0xAAFF55";
  $minTens.value = "0xFFAAAA";
  $minOnes.value = "0x55FFFF";
  $topLeft.value = "0xFFFFFF";
  $topLeftType.value = 7;
  $botLeft.value = "0xFFFFFF";
  $botLeftType.value = 7;
  $topRight.value = "0xFFFFFF";
  $topRightType.value = 7;
  $botRight.value = "0xFFFFFF";
  $botRightType.value = 7;
  $bgcolor.value = "0x5500AA";
  $datecolor.value = "0xFFFFFF";
  load_js();
}


function jazzyred() {
  var $hourTens = document.getElementById('hourTens');
  var $hourOnes = document.getElementById('hourOnes');
  var $minTens = document.getElementById('minTens');
  var $minOnes = document.getElementById('minOnes');
  var $topLeft = document.getElementById('topLeft');
  var $topLeftType = document.getElementById('topLeftType');
  var $topRight = document.getElementById('topRight');
  var $topRightType = document.getElementById('topRightType');
  var $botLeft = document.getElementById('botLeft');
  var $botLeftType = document.getElementById('botLeftType');
  var $botRight = document.getElementById('botRight');
  var $botRightType = document.getElementById('botRightType');
  var $bgcolor = document.getElementById('bgcolor');
  var $datecolor = document.getElementById('datecolor');
  $hourTens.value = "0xFFFFFF";
  $hourOnes.value = "0xFFFFFF";
  $minTens.value = "0xFFFFFF";
  $minOnes.value = "0xFFFFFF";
  $topLeft.value = "0xAA0000";
  $topLeftType.value = 4;
  $botLeft.value = "0xAA0000";
  $botLeftType.value = 6;
  $topRight.value = "0xAA0000";
  $topRightType.value = 6;
  $botRight.value = "0xAA0000";
  $botRightType.value = 4;
  $bgcolor.value = "0x550000";
  $datecolor.value = "0xFFFFFF";
  load_js();
}


function coolblue() {
  var $hourTens = document.getElementById('hourTens');
  var $hourOnes = document.getElementById('hourOnes');
  var $minTens = document.getElementById('minTens');
  var $minOnes = document.getElementById('minOnes');
  var $topLeft = document.getElementById('topLeft');
  var $topLeftType = document.getElementById('topLeftType');
  var $topRight = document.getElementById('topRight');
  var $topRightType = document.getElementById('topRightType');
  var $botLeft = document.getElementById('botLeft');
  var $botLeftType = document.getElementById('botLeftType');
  var $botRight = document.getElementById('botRight');
  var $botRightType = document.getElementById('botRightType');
  var $bgcolor = document.getElementById('bgcolor');
  var $datecolor = document.getElementById('datecolor');
  $hourTens.value = "0x00FFFF";
  $hourOnes.value = "0x0055AA";
  $minTens.value = "0x0055AA";
  $minOnes.value = "0x00FFFF";
  $topLeft.value = "0x00FFFF";
  $topLeftType.value = 2;
  $botLeft.value = "0x00FFFF";
  $botLeftType.value = 0;
  $topRight.value = "0x00FFFF";
  $topRightType.value = 0;
  $botRight.value = "0x00FFFF";
  $botRightType.value = 2;
  $bgcolor.value = "0x0055AA";
  $datecolor.value = "0xFFFFFF";
  load_js();
}


function forestgreen() {
  var $hourTens = document.getElementById('hourTens');
  var $hourOnes = document.getElementById('hourOnes');
  var $minTens = document.getElementById('minTens');
  var $minOnes = document.getElementById('minOnes');
  var $topLeft = document.getElementById('topLeft');
  var $topLeftType = document.getElementById('topLeftType');
  var $topRight = document.getElementById('topRight');
  var $topRightType = document.getElementById('topRightType');
  var $botLeft = document.getElementById('botLeft');
  var $botLeftType = document.getElementById('botLeftType');
  var $botRight = document.getElementById('botRight');
  var $botRightType = document.getElementById('botRightType');
  var $bgcolor = document.getElementById('bgcolor');
  var $datecolor = document.getElementById('datecolor');
  $hourTens.value = "0x00FF00";
  $hourOnes.value = "0x00FF00";
  $minTens.value = "0x00FF00";
  $minOnes.value = "0x00FF00";
  $topLeft.value = "0x00AA00";
  $topLeftType.value = 5;
  $botLeft.value = "0x00AA00";
  $botLeftType.value = 5;
  $topRight.value = "0x00AA00";
  $topRightType.value = 5;
  $botRight.value = "0x00AA00";
  $botRightType.value = 5;
  $bgcolor.value = "0x005500";
  $datecolor.value = "0x00FFAA";
  load_js();
}

function original() {
  var $hourTens = document.getElementById('hourTens');
  var $hourOnes = document.getElementById('hourOnes');
  var $minTens = document.getElementById('minTens');
  var $minOnes = document.getElementById('minOnes');
  var $topLeft = document.getElementById('topLeft');
  var $topLeftType = document.getElementById('topLeftType');
  var $topRight = document.getElementById('topRight');
  var $topRightType = document.getElementById('topRightType');
  var $botLeft = document.getElementById('botLeft');
  var $botLeftType = document.getElementById('botLeftType');
  var $botRight = document.getElementById('botRight');
  var $botRightType = document.getElementById('botRightType');
  var $bgcolor = document.getElementById('bgcolor');
  var $datecolor = document.getElementById('datecolor');
  $hourTens.value = "0xFFFFFF";
  $hourOnes.value = "0xFFFFFF";
  $minTens.value = "0xFFFFFF";
  $minOnes.value = "0xFFFFFF";
  $topLeft.value = "0xAA0000";
  $topLeftType.value = 0;
  $botLeft.value = "0x0000AA";
  $botLeftType.value = 0;
  $topRight.value = "0x0000AA";
  $topRightType.value = 0;
  $botRight.value = "0xAA0000";
  $botRightType.value = 0;
  $bgcolor.value = "0x000000";
  $datecolor.value = "0xFFFFFF";
  load_js();
}

function loadOptions() {
  var $hourTens = document.getElementById('hourTens');
  var $hourOnes = document.getElementById('hourOnes');
  var $minTens = document.getElementById('minTens');
  var $minOnes = document.getElementById('minOnes');
  var $topLeft = document.getElementById('topLeft');
  var $topLeftType = document.getElementById('topLeftType');
  var $topRight = document.getElementById('topRight');
  var $topRightType = document.getElementById('topRightType');
  var $botLeft = document.getElementById('botLeft');
  var $botLeftType = document.getElementById('botLeftType');
  var $botRight = document.getElementById('botRight');
  var $botRightType = document.getElementById('botRightType');
  var $bgcolor = document.getElementById('bgcolor');
  var $datecolor = document.getElementById('datecolor');

  if (window.localStorage.hourTens) {
    $hourTens.value = window.localStorage.hourTens;
    $hourOnes.value = window.localStorage.hourOnes;
    $minTens.value = window.localStorage.minTens;
    $minOnes.value = window.localStorage.minOnes;
    $topLeft.value = window.localStorage.topLeft;
    $topLeftType.value = window.localStorage.topLeftType;
    $botLeft.value = window.localStorage.botLeft;
    $botLeftType.value = window.localStorage.botLeftType;
    $topRight.value = window.localStorage.topRight;
    $topRightType.value = window.localStorage.topRightType;
    $botRight.value = window.localStorage.botRight;
    $botRightType.value = window.localStorage.botRightType;
    $bgcolor.value = window.localStorage.bgcolor;
    $datecolor.value = window.localStorage.datecolor;
  }
}

function getAndStoreConfigData() {
  var $hourTens = document.getElementById('hourTens');
  var $hourOnes = document.getElementById('hourOnes');
  var $minTens = document.getElementById('minTens');
  var $minOnes = document.getElementById('minOnes');
  var $topLeft = document.getElementById('topLeft');
  var $topLeftType = document.getElementById('topLeftType');
  var $topRight = document.getElementById('topRight');
  var $topRightType = document.getElementById('topRightType');
  var $botLeft = document.getElementById('botLeft');
  var $botLeftType = document.getElementById('botLeftType');
  var $botRight = document.getElementById('botRight');
  var $botRightType = document.getElementById('botRightType');
  var $bgcolor = document.getElementById('bgcolor');
  var $datecolor = document.getElementById('datecolor');

  var options = {
    hourTens: $hourTens.value,
    hourOnes: $hourOnes.value,
    minTens: $minTens.value,
    minOnes: $minOnes.value,
    topRight: $topRight.value,
    topRightType: $topRightType.value,
    botRight: $botRight.value,
    botRightType: $botRightType.value,
    topLeft: $topLeft.value,
    topLeftType: $topLeftType.value,
    botLeft: $botLeft.value,
    botLeftType: $botLeftType.value,
    bgcolor: $bgcolor.value,
    datecolor: $datecolor.value,
  };

  window.localStorage.hourTens = options.hourTens;
  window.localStorage.hourOnes = options.hourOnes;
  window.localStorage.minTens = options.minTens;
  window.localStorage.minOnes = options.minOnes;
  window.localStorage.topLeft = options.topLeft;
  window.localStorage.topLeftType = options.topLeftType;
  window.localStorage.botLeft = options.botLeft;
  window.localStorage.botLeftType = options.botLeftType;
  window.localStorage.topRight = options.topRight;
  window.localStorage.topRightType = options.topRightType;
  window.localStorage.botRight = options.botRight;
  window.localStorage.botRightType = options.botRightType;
  window.localStorage.bgcolor = options.bgcolor;
  window.localStorage.datecolor = options.datecolor;

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
