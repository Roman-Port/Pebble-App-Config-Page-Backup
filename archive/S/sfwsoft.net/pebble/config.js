  // Determine the correct return URL (emulator vs real watch)
	var Validated = false;
	var subtext_html = 'V1.57 - For more info and Registration, visit our website: <a href="http://sfwsoft.net/yawn.html">SFWsoft.net</a>';
	var registered_emails = "";
	
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
	var platform_version = getQueryParam('platform','');
	//if the platform is APLITE, we need to hide the color pickers.
    
	
	if (document.body.addEventListener){
		document.body.addEventListener('click',ClickHandler,false);
	}
	else{
		document.body.attachEvent('onclick',ClickHandler);//for IE
	}
	
	document.getElementById("home_auto_icons_show").addEventListener("change", SetStates);
	
	function ValidateKey() {
		Validated  = false;
		var email = document.getElementById("email").value.toUpperCase().trim();
		registered_emails = registered_emails.toUpperCase();
		
		if (document.getElementById("password").value == "") {
		  document.getElementById("registration_subtext").innerHTML = "[NO KEY SPECIFIED] - " + subtext_html;
		  Validated = false;
		} else if (document.getElementById("password").value == "gifted!" || document.getElementById("password").value == "trial") {
			//localStorage.removeItem('trial_date');
			if(localStorage['trial_date']) {
				var d = new Date(localStorage['trial_date']);
			}
			else {
				var d = new Date(new Date().getTime()+ 86400000 * 7);
			}
			localStorage['trial_date'] = d.toJSON();
			if (d.getTime() > new Date().getTime()) {
				document.getElementById("registration_subtext").innerHTML = "[TRIAL to: " + d.toDateString() + " ] " + subtext_html;
				Validated = true;
			} else {
				document.getElementById("registration_subtext").innerHTML = "[TRIAL EXPIRED on: " + d.toDateString() + " ] " + subtext_html;
				Validated = false;
			}
		  
		} else if (email.indexOf("@") > -1 && (registered_emails.indexOf(email) > -1)) {
		  document.getElementById("registration_subtext").innerHTML = "[REGISTERED!] - " + subtext_html;
		  Validated = true;
		} else
		{
		  document.getElementById("registration_subtext").innerHTML = "[INVALID KEY/EMAIL!] - " + subtext_html;
		  Validated = false;
		}
		SetStates();
	}

	
	function SetStates() {
		//Battery
		if (document.getElementById("battery_show").checked) {
			document.getElementById("battery_mode_label").style.display = '';
			document.getElementById("battery_color").style.display = '';
		} else {
			document.getElementById("battery_mode_label").style.display = 'none';
			document.getElementById("battery_color").style.display = 'none';
		}

		//Bluetooth
		if (document.getElementById("bluetooth_show").checked) {
			document.getElementById("bluetooth_color").style.display = '';
		} else {
			document.getElementById("bluetooth_color").style.display = 'none';
		}

		//Health
		if (document.getElementById("health_enabled").checked) {
			document.getElementById("steps_show_label").style.display = '';
			document.getElementById("steps_color").style.display = '';
		} else {
			document.getElementById("steps_show_label").style.display = 'none';
			document.getElementById("steps_color").style.display = 'none';
		}
		
		//Registration check
		if (Validated) {
			document.getElementById("home_auto_icons_show").disabled = false;
			document.getElementById("theme").disabled = false;
		}
		else {
			document.getElementById("home_auto_icons_show").value = "YAWN";
			document.getElementById("home_auto_icons_show").disabled = true;
			document.getElementById("theme").value = "Mellow Dots";
			document.getElementById("theme").disabled = true;
		}

		//Bottom Bar
		if (document.getElementById("home_auto_icons_show").value.match("CUSTOM TEXT")) {
			document.getElementById("set_one_label").style.display = '';
			document.getElementById("set_two_label").style.display = '';
			document.getElementById("set_one_text").innerText = "Small Text";
			document.getElementById("set_two_text").innerText = "Big Text";
		} else if (document.getElementById("home_auto_icons_show").value.match("2ND TIMEZONE")) {
			document.getElementById("set_one_label").style.display = '';
			document.getElementById("set_two_label").style.display = '';
			document.getElementById("set_one_text").innerText = "Time-zone (name)";
			document.getElementById("set_two_text").innerText = "GMT offset (+1,-2 etc)";
		}
		else {
			document.getElementById("set_one_label").style.display = 'none';
			document.getElementById("set_two_label").style.display = 'none';
		}

		if (!Validated || platform_version == "APLITE" )
		{
			document.getElementById("theme_color_label").style.display = 'none';
			document.getElementById("background_color_label").style.display = 'none';
			document.getElementById("date_color_label").style.display = 'none';
			document.getElementById("clock_color_label").style.display = 'none';
			document.getElementById("clock_div").style.display = 'none';
			document.getElementById("battery_color_label").style.display = 'none';
			document.getElementById("bluetooth_color_label").style.display = 'none';
			document.getElementById("temp_color_label").style.display = 'none';
			document.getElementById("weather_color_label").style.display = 'none';
			document.getElementById("city_color_label").style.display = 'none';
			document.getElementById("steps_color_label").style.display = 'none';
			document.getElementById("bar_major_color_label").style.display = 'none';
			document.getElementById("bar_minor_color_label").style.display = 'none';
		}
		else {
			document.getElementById("background_color_label").style.display = '';
			document.getElementById("theme_color_label").style.display = '';
			document.getElementById("date_color_label").style.display = '';
			document.getElementById("clock_color_label").style.display = '';
			document.getElementById("clock_div").style.display = '';
			document.getElementById("battery_color_label").style.display = '';
			document.getElementById("bluetooth_color_label").style.display = '';
			document.getElementById("temp_color_label").style.display = '';
			document.getElementById("weather_color_label").style.display = '';
			document.getElementById("city_color_label").style.display = '';
			document.getElementById("steps_color_label").style.display = '';
			document.getElementById("bar_major_color_label").style.display = '';
			document.getElementById("bar_minor_color_label").style.display = '';
		}

	}
	
	function ClickHandler(e){
		e = e || window.event;
		var target = e.target || e.srcElement;
		console.log(target.className);
		if (target.id.match("validate_button"))
		{
			ValidateKey();
		}		
		if (target.className.match("item-toggle") || target.className.match("item-select"))
		{
			SetStates();
		}
	}	
  
  //Load Registrations list
    var reg_list = new XMLHttpRequest();
	reg_list.open('GET', 'api/registrations.txt');
	reg_list.onreadystatechange = function() {
		if (reg_list.readyState == 4 && reg_list.status == 200) {	
		  registered_emails = reg_list.responseText;
		  ValidateKey();
		}
	}
	reg_list.send();

  // Get a handle to the button's HTML element
  var submitButton = document.getElementById('submit_button');
  var pass_global = "";

  // Add a 'click' listener
  submitButton.addEventListener('click', function() {
    // Get the config data from the UI elements
    var theme = document.getElementById('theme');
	var bluetooth_show = document.getElementById('bluetooth_show');
    var battery_show = document.getElementById('battery_show');
    var battery_mode = document.getElementById('battery_mode');
    var automation_buttons_show = document.getElementById('home_auto_icons_show');
    var vibe_mode = document.getElementById('vibe_mode');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
	var update_freq = document.getElementById('update_freq');
	var health_enabled = document.getElementById('health_enabled');
	var steps_show = document.getElementById('steps_show');
	var set_one = document.getElementById('set_one');
	var set_two = document.getElementById('set_two');
	var manual_city = document.getElementById('manual_city');	
	
	var set_theme_color = document.getElementById('theme_color');
	var set_background_color = document.getElementById('background_color');
	var set_date_color = document.getElementById('date_color');
	var set_clock_color = document.getElementById('clock_color');
	var set_battery_color = document.getElementById('battery_color');
	var set_bluetooth_color = document.getElementById('bluetooth_color');
	var set_temp_color = document.getElementById('temp_color');
	var set_weather_color = document.getElementById('weather_color');
	var set_city_color = document.getElementById('city_color');
	var set_steps_color = document.getElementById('steps_color');
	var set_bar_major_color = document.getElementById('bar_major_color');
	var set_bar_minor_color = document.getElementById('bar_minor_color');

	function getTemperatureFormatIndex() {
	  var tabs = document.getElementsByName("tab-1");
	  for(var t = 0; t < tabs.length; t++) {
		var tbclasses = tabs[t].className.split(" ");
		for(var i = 0; i < tbclasses.length; i++) {
		  if(tbclasses[i] === "active") {
			return t;
		  }
		}
	  }
	}
	
    var temp_mode_index = getTemperatureFormatIndex();
	
    // Make a data object to be sent, coercing value types to integers
	
    var options = {
      'bluetooth_show': bluetooth_show.checked == true ? 1 : 0,
      'battery_show': battery_show.checked == true ? 1 : 0,
	  'battery_mode': battery_mode.value,
	  'temp_mode': temp_mode_index,
      'home_auto_show': automation_buttons_show.value,
	  'vibe_mode': vibe_mode.value,
	  'email': email.value,
	  'password': password.value,
	  'update_freq': update_freq.value,
	  'health_enabled': health_enabled.checked == true ? 1 : 0,
	  'steps_show': steps_show.checked == true ? 1 : 0,
	  'set_one': set_one.value,
	  'set_two': set_two.value,
	  'set_date_color': set_date_color.value,
	  'set_clock_color': set_clock_color.value,
	  'set_battery_color': set_battery_color.value,
	  'set_bluetooth_color': set_bluetooth_color.value,
  	  'set_temp_color': set_temp_color.value,
  	  'set_weather_color': set_weather_color.value,
  	  'set_city_color': set_city_color.value,
	  'set_steps_color': set_steps_color.value,
	  'set_bar_major_color': set_bar_major_color.value,
	  'set_bar_minor_color': set_bar_minor_color.value,
	  'theme': theme.value,
	  'set_theme_color': set_theme_color.value,
	  'set_background_color': set_background_color.value,
	  'manual_city': manual_city.value,
    };
	
    // Save for next launch
    localStorage['bluetooth_show'] = options['bluetooth_show'];
    localStorage['battery_show'] = options['battery_show'];
    localStorage['battery_mode'] = options['battery_mode'];
    localStorage['temp_mode'] = options['temp_mode'];
    localStorage['home_auto_show'] = options['home_auto_show'];
    localStorage['vibe_mode'] = options['vibe_mode'];
    localStorage['email'] = options['email'];
    localStorage['password'] = options['password'];
	localStorage['update_freq'] = options['update_freq'];
	localStorage['health_enabled'] = options['health_enabled'];
	localStorage['steps_show'] = options['steps_show'];
	localStorage['set_one'] = options['set_one'];
	localStorage['set_two'] = options['set_two'];
	localStorage['manual_city'] = options['manual_city'];
	
	localStorage['set_date_color'] = options['set_date_color'];
	localStorage['set_clock_color'] = options['set_clock_color'];
	localStorage['set_battery_color'] = options['set_battery_color'];
	localStorage['set_bluetooth_color'] = options['set_bluetooth_color'];
	localStorage['set_temp_color'] = options['set_temp_color'];
	localStorage['set_weather_color'] = options['set_weather_color'];
	localStorage['set_city_color'] = options['set_city_color'];
	localStorage['set_steps_color'] = options['set_steps_color'];
	localStorage['set_bar_major_color'] = options['set_bar_major_color'];
	localStorage['set_bar_minor_color'] = options['set_bar_minor_color'];
    localStorage['theme'] = options['theme'];
	localStorage['set_theme_color'] = options['set_theme_color'];
	localStorage['set_background_color'] = options['set_background_color'];
	
    // Determine the correct return URL (emulator vs real watch)

    var return_to = getQueryParam('return_to', 'pebblejs://close#');

    // Encode and send the data when the page closes
    document.location = return_to + encodeURIComponent(JSON.stringify(options));
  });
  
  (function() {
    var bluetooth_show = document.getElementById('bluetooth_show');
    var battery_show = document.getElementById('battery_show');
    var battery_mode = document.getElementById('battery_mode');
	var temp_mode_c = document.getElementById('tab-1-c');
	var temp_mode_f = document.getElementById('tab-1-f');
    var automation_buttons_show = document.getElementById('home_auto_icons_show');
    var vibe_mode = document.getElementById('vibe_mode');
	var email = document.getElementById('email');
	var password = document.getElementById('password');
	var update_freq = document.getElementById('update_freq');
	var health_enabled = document.getElementById('health_enabled');
	var steps_show = document.getElementById('steps_show');
	var set_one = document.getElementById('set_one');
	var set_two = document.getElementById('set_two');
	var manual_city = document.getElementById('manual_city');
	
	var set_date_color = document.getElementById('date_color');
	var set_clock_color = document.getElementById('clock_color');
	var set_battery_color = document.getElementById('battery_color');
	var set_bluetooth_color = document.getElementById('bluetooth_color');
	var set_temp_color = document.getElementById('temp_color');
	var set_weather_color = document.getElementById('weather_color');
	var set_city_color = document.getElementById('city_color');
	var set_steps_color = document.getElementById('steps_color');
	var set_bar_major_color = document.getElementById('bar_major_color');
	var set_bar_minor_color = document.getElementById('bar_minor_color');
    var theme = document.getElementById('theme');
	var set_theme_color = document.getElementById('theme_color');
	var set_background_color = document.getElementById('background_color');
	

    // Load any previously saved configuration, if available
    if(localStorage['bluetooth_show']) {
      bluetooth_show.checked = JSON.parse(localStorage['bluetooth_show']);
      battery_show.checked = JSON.parse(localStorage['battery_show']);
      battery_mode.value = localStorage['battery_mode'];
      automation_buttons_show.value = localStorage['home_auto_show'];
	  if (localStorage['temp_mode'] == 0) {
	    temp_mode_c.className = "tab-button active";
	    temp_mode_f.className = "tab-button";
	  } else {
	    temp_mode_f.className = "tab-button active";
	    temp_mode_c.className = "tab-button";
	  }
      vibe_mode.value = localStorage['vibe_mode'];
	  email.value = localStorage['email'];
	  password.value = localStorage['password'];
	  update_freq.value = localStorage['update_freq'];
	  health_enabled.checked = JSON.parse(localStorage['health_enabled']);
	  steps_show.checked = JSON.parse(localStorage['steps_show']);
	  set_one.value = localStorage['set_one'];
	  set_two.value = localStorage['set_two'];
	  if(localStorage['manual_city'])
		manual_city.value = localStorage['manual_city'];

	  set_date_color.value = localStorage['set_date_color'];
	  set_clock_color.value = localStorage['set_clock_color'];
	  set_battery_color.value = localStorage['set_battery_color'];
	  set_bluetooth_color.value = localStorage['set_bluetooth_color'];
	  set_temp_color.value = localStorage['set_temp_color'];
	  set_weather_color.value = localStorage['set_weather_color'];
	  set_city_color.value = localStorage['set_city_color'];
	  set_steps_color.value = localStorage['set_steps_color'];
	  set_bar_major_color.value = localStorage['set_bar_major_color'];
	  set_bar_minor_color.value = localStorage['set_bar_minor_color'];
      if(localStorage['theme']) theme.value = localStorage['theme'];
	  if(localStorage['set_theme_color']) set_theme_color.value = localStorage['set_theme_color'];
	  if(localStorage['set_background_color']) set_background_color.value = localStorage['set_background_color'];
	  
	  
    }
  })();
