(function(){
    loadOptions();
    submitHandler();
})();

function submitHandler(){
    
    $("#submit_config").on("click",function(){
        console.log("submit");

        var return_to = getQueryParam('return_to', 'pebblejs://close#');
        document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
        //console.log(return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData())));
    });
    
}

function loadOptions(){
    var bg_color = $("input#bg_color");
    var minutes_color = $("input#minutes_color");
    var hours_color = $("input#hours_color");
    var svg_off_color = $("#svg_off_color");
    var svg_on_color = $("#svg_on_color");
    var date = $("#date-switch");
    var date_color = $("input#date_color");
    
    if(localStorage.backgroundColor){
        bg_color.attr("value", localStorage.backgroundColor);
        minutes_color.attr("value", localStorage.minutesColor);
        hours_color.attr("value", localStorage.hoursColor);
        svg_off_color.attr("value", localStorage.svgOffColor);
        svg_on_color.attr("value", localStorage.svgOnColor);
        date.attr("value", localStorage.dateSwitch);
        date_color.attr("value", localStorage.dateColor);
    }
}

function getAndStoreConfigData(){
    var bg_color = $("input#bg_color");
    var minutes_color = $("input#minutes_color");
    var hours_color = $("input#hours_color");
    var svg_off_color = $("#svg_off_color");
    var svg_on_color = $("#svg_on_color");
    var date = $("#date-switch");
    var date_color = $("input#date_color");
    
    var options = {
        backgroundColor: bg_color.attr("value"),
        minutesColor: minutes_color.attr("value"),
        hoursColor: hours_color.attr("value"),
        svgOffColor: svg_off_color.attr("value"),
        svgOnColor: svg_on_color.attr("value"),
        dateSwitch: date.attr("value"),
        dateColor: date_color.attr("value")
    };
    
    localStorage.backgroundColor = options.backgroundColor;
    localStorage.minutesColor = options.minutesColor;
    localStorage.hoursColor = options.hoursColor;
    localStorage.svgOffColor = options.svgOffColor;
    localStorage.svgOnColor = options.svgOnColor;
    localStorage.dateSwitch = options.dateSwitch;
    localStorage.dateColor = options.dateColor;
    
    console.log(JSON.stringify(options));
    return options;
    
}

function getQueryParam(variable, defaultValue) {
  // Find all URL parameters
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
}