(function () {
    var init = function () {
        // Register all events.
        registerEvents();

        // Load any previous data.
        loadSettings();
    };

    var registerEvents = function () {
        // Set up save button click event.
        document.getElementById('saveButton').addEventListener(
            'click',
            onSaveButtonClick
        );

        // Set up keydown event for the password field.
        document.getElementById('password').addEventListener(
            'keydown',
            onPasswordKeyDown
        );
    };

    var loadSettings = function () {
        var data;
        try {
            // Grab the "hash" part of the URL, without the leading '#'.
            var hash = decodeURIComponent(window.location.hash.substr(1));

            // Check there's something to parse.
            if (! hash.length) {
                return;
            }

            data = JSON.parse(hash);
        } catch (e) {
            console.log(e);
            return;
        }

        for (var k in data) {
            var value = data[k];

            if (k === 'hostname') {
                // Remove trailing '.harvestapp.com' from older versions.
                var suffixIndex = value.indexOf('.harvestapp.com');
                if (suffixIndex !== -1) {
                    value = value.substring(0, suffixIndex);
                }
            } else if (k !== 'username') {
                continue;
            }

            document.getElementById(k).value = value;
        }
    };

    var onPasswordKeyDown = function (e) {
        if (e.keyCode == 13) {
            onSaveButtonClick();
        }
    };

    var onSaveButtonClick = function (e) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        var config = {
            hostname: document.getElementById('hostname').value,
            username: username,
            token: window.btoa(username + ':' + password)
        };

        config = encodeURIComponent(JSON.stringify(config));

        var returnTo = getQueryParam('return_to', 'pebblejs://close#');
        window.location.href = returnTo + config;
    };

    var getQueryParam = function (variable, defaultValue) {
        var query = location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          // If the query variable parameter is found, decode it to use and return it for use
          if (pair[0] === variable) {
            return decodeURIComponent(pair[1]);
          }
        }
        return defaultValue || false;
    };

    init();
}());
