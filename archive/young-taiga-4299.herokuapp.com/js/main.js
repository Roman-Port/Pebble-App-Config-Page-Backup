// Page elements ---------------------------------------------------------------
var $submitButton = $('#submitButton');

$submitButton.on('click', function() {
  console.log('Submit');

  if (document.getElementById("messengerName").getAttribute('type') == 'hidden' || $("#messengerName").val() == '') {
    close();
  } else {
    isValidUsername(function(isValid) {
      if (!isValid) {
        prompt();
      } else {
        close();
      }
    })
  }

  function prompt() {
    document.getElementById("p2").innerHTML = 'Invalid/Unavailable username. Please try again.';
  }
  function close() {
    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to +
    encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  }
});

function checkedRadioBtn(sGroupName) {   
  var group = document.getElementsByName(sGroupName);

  for ( var i = 0; i < group.length; i++) {
    if (group.item(i).checked) {
      return group.item(i).value;
    } else if (group[0].type !== 'radio') {
      return null;
    }
  }
}

function getAndStoreConfigData() {
  var friendName = $("#friendName").val();
  var messengerName = $("#messengerName").val();
  var summonerName = $("#summonerName").val();
  var serverRegion = checkedRadioBtn('radio-1');

  var options = {
    friendName: friendName,
    messengerName: messengerName,
    summonerName: summonerName,
    serverRegion: serverRegion
  };

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

// Load current user data if available -----------------------------------------
var API_ROOT = 'https://young-taiga-4299.herokuapp.com';

checkAccountExists();

function checkAccountExists() {
  var accountToken = getQueryParam('accountToken', null);
  var xhr = new XMLHttpRequest();
  var url = API_ROOT + '/checkAccountExists/' + accountToken;
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.responseText == 'null') {
      fillInput();
      return;
    }
    var data = JSON.parse(xhr.responseText).userName.toString();
    if (data.length < 2) return;
    console.log(' ## checkAccountExists, back in JS kit. [INFO]: ' + data);
    fillInput(data);
  };
  xhr.send();
}

function isValidUsername(callback) {
  var username = $("#messengerName").val();
  if (username.indexOf(' ') >= 0) {
    callback(false);
    return;
  }
  var xhr = new XMLHttpRequest();
  var url = API_ROOT + '/doesUserExist/' + username;
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.responseText == 'null') {
      callback(true);
    } else {
      callback(false);
    }
  };
  xhr.send();
}


// Fill in data if it exists ---------------------------------------------------
function fillInput(userName) {
  var msgName = userName;
  if (msgName && msgName !== 'undefined') {
    document.getElementById("p1").innerHTML = "USERNAME: " + msgName;
    document.getElementById("messengerName").setAttribute("type", "hidden");
    document.getElementById("friendName").setAttribute("type", "text");
    $('#messengerName').val(msgName);
    document.getElementById("messengerName").readOnly = true;
  }
  var sumName = getQueryParam('summonerName', null);
  if (sumName && sumName !== 'undefined') {
    $('#summonerName').val(sumName);
  }
  var svrReg = getQueryParam('serverRegion', null);
  if (svrReg && svrReg !== 'undefined') {
    document.getElementById(svrReg).checked = true;
  }
}

// Retrieve encoded variables in url -------------------------------------------
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
