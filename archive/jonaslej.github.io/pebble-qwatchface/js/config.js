(function($) {
  $('#submit').click(function() {
    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    // Encode and send the data when the page closes
    document.location = return_to + encodeURIComponent(getConfig());
  });

  function getConfig() {
    // get colors
    var config = {
      'bgcolor' : $('#bgcolor').val(),
      'tmcolor' : $('#tmcolor').val(),
      'dtcolor' : $('#dtcolor').val(),
      'wdcolor' : $('#wdcolor').val(),
      'wccolor' : $('#wccolor').val(),
      'tpcolor' : $('#tpcolor').val(),
      'degcelc' : $('#degcelc')[0].checked,
    };

    for(item in config) {
      localStorage[item] = config[item]
    }

    console.log(JSON.stringify(config));

    return JSON.stringify(config);
  }

  function loadConfig() {
    console.log("loading config... " + JSON.stringify(localStorage));
    var debug = parseInt(getQueryParam('debug', 0));
    if(debug) {
      $('#debug').removeClass('hidden');
    }
    $('#debug-content').append('Loading localStorage<br />');
    for(item in localStorage) {
      $('#debug-content').append(item + ':' + localStorage[item] + ' ' + typeof(localStorage[item]) + ' ' + '<br />');
      if($('#' + item)[0]) {
        if(typeof(localStorage[item]) == 'boolean' ||
            (localStorage[item] === 'true' || localStorage[item] === 'false')) {
          $('#debug-content').append('#(' + item + ').checked = ' + $('#' + item)[0].checked + '<br />');
          $('#' + item)[0].checked = (localStorage[item] === 'true');
          $('#debug-content').append('#(' + item + ').checked = ' + $('#' + item)[0].checked + '<br />');
        } else {
          $('#' + item)[0].value = localStorage[item];
          if(item.indexOf('color') != -1) {
            $('#' + item).parent().find('.item-styled-color .value').css("background-color", localStorage[item]);
          }
        }
      }
    }
  }

  // Determine the correct return URL (emulator vs real watch)
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

  loadConfig();
}(Zepto));
