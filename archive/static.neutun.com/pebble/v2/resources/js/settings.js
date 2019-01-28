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

$(function () {
    'use strict';

    /*
     * Containers
     */

    var logincontainer = document.getElementById('LoginContainer');
    var logoutcontainer = document.getElementById('LogoutContainer');

    /*
     * Inputs
     */
    var email = document.getElementById('username');
    var password = document.getElementById('password');
    var loginbutton = document.getElementById('loginbutton');
    var logoutbutton = document.getElementById('logoutbutton');

    /*
     * Check for login
     */
    if (getQueryParam("email", false)) {
        logincontainer.classList.add("hidden");
        logoutcontainer.classList.remove("hidden");
    }

    /*
     * Manage a login attempt
     */
    loginbutton.addEventListener('click', function() {

        if (username.value == '' || password.value == '') {
            alert('Invalid username or password entered!');
            return;
        }
        loginbutton.value = 'Validating...';
        loginbutton.disabled = true;

        $.ajax({
            type: "POST",
            url: "https://neutun.auth0.com/oauth/ro",
            dataType: "json",
            data: {
                "client_id":   "e5TjTDAv4t1hMQSGLGNINGf4cI60a8Ak",
                "username":    email.value,
                "password":    password.value,
                "connection":  "neutun-db",
                "grant_type":  "password",
                "scope":       "openid name profile email offline_access",
                "device":      "Pebble"
            },
            crossDomain: true,
            success: function (response) {
                response.email = email.value;
                document.location = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(response));
            },
            error: function (res) {
                if (res.status == 401) {
                    alert("Invalid username or password!");
                } else {
                    alert("An unknown error has occurred!");
                }
                loginbutton.value = 'Login';
                loginbutton.disabled = false;
            }
        });
    });

    /*
     * Manage a logout attempt
     */
    logoutbutton.addEventListener('click', function() {
        document.location = 'pebblejs://close#' + encodeURIComponent(JSON.stringify({
            logout: 1
        }));
    });
});
