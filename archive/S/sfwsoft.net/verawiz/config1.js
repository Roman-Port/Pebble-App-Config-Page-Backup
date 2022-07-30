  // Determine the correct return URL (emulator vs real watch)

	var Validated = false;

	

	if (document.body.addEventListener){

		document.body.addEventListener('click',ClickHandler,false);

	}

	else{

		document.body.attachEvent('onclick',ClickHandler);//for IE

	}

	

	document.getElementById("vera_list").addEventListener("change", VeraChanged);

	

	function VeraChanged() {

		//console.log("Vera List Selection Changed");

		GetVeraDevices();

	}



	var xhrRequest = function (url, type, callback,timeout) {

	  var xhr = new XMLHttpRequest();

	  xhr.onload = function () {

		callback(this.responseText);

		console.log("Response: " + this.responseText);

	  };

	  xhr.ontimeout = function () {

		callback("timeout");

		console.log("timeout");

	  };

	  xhr.onerror = function () {

		callback("error");

		console.log("error");

	  };

	  timeout = typeof timeout !== 'undefined' ? timeout : 60000;  

	  xhr.timeout = timeout;

	  xhr.open(type, url);

	  xhr.send();

	};	

	

	function ValidateCredentials() {

		Validated  = false;

		

		if (document.getElementById("login").value == "") {

		  document.getElementById("credentials_subtext").innerHTML = "[NO LOGIN SPECIFIED]";

		  Validated = false;

		} else if (document.getElementById("password").value == "") {

		  document.getElementById("credentials_subtext").innerHTML = "[NO PASSWORD SPECIFIED]";

		  Validated = false;

		} else

		{

			Validated = true;

		}

		return Validated;

	}

	

	function ParseDeviceList(json) {

	    var device_lookup = document.getElementById("device_lookup");

		var temp_list = "";

		for ( var i = 0; i < json.devices.length; i++ ) {

			console.log(json.devices[i].name + " - " + json.devices[i].category);

			if (json.devices[i].category == 2 || json.devices[i].category == 3 || json.devices[i].category == 7 || json.devices[i].category == 0) {

				temp_list += json.devices[i].name + ' - [' + json.devices[i].id + '],';
				console.log(json.devices[i].name + " - " + json.devices[i].category + " ADDED");

			}

		}

		device_lookup.setAttribute('data-list',temp_list);

		localStorage['device_list'] = temp_list;

		

	    var scene_lookup = document.getElementById("scene_lookup");

		temp_list = "";

		for ( var i = 0; i < json.scenes.length; i++ ) {

			temp_list += json.scenes[i].name + ' - [' + json.scenes[i].id + '],';

		}

		scene_lookup.setAttribute('data-list',temp_list);

		localStorage['scene_list'] = temp_list;

	  document.getElementById("credentials_subtext").innerHTML = "[DEVICES AND SCENES LOADED!]";	

	}

	

	function save_url(login,pass,url) {

	  console.log("Saving URL: " + url);

	  //now call Device List!!

	  var proxyurl = 'http://sfwsoft.net/verawiz/VeraFunctions.php?login='+login+'&password='+pass+'&action=fetchurl&url='+url+'id=sdata';

	  //console.log(proxyurl);

	  xhrRequest(proxyurl, 'GET', 

		function(responseText) {

		  // responseText contains a JSON object with ha data

		  //console.log(responseText);

		  var json = JSON.parse(responseText);

		  ParseDeviceList(json);

		});

	  

	}	

	function get_device_url(login, pass, device) {

	  if (device ==="") {

		document.getElementById("credentials_subtext").innerHTML = "[NO UNITS RETURNED :(]";

		return;

	  }

	  var url = 'http://sfwsoft.net/verawiz/VeraFunctions.php?login='+login+'&password='+pass+'&action=deviceurl&device='+device;

	  document.getElementById("credentials_subtext").innerHTML = "[RETRIEVING DEVICES AND SCENES...]";	

	  xhrRequest(url, 'GET', 

		function(responseText) {

		  // responseText contains a JSON object with ha data

		  console.log(responseText);

		  var url_json = JSON.parse(responseText);

		  console.log('Tesing internal: ' + url_json.URL_INT+ 'id=alive');

		  //Test internal URL

		  if (url_json.hasOwnProperty('URL_INT')) {		  

			  xhrRequest(url_json.URL_INT+ 'id=alive', 'GET', 

				function(responseText) {

				  //Test internal URL

				  if (responseText == "OK") {

					console.log("Internal URL OK, using it");

					save_url(login,pass,url_json.URL_INT);

				  } else {

					console.log("Internal URL unreachable, falling back to External - "+ responseText);

					save_url(login,pass,url_json.URL_EXT);

				  }

				},2000);

			} else {

				document.getElementById("credentials_subtext").innerHTML = "[VERA SERVER ERROR! Try Later...]";		

			}

		});

	  

	}	

	function GetVeraDevices() {

		var login = document.getElementById("login").value;

		var pass = document.getElementById("password").value;

		var device = document.getElementById("vera_list").value;

		get_device_url(login,pass,device);	

	}



	function GetVeraData() {

		//try this

		ValidateCredentials();

		if (!Validated) {

			//document.getElementById("credentials_subtext").innerHTML = "[CHECK LOGIN & PASSWORD!!]";

			return;

		}

		var login = document.getElementById("login").value;

		var password = document.getElementById("password").value;

		var url = 'http://sfwsoft.net/verawiz/VeraFunctions.php?login='+login+'&password='+password+'&action=devicelist';

		console.log(url);

  	    document.getElementById("credentials_subtext").innerHTML = "[RETRIEVING LIST OF VERA UNITS...]";



		xhrRequest(url, 'GET', 

		function(responseText) {

		  //populate select list

		  console.log(responseText);

		  if (responseText == "error" || responseText == "timeout") {

			document.getElementById("credentials_subtext").innerHTML = "[ERROR or TIMEOUT!!]";

			return;

		  }

		  var json = JSON.parse(responseText);

		  if (json.STATUS != "OK") {

			document.getElementById("credentials_subtext").innerHTML = "[VERA REPORTS:"+ json.STATUS + "]";

			return;

		  }

		  localStorage['unit_list'] = JSON.stringify(json.DEVICES);

		  var vera_select = document.getElementById("vera_list");

		  vera_select.innerHTML = "";

		  for ( var i = 0; i < json.DEVICES.length; i++ ) {

			var newOption = document.createElement("option");

			newOption.value = json.DEVICES[i].PK_Device;

			newOption.innerHTML = json.DEVICES[i].PK_Device + ' - ' + json.DEVICES[i].Name;

			vera_select.options.add(newOption);

		  }

		  document.getElementById("credentials_subtext").innerHTML = "[VERA LIST LOADED!]";

		  GetVeraDevices();

		});

			

	}

	

	

	function ClickHandler(e){

		e = e || window.event;

		var target = e.target || e.srcElement;

		//console.log(target.className);

		if (target.id.match("validate_button"))

		{

			GetVeraData();

		}		

		if (target.className.match("item-toggle") || target.className.match("item-select"))

		{

			//SetStates();

		}

	}



	function devices_added() {

		var dev_list = document.getElementById('device_lookup');

		console.log("decode");

		var Id_list = [];

		$('#device_lookup').find('div').each(function(){

			if ($(this).attr('class') == 'item') {

				var text = $(this).text();

				var Id = text.split('[')[1].replace(']','');

				Id_list.push(Id);

			}

		});

		return Id_list.join(',');

	}	

	

	function scenes_added() {

		var scn_list = document.getElementById('scene_lookup');

		var Id_list = [];

		$('#scene_lookup').find('div').each(function(){

			if ($(this).attr('class') == 'item') {

				var text = $(this).text();

				var Id = text.split('[')[1].replace(']','');

				Id_list.push(Id);

			}

		});

		return Id_list.join(',');

	}		

  



  // Get a handle to the button's HTML element

  var submitButton = document.getElementById('submit_button');

  var pass_global = "";



  // Add a 'click' listener

  submitButton.addEventListener('click', function() {

    // Get the config data from the UI elements

    var login = document.getElementById('login');

    var password = document.getElementById('password');

	var unit = document.getElementById('vera_list');

	var devices = devices_added();

	var scenes = scenes_added();

	

	

    // Make a data object to be sent, coercing value types to integers

	

    var options = {

	  'login': login.value,

	  'password': password.value,

	  'unit': unit.value,

	  'devices': devices,

	  'scenes': scenes

    };

	

    // Save for next launch

    localStorage['login'] = options['login'];

    localStorage['password'] = options['password'];

	localStorage['unit'] = options['unit'];

	localStorage['devices_selected'] = document.getElementById('device_lookup').innerHTML;

	localStorage['scenes_selected'] = document.getElementById('scene_lookup').innerHTML;



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

    var return_to = getQueryParam('return_to', 'pebblejs://close#');



    // Encode and send the data when the page closes

    document.location = return_to + encodeURIComponent(JSON.stringify(options));

  });

  

  (function() {



    // Load any previously saved configuration, if available

    if(localStorage['login']) {

	  var login = document.getElementById('login');

	  var password = document.getElementById('password');

	  login.value = localStorage['login'];

	  password.value = localStorage['password'];

    }

	if(localStorage['unit_list']) {

	  var units = JSON.parse(localStorage['unit_list']);

	  var vera_select = document.getElementById("vera_list");

	  vera_select.innerHTML = "";

		

	  for ( var i = 0; i < units.length; i++ ) {

		var newOption = document.createElement("option");

		newOption.value = units[i].PK_Device;

		newOption.innerHTML = units[i].PK_Device + ' - ' + units[i].Name;

		vera_select.options.add(newOption);

	  }

		

	}

    if(localStorage['unit']) {

	  var unit = document.getElementById('vera_list');

	  unit.value = localStorage['unit'];

    }



	if(localStorage['devices_selected']) {

		var device_lookup = document.getElementById('device_lookup');

		var temp = localStorage['devices_selected'].replace('<div class="item add-item">Add one more...</div>','');

		device_lookup.innerHTML = temp;



	}

	if(localStorage['device_list']) {

		var device_lookup = document.getElementById('device_lookup');

		device_lookup.setAttribute('data-list',localStorage['device_list']);

	}



	if(localStorage['scenes_selected']) {

		var device_lookup = document.getElementById('scene_lookup');

		var temp = localStorage['scenes_selected'].replace('<div class="item add-item">Add one more...</div>','');

		device_lookup.innerHTML = temp;



	}

	if(localStorage['scene_list']) {

		var device_lookup = document.getElementById('scene_lookup');

		device_lookup.setAttribute('data-list',localStorage['scene_list']);

	}



})();

