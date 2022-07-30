(function () {
    "use strict";

    var presets = {
        "original": {
            "backgroundColor": "#FFFFFF",
            "hourHandColor": "#FF5500",
            "handOutlineColor": "#000000",
            "minuteHandColor": "#0055FF",
            "hourTickColor": "#FF5500",
            "minuteTickColor": "#0055FF",
            "tickOutlineColor": "#000000",
            "dateColor": "#000000",
            "outlineWidth": 8
        },
        "white": {
            "backgroundColor": "#FFFFFF",
            "hourHandColor": "#000000",
            "handOutlineColor": "#000000",
            "minuteHandColor": "#FFFFFF",
            "hourTickColor": "#000000",
            "minuteTickColor": "#000000",
            "tickOutlineColor": "transparent",
            "dateColor": "#FFFFFF",
            "outlineWidth": 6
        },
        "black": {
            "backgroundColor": "#000000",
            "hourHandColor": "#FFFFFF",
            "handOutlineColor": "#FFFFFF",
            "minuteHandColor": "#000000",
            "hourTickColor": "#FFFFFF",
            "minuteTickColor": "#FFFFFF",
            "tickOutlineColor": "transparent",
            "dateColor": "#000000",
            "outlineWidth": 6
        },
        "blue_lake": {
            "backgroundColor": "#000055",
            "hourHandColor": "#00AAFF",
            "handOutlineColor": "transparent",
            "minuteHandColor": "#0055AA",
            "hourTickColor": "#00AAFF",
            "minuteTickColor": "#0055AA",
            "tickOutlineColor": "transparent",
            "dateColor": "#000055",
            "outlineWidth": 6
        },
        "pink_candy": {
            "backgroundColor": "#FF0055",
            "hourHandColor": "#FF0055",
            "handOutlineColor": "#FFFFFF",
            "minuteHandColor": "#FFFFFF",
            "hourTickColor": "#FFFFFF",
            "minuteTickColor": "#FFFFFF",
            "tickOutlineColor": "transparent",
            "dateColor": "#FFFFFF",
            "outlineWidth": 4
        },
        "pink_alternative": {
            "backgroundColor": "#FF0055",
            "hourHandColor": "#FF0055",
            "handOutlineColor": "#000000",
            "minuteHandColor": "#000000",
            "hourTickColor": "#000000",
            "minuteTickColor": "#000000",
            "tickOutlineColor": "transparent",
            "dateColor": "#000000",
            "outlineWidth": 6
        },
        "purple_on_green": {
            "backgroundColor": "#55FF00",
            "hourHandColor": "#55FF00",
            "handOutlineColor": "#AA00FF",
            "minuteHandColor": "#AA00FF",
            "hourTickColor": "#55FF00",
            "minuteTickColor": "#55FF00",
            "tickOutlineColor": "#AA00FF",
            "dateColor": "#AA00FF",
            "outlineWidth": 12
        },
        "blue_window": {
            "backgroundColor": "#FFFFFF",
            "hourHandColor": "#00AAFF",
            "handOutlineColor": "#000000",
            "minuteHandColor": "#FFFFFF",
            "hourTickColor": "#00AAFF",
            "minuteTickColor": "#FFFFFF",
            "tickOutlineColor": "#000000",
            "dateColor": "#000000",
            "outlineWidth": 20
        }
    };

    var colorIdToKeyMap = {
        "background-color": "backgroundColor",
        "hour-hand-color": "hourHandColor",
        "hand-outline-color": "handOutlineColor",
        "minute-hand-color": "minuteHandColor",
        "hour-tick-color": "hourTickColor",
        "minute-tick-color": "minuteTickColor",
        "tick-outline-color": "tickOutlineColor",
        "date-color": "dateColor"
    };

    var intIdToKeyMap = {
        "outline-width": "outlineWidth"
    };

    function getQueryParam(variable, defaultValue) {
        var query = location.search.substring(1);
        var vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1]);
            }
        }

        return defaultValue || false;
    }

    function doUpdateWithValues(idToKeyMap, values, setter) {
        Object.keys(idToKeyMap).forEach(function (id) {
            var key = idToKeyMap[id];

            if (key in values) {
                var value = values[key];
                var nodes = document.getElementsByName(id);

                for (var i = 0; i < nodes.length; i++) {
                    if (setter) {
                        setter(nodes[i], id, value);
                    } else {
                        nodes[i].value = value;
                    }
                }
            }
        });
    }

    function updateWithValues(values) {
        if ("preset" in values) {
            document.getElementById("preset").value = values.preset;
        }

        doUpdateWithValues(intIdToKeyMap, values);
        doUpdateWithValues(
            colorIdToKeyMap,
            values,
            function (node, id, value) {
                var enabled = document.getElementById(id + "-enabled");

                if (enabled) {
                    enabled.checked = value != "transparent";
                }

                if (value == "transparent") {
                    node.value = "#000000";
                } else {
                    node.value = value;
                }

                var valueDisplay = node.parentElement.querySelector(".value");

                if (valueDisplay) {
                    valueDisplay.style.backgroundColor = node.value;
                }
            });
    }

    var defaultValues = JSON.parse(getQueryParam("default", "{}") || "{}");

    updateWithValues(defaultValues);

    Object.keys(colorIdToKeyMap).forEach(function (id) {
        var enabled = document.getElementById(id + "-enabled");

        if (enabled) {
            enabled.addEventListener("change", function (e) {
                document.getElementById(id).disabled = !enabled.checked;
            });
        }
    });

    document.getElementById("preset").addEventListener("change", function () {
        var preset = document.getElementById("preset").value;

        if (preset in presets) {
            updateWithValues(presets[preset]);
        }
    });

    document.getElementById("submit").addEventListener("click", function () {
        var options = {
            preset: document.getElementById("preset").value
        };

        Object.keys(intIdToKeyMap).forEach(function (id) {
            options[intIdToKeyMap[id]] =
                parseInt(document.getElementById(id).value);
        });

        Object.keys(colorIdToKeyMap).forEach(function (id) {
            var enabled = document.getElementById(id + "-enabled");

            if (!enabled || enabled.checked) {
                options[colorIdToKeyMap[id]] =
                    document.getElementById(id).value.replace("0x", "#");
            } else {
                options[colorIdToKeyMap[id]] = "transparent";
            }
        });

        var returnTo = getQueryParam("return_to", "pebblejs://close#");

        document.location =
            returnTo + encodeURIComponent(JSON.stringify(options));
    });
})();
