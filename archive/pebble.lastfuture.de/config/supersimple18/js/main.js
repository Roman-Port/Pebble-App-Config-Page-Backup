function parse(val) {
    var result = "Not found",
        tmp = [];
    location.search
    //.replace ( "?", "" ) 
    // this is better, there might be a question mark inside
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    });
    return result;
}

(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#send');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $colorbg = $('#color-bg');
  var $colorm = $('#color-m');
  var $colorh = $('#color-h');
  var $colorp = $('#color-p');
  var $ticks = $('#ticks');
  var $colort = $('#color-t');

  if (localStorage.colorbg) {
    $colorbg[0].value = localStorage.colorbg;
    $colorm[0].value = localStorage.colorm;
    $colorh[0].value = localStorage.colorh;
    $colorp[0].value = localStorage.colorp;
    document.getElementById('shadows').checked = (localStorage.shadows === 'true');
    $ticks[0].value = localStorage.ticks;
    $colort[0].value = localStorage.colort;
    document.getElementById('rectticks').checked = (localStorage.rectticks === 'true');
    document.getElementById('btvibe').checked = (localStorage.btvibe === 'true');
    document.getElementById('invert').checked = (localStorage.invert === 'true');
    $('#whwidth'+localStorage.whwidth).prop('checked', true);
  }
  
  if(parse('rect') == 'true') {
      // $('.recthide').hide();
  } else {
      $('.roundhide').hide();
  }
  if(parse('bw') == 'true') {
      $('.bwhide').hide();
  } else {
      $('.colorhide').hide();
  }
}

function getAndStoreConfigData() {
  var $colorbg = $('#color-bg');
  var $colorm = $('#color-m');
  var $colorh = $('#color-h');
  var $colorp = $('#color-p');
  var $ticks = $('#ticks');
  var $colort = $('#color-t');

  var options = {
    colorbg: $colorbg.val(),
    colorm: $colorm.val(),
    colorh: $colorh.val(),
    colorp: $colorp.val(),
    shadows: ''+document.getElementById('shadows').checked,
    ticks: parseInt($ticks.val()),
    colort: $colort.val(),
    rectticks: ''+document.getElementById('rectticks').checked,
    btvibe: ''+document.getElementById('btvibe').checked,
    invert: ''+document.getElementById('invert').checked,
    whwidth: parseInt($('input[name=whwidth]:checked').val())
  };

  localStorage.colorbg = options.colorbg;
  localStorage.colorm = options.colorm;
  localStorage.colorh = options.colorh;
  localStorage.colorp = options.colorp;
  localStorage.shadows = options.shadows;
  localStorage.ticks = options.ticks;
  localStorage.colort = options.colort;
  localStorage.rectticks = options.rectticks;
  localStorage.btvibe = options.btvibe;
  localStorage.invert = options.invert;
  localStorage.whwidth = options.whwidth;

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