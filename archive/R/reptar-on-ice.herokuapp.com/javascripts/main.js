$(document).ready(function() {
    $eula = $("#eula");
    $settings = $("#settings");

    if ($eula.length === 0) {
        $settings.removeClass("hide");
    } else {
        $("#acceptEULA").click(function() {
            $eula.remove();
            $settings.removeClass("hide");
        });
    }

    var weight_slider = $('#weight').slider({
        min: 0,
        tooltip: false,
        max: 300,
    }).on("slide", function(ev) {
        $("#weight_val").text(weight_slider.data().value);
    }).on("slideStop", function(ev) {
        $("#weight_val").text(weight_slider.data().value);
    });
    if (weight_slider.data().sliderValue == undefined)
        weight_slider.data().slider.setValue(150);

    $("#weight_val").text(weight_slider.data().slider.getValue());

    $("#save-btn").click(function(e) {
        var configuration = {
            weight: parseInt($("#weight_val").text()),
            gender: $("#male").hasClass("active") ? "male" : "female",
            signedEULA: $("#eula").length === 0
        };
        console.log(configuration);
        window.location.href = "pebblejs://close#" + encodeURIComponent(JSON.stringify(configuration));

    });

});